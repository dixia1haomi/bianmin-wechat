
import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const api = new Api()
const utils = new Utils()
const app = getApp()

Component({

  //	否	组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段，
  //  type 表示属性类型、 value 表示属性初始值、 observer 表示属性值被更改时的响应函数
  //  注意：在 properties 定义段中，属性名采用驼峰写法（propertyName）；
  //  在 wxml 中，指定属性值时则对应使用连字符写法（component-tag - name property-name="attr value"）
  //  应用于数据绑定时采用驼峰写法（attr="{{propertyName}}"）。
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // wx:for-item
    Res: {
      type: Object,
      value: null,
      observer: (newVal, oldVal) => {
        // console.log('observer-Res', newVal, oldVal)
      }
    },

    // 是否使用详细展示开关,默认不使用
    state: {
      type: Boolean,
      value: false
    },

    // wode/myfabu不使用info内容
    myfabu: {
      type: Boolean,
      value: false
    },

  },

  //	否	组件的内部数据，和 properties 一同用于组件的模版渲染
  data: {
    // 登陆弹窗
    loginTanChuang: false,
    // form_id
    form_id: null,

    // ---- 留言 ----
    tanChuang: false,
    input: null,
    input_cursor: 0,
    bianmin_id: null,
  },



  //	否	组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 组件事件
  methods: {

    // ------------------------------------------------- 留言 -------------------------------------------------

    // ---- 留言弹窗 ----
    liuyan_(e) {
      console.log('liuyan_', e)
      if (app.data.LoginState) {
        this.tanchuang_()
        this.setData({ bianmin_id: e.currentTarget.dataset.bianmin_id, })
      } else {
        // 登陆弹窗
        this.setData({ loginTanChuang: true })
      }
    },

    // 弹窗开关事件(清空input)
    tanchuang_() { this.setData({ tanChuang: !this.data.tanChuang, input: null, input_cursor: 0 }) },

    // 留言、回复输入事件
    liuyan_input_(e) { this.setData({ input: e.detail.value, input_cursor: e.detail.cursor }) },

    // ---- 留言确定 ----
    liuyan_queding_(e) {
      console.log('formId', e.detail.formId)
      // 检查换行符
      let input = this.data.input
      input = utils.checkHuanHangFu(input)
      // 验证input内容
      if (!input || input.length > 50) {
        wx.showModal({ content: '长度请控制在1-50个字之间', showCancel: false })
        return
      }
      // 新增留言
      api.createBianminLiuyan({
        bmxx_id: this.data.bianmin_id,
        neirong: input,
        form_id: e.detail.formId
      }, (back) => {
        console.log('新增留言OK', back)
        // 刷新
        this.setData({ Res: back.data })
      })
      // 关闭弹窗
      this.tanchuang_()
    },



    // -------------------------------------------------------- 登陆 ---------------------------------------------------------

    // 登陆组件传回来的事件(关闭登陆弹窗,e.detail.tanchuang == false)
    _login(e){ this.setData({ loginTanChuang: e.detail.tanchuang }) },


    // -------------------------------------------------------- 拨打电话 --------------------------------------------------------

    call_phone_(e) { wx.makePhoneCall({ phoneNumber: e.currentTarget.id }) },


    // -------------------------------------------------------- 打开地图 --------------------------------------------------------
    dizhi_(e) {
      wx.openLocation({
        latitude: parseFloat(e.currentTarget.dataset.latitude),
        longitude: parseFloat(e.currentTarget.dataset.longitude),
        name: e.currentTarget.dataset.address,
        scale: 28
      })
    },

    // -------------------------------------------------------- 预览 --------------------------------------------------------
    yulan_(e) {
      console.log('预览', e.currentTarget.dataset)
      let img = e.currentTarget.dataset.img, index = e.currentTarget.dataset.index, arr = []
      for (let i in img) { arr.push(img[i].url) }

      wx.previewImage({
        current: arr[index], // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },

    // -------------------------------------------------------- 展开，折叠 --------------------------------------------------------
    flodFn_(e) {
      console.log('flodFn_', e, this.data)
      let res = this.data.Res
      // 如果hid是初始的false,允许改成true
      if (res.hid == false) {
        this.setData({ 'Res.hid': true }, () => {
          // 调用API发送请求增加点击
          // api.incLiulangcishu({ id: res[index].id }, back => {
          //   console.log('增加点击成功', back)
          // })
        })
      }
    },
  },



  //	否	类似于mixins和traits的组件间代码复用机制，参见 behaviors
  behaviors: [],


  //	否	组件生命周期函数，在组件实例进入页面节点树时执行，注意此时不能调用 setData
  created: () => { },
  //	否	组件生命周期函数，在组件实例进入页面节点树时执行
  attached: () => { },
  // 否	组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  ready: () => { },
  //	否	组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
  moved: () => { },
  //	否	组件生命周期函数，在组件实例被从页面节点树移除时执行
  detached: () => { },


  //	否	组件间关系定义，参见 组件间关系
  relations: {},

  //	否	组件接受的外部样式类，参见 外部样式类
  externalClasses: [],

  //	否	一些组件选项，请参见文档其他部分的说明
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

// 方法名	参数	描述
// setData	Object newData	设置data并执行视图层渲染
// hasBehavior	Object behavior	检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
// triggerEvent	String name, Object detail, Object options	触发事件，参见 组件事件