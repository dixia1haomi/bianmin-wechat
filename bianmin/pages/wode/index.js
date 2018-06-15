import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    Res: [],
    // 昵称头像
    userinfo: null,
    // 登陆窗
    loginState: false,
  },


  onLoad: function (op) {
    this._set_UserInfo()      // 设置头像
  },


  // --------------------- 登陆组件传回来的事件(关闭登陆弹窗) ---------------------
  com_login_() {
    // 设置头像
    this._set_UserInfo()
  },

  // -------------------------------------- 设置头像 --------------------------------------

  _set_UserInfo() {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      if (app.data.LoginState) { this.setData({ userinfo: wx.getStorageSync('userinfo') }) }
    } else {
      app.data.LoginState = false
    }
  },


  // -------------------------------------- 发布信息 --------------------------------------

  go_create_() {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    if (app.data.LoginState) {
      // 检查发布限制,调用myFabu接口检查
      api.myFabu({}, (back) => {
        console.log('myFabu', back)
        // 如果已经有信息不能在发布,没有信息back.data == null
        if (back.data && back.data.length > 4) {
          wx.showModal({ content: '只能同时展示1条信息,请先删除旧信息', showCancel: false })
        } else {
          wx.navigateTo({ url: '/pages/xinxi/create' })
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // -------------------------------------- 我的发布 --------------------------------------

  my_fabu_() {
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/wode/xinxi/list' })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },


  // -------------------------------------- 商家入驻 --------------------------------------
  create_shangjia_() {
    // 是否登陆过 ？ 跳转到新增商家页 ： 调用登陆
    if (app.data.LoginState) {
      api.getMyShangjia({}, (res) => {
        console.log('我的店铺', res)
        if (res.data == null) {
          wx.navigateTo({ url: '/pages/shangjia/my-shangjia/create-shangjia' })
        } else {
          wx.showModal({ content: '已入驻过,可以先去「我的店铺」删除旧店铺', showCancel: false })
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },


  // -------------------------------------- 我的店铺 --------------------------------------
  my_shangjia_() {
    // 是否登陆过 ？
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/shangjia/my-shangjia/index' })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },


  // -------------------------------------- 活动劵 --------------------------------------
  huodong_juan_() {
    // 是否登陆过 ？
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/kajuan/list' })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // -------------------------------------- 关于我 --------------------------------------
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) }
})