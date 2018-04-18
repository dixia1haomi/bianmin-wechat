// import { Base } from '../../utils/Base.js'
import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
// const base = new Base()

const app = getApp()

Page({

  data: {
    // 登陆按钮状态
    loginButton: false,
    // 用户信息
    // userinfo: null,
    Res: [],

    // 类目
    leimuObj: Config.moban
  },


  onLoad: function (op) {
    // 进入时判断用户是否有info缓存，没有则显示登陆按钮
    // let info = wx.getStorageSync('userinfo')
    // if (info) { this.setData({ userinfo: info, loginState: true }) }

    if (app.appData.LoginState) {
      this._set_UserInfo()
    } else {
      app.checkToken(() => {
        this._set_UserInfo()
      })
    }
  },

  // 登陆
  _set_UserInfo() {
    this.setData({ userinfo: wx.getStorageSync('userinfo'), loginButton: true })
  },

  // 登陆按钮
  _login() {
    this.onLoad()
  },


  // 发布信息
  go_fabu(e) {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    if (app.appData.LoginState) {
      // 检查发布限制,调用myFabu接口检查
      wx.showLoading({ title: '请稍候' })
      api.myFabu({}, back => {
        wx.hideLoading()
        console.log('myFabu', back)
        if (back.data.length < 2) {
          // 取Config数组
          let leimuArray = []
          let leimuObj = this.data.leimuObj
          for (let i in leimuObj) { leimuArray.push(leimuObj[i].leimu) }

          wx.showActionSheet({
            // ['招聘', '求职', '生活', '出租', '出售', '转让']
            itemList: leimuArray,
            success: (res) => { wx.navigateTo({ url: '/pages/fabu/fabu?leimu=' + res.tapIndex }) }  // 去发布页
          })
        } else {
          wx.showModal({ content: '最多发布2条,可以先去「我的发布」删除旧信息再回来发新信息' })
        }
      })
    } else {
      app.checkToken(() => {
        this.go_fabu()
        this._set_UserInfo()
      })
    }


    // app.appData.LoginState ? wx.navigateTo({ url: '/pages/fabu/fabu' }) : app.newGetToken(back => { this.go_fabu() })
  },

  // 我的发布
  my_fabu() {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    app.appData.LoginState ? wx.navigateTo({ url: '/pages/wode/myfabu' }) : app.checkToken(() => {
      this.my_fabu()
      this._set_UserInfo()
    })
  },

  // 商家入驻
  create_shangjia() {
    // 是否登陆过 ？ 跳转到新增商家页 ： 调用登陆
    app.appData.LoginState ? wx.navigateTo({ url: '/pages/wode/create-shangjia' }) : app.checkToken(() => {
      this.create_shangjia()
      this._set_UserInfo()
    })
  },

  // 关于我
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) }
})