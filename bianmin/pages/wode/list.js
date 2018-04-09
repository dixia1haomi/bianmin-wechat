import { Base } from '../../utils/Base.js'
import { Api } from '../../utils/Api.js'

const api = new Api()
const base = new Base()

const app = getApp()

Page({

  data: {
    // 登陆按钮状态
    loginState: false,
    // 用户信息
    // userinfo: null,
    Res: []
  },


  onLoad: function (op) {
    // 进入时判断用户是否有info缓存，没有则显示登陆按钮
    let info = wx.getStorageSync('userinfo')
    if (info) { this.setData({ userinfo: info, loginState: true }) }

    this._load()
  },


  _load() {
    api.myFabu({}, back => {
      console.log('我的发布', back)
      this.setData({ Res: back.data })
    })
  },

  // 登陆按钮
  _login() { app.newGetToken(back => { this._load() }) },


  // 我的发布
  go_fabu(e) {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    app.appData.LoginState ? wx.navigateTo({ url: '/pages/fabu/fabu' }) : app.newGetToken(back => { this.go_fabu() })
  },

  // 关于我
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) },

  // 删除我的信息
  myDelete(e) {
    // console.log('myDelete-id', e.currentTarget.id)
    // 禁止操作
    wx.showLoading({ title: '删除中..', mask: true })
    api.deleteMyFabu({ list_id: e.currentTarget.id }, res => {
      // 删除成功
      console.log('cos', res)
      wx.hideLoading()
      // 刷新
      this._load()
    })
  },

  // 不在展示我的信息
  myXiajia() {

  },

})