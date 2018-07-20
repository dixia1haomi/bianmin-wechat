import {
  Api
} from '../../../../utils/Api.js'

const api = new Api()
const app = getApp()

Component({

  properties: {

    Res: {
      type: Object,
      value: null
    },

    zhankai: {
      type: Boolean,
      value: false
    },

    info: {
      type: Boolean,
      value: true
    },

    navigate: {
      type: Boolean,
      value: false
    },

  },

  //	否	组件的内部数据，和 properties 一同用于组件的模版渲染
  data: {

  },



  //	否	组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用，参见 组件事件
  methods: {
    // -------------------------------------------------------- 展开，折叠 --------------------------------------------------------
    flodFn_() {

      if (this.data.navigate) {
        // 跳转
        this.triggerEvent('navigate', this.data.Res.id)
      } else {
        this.setData({
          zhankai: !this.data.zhankai
        }, () => {
          // 调用API发送请求增加点击
          api.incLiulangcishu({
            id: this.data.Res.id
          }, back => {
            console.log('增加点击成功', back)
          })
        })
      }
    },



    // 电话
    foot_phone_(e) {
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.id
      })
    },

    // 留言 - 直接抛出 - 外面需要先验证登录、再接受弹窗state
    foot_liuyan_(e) {
      // 打开留言窗
      console.log('foot_liuyan_', e.currentTarget.id)
      if (app.data.LoginState) {
        // 打开留言窗，携带id
        this.setData({
          liuyanchuang_state: true
        })
      } else {
        // 先登录
        this.setData({
          loginState: true
        })
      }
    },

    liuyanchuang_queding_(e) {
      // 确定
      console.log('zhaopin内部留言窗确定', e.detail)
      // 新增留言
      api.createBianminLiuyan({
        form_id: e.detail.form_id,
        neirong: e.detail.input,
        bmxx_id: this.data.Res.id
      }, (back) => {
        console.log('新增留言OK', back)
        // 刷新
        this.setData({
          Res: back.data
        })
      })
    },

    // 点击了留言人名称
    liuyan_name_(e) {
      console.log('zhaopin内部-点击了留言人名称', e)
      this.triggerEvent('huifu', e.detail)
    },

    // 地图
    go_map_() {
      let map = {
        address: this.data.Res.kuozhan.zhaopin_gongzuodizhi,
        longitude: this.data.Res.kuozhan.zhaopin_longitude,
        latitude: this.data.Res.kuozhan.zhaopin_latitude
      }
      this.triggerEvent('gomap', map)
    }

  },

  //	否	一些组件选项，请参见文档其他部分的说明
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})