import { Base } from '../../utils/Base.js'
import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
const base = new Base()

const app = getApp()

Page({

  data: {
    // 登陆按钮状态
    loginState: false,
    // 用户信息
    // userinfo: null,
    Res: [],

    // 类目
    leimuObj: Config.moban
  },


  onLoad: function (op) {
    // 进入时判断用户是否有info缓存，没有则显示登陆按钮
    let info = wx.getStorageSync('userinfo')
    if (info) { this.setData({ userinfo: info, loginState: true }) }

    // this._load()
  },


  // _load() {
  //   api.myFabu({}, back => {
  //     console.log('我的发布', back)
  //     this.setData({ Res: back.data })
  //   })
  // },

  // 登陆按钮
  _login() { app.newGetToken(back => { this._load() }) },


  // 我的发布
  // go_fabu(e) {
  //   // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
  //   if (app.appData.LoginState) {
  //     // 取Config数组
  //     let leimuArray = []
  //     let leimuObj = this.data.leimuObj
  //     for (let i in leimuObj) { leimuArray.push(leimuObj[i].leimu) }

  //     wx.showActionSheet({
  //       // ['招聘', '求职', '生活', '出租', '出售', '转让']
  //       itemList: leimuArray,
  //       success: (res) => { wx.navigateTo({ url: '/pages/fabu/fabu?leimu=' + res.tapIndex }) }  // 去发布页
  //     })
  //   } else {
  //     app.newGetToken(back => { this.go_fabu() })
  //   }
  //   // app.appData.LoginState ? wx.navigateTo({ url: '/pages/fabu/fabu' }) : app.newGetToken(back => { this.go_fabu() })
  // },

  // 关于我
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) },

  // 删除我的信息
  myDelete(e) {

    wx.showModal({
      title: '删除这条信息？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          // 禁止操作
          wx.showLoading({ title: '删除中..', mask: true })
          api.deleteMyFabu({ list_id: e.currentTarget.id }, res => {
            // 删除成功
            console.log('删除成功', res)
            wx.hideLoading()
            // 刷新
            this._load()
          })
        }
      }
    })
  },

  // 刷新 ， 更新update_time
  updateTime(e) {
    api.updateTime({ id: e.currentTarget.id }, back => {
      console.log('刷新成功.',back)
    })
  },

})