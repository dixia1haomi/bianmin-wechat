
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
    loginState: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        this.setData({ loginTanChuang: newVal })
      }
    },

  },


  data: {
    // 登陆弹窗
    loginTanChuang: false,
    // form_id
    form_id: null,
  },

  methods: {
    // -------------------------------------------------------- 登陆 ---------------------------------------------------------

    // 抛出关闭登陆弹窗
    loginTanChuangQuXiao_() {
      this.triggerEvent('login', { tanchuang: false })
    },

    // formid
    getFormId_(e) { this.setData({ form_id: e.detail.formId }) },

    // 获得用户信息登陆成功后关闭弹窗
    getUserInfo_(e) {
      console.log('getUserInfo_', e)
      if (e.detail.errMsg == "getUserInfo:ok") {
        // 如果有form_id
        if (this.data.form_id) {
          e.detail.userInfo.form_id = this.data.form_id
        } else {
          e.detail.userInfo.form_id = ''
        }
        this.setData({ loginTanChuang: false }, () => { app.saveUserInfo(e.detail) })
      }
    }
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