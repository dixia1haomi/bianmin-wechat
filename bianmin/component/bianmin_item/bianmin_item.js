
import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const api = new Api()
const utils = new Utils()
const app = getApp()

Component({

  behaviors: [],
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
      // observer: (newVal, oldVal) => {
      //   console.log('observer-Res', newVal, oldVal)
      // }
    },

    // 是否显示管理 - 跳转信息详情用
    guanli: {
      type: Boolean,
      value: false
    },

    // 脚部 - 默认显示 - 我的信息详情页隐藏用
    info: {
      type: Boolean,
      value: true
    },

  },

  //	否	组件的内部数据，和 properties 一同用于组件的模版渲染
  data: {
    // ---- 留言 ----
    tanChuang: false,
    input: null,
    input_cursor: 0,
    bianmin_id: null,
    // -- 展开/折叠 --
    zhankai: false,
  },



  //	否	组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 组件事件
  methods: {




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


    // 我的信息页列表使用跳转信息详情
    go_wode_xinxi_detail_(e) {
      this.triggerEvent('xinxi_id', e.currentTarget.id)
    },

  },

  //	否	一些组件选项，请参见文档其他部分的说明
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})

// 方法名	参数	描述
// setData	Object newData	设置data并执行视图层渲染
// hasBehavior	Object behavior	检查组件是否具有 behavior （检查时会递归检查被直接或间接引入的所有behavior）
// triggerEvent	String name, Object detail, Object options	触发事件，参见 组件事件