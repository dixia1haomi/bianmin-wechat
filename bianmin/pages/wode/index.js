import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    Res: [],
    // 登陆按钮状态
    loginButton: true,
    // 昵称头像
    userinfo: null,
    // 类目
    leimuObj: Config.moban
  },


  onLoad: function (op) {
    this._set_UserInfo()      // 设置头像
  },


  // 设置头像
  _set_UserInfo() { if (app.data.LoginState) { this.setData({ userinfo: wx.getStorageSync('userinfo') }) } },


  // ---------------------------------------- 登陆 ---------------------------------------------

  // formid
  getFormId_(e) {
    this.setData({ form_id: e.detail.formId })
  },

  // 用户信息
  getUserInfo_(e) {
    e.detail.userInfo.form_id = this.data.form_id
    app.saveUserInfo(e.detail, () => {
      console.log('asd')
      this._set_UserInfo()
    })
  },


  // 发布信息
  go_fabu_(e) {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    if (app.data.LoginState) {
      // 检查发布限制,调用myFabu接口检查
      wx.showLoading({ title: '请稍候' })
      api.myFabu({}, (back) => {
        wx.hideLoading()
        console.log('myFabu', back)
        if (back.data.length == 0) {
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
          wx.showModal({ content: '只能同时展示1条信息,可以先去「我的发布」删除旧信息再回来发新信息' })
        }
      })
    } else {
      // 显示登录按钮，提示登陆
      this.setData({ loginButton: false }, () => { wx.showToast({ title: '请先登录' }) })
    }
  },

  // 我的发布
  my_fabu_() {
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/wode/myfabu' })
    } else {
      this.setData({ loginButton: false }, () => { wx.showToast({ title: '请先登录' }) })
    }
  },


  // 我的留言
  my_liuyan_() {
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/wode/bianmin/huifuwode' })
    } else {
      this.setData({ loginButton: false }, () => { wx.showToast({ title: '请先登录' }) })
    }
  },

  // 商家入驻
  create_shangjia() {
    // 是否登陆过 ？ 跳转到新增商家页 ： 调用登陆
    if (app.data.LoginState) {
      wx.showLoading({ title: '请稍候' })
      api.getMyShangjia({}, (res) => {
        console.log('我的店铺', res)
        wx.hideLoading()
        if (res.data == null) {
          wx.navigateTo({ url: '/pages/wode/create-shangjia' })
        } else {
          wx.showModal({ content: '已入驻过,可以先去「我的店铺」删除旧店铺' })
        }
      })
    } else {
      this.setData({ loginButton: false }, () => { wx.showToast({ title: '请先登录' }) })
    }


  },

  asd() {
    console.log()
  },

  // 我的店铺
  my_shangjia_() {
    // 是否登陆过 ？
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/wode/my-shangjia' })
    } else {
      this.setData({ loginButton: false }, () => { wx.showToast({ title: '请先登录' }) })
    }
  },

  // 关于我
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) }
})