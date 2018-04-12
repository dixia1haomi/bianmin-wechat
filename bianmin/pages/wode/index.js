// import { Base } from '../../utils/Base.js'
import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
// const base = new Base()

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
  },

  // 登陆
  _load() {

  },

  // 登陆按钮
  _login() { app.newGetToken(back => { this.onLoad() }) },


  // 发布信息
  go_fabu(e) {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    if (app.appData.LoginState) {
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
      app.newGetToken(back => {
        this.go_fabu()
        this.onLoad()
      })
    }
    // app.appData.LoginState ? wx.navigateTo({ url: '/pages/fabu/fabu' }) : app.newGetToken(back => { this.go_fabu() })
  },

  // 我的发布
  my_fabu(e) {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    app.appData.LoginState ? wx.navigateTo({ url: '/pages/wode/myfabu' }) : app.newGetToken(back => {
      this.my_fabu()
      this.onLoad()
    })
  },

  // 关于我
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) }
})