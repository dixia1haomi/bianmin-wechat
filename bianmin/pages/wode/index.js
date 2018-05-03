import { Api } from '../../utils/Api.js'
import { Config } from '../../utils/Config.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    Res: [],
    // 登陆弹窗
    loginTanChuang: false,
    // form_id
    form_id: null,
    // 昵称头像
    userinfo: null,
    // 类目
    leimuObj: Config.moban
  },


  onLoad: function (op) {
    this._set_UserInfo()      // 设置头像
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


  // -------------------------------------- 登陆 --------------------------------------

  // 关闭登陆弹窗
  loginTanChuangQuXiao_() { this.setData({ loginTanChuang: false }) },

  // formid
  getFormId_(e) {
    this.setData({ form_id: e.detail.formId })
  },

  // 获得用户信息登陆成功后关闭弹窗
  getUserInfo_(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      // 如果有form_id
      if (this.data.form_id) {
        e.detail.userInfo.form_id = this.data.form_id
      } else {
        e.detail.userInfo.form_id = ''
      }
      // // 登陆成功后设置头像
      this.setData({ loginTanChuang: false }, () => { app.saveUserInfo(e.detail, () => { this._set_UserInfo() }) })
    }
  },


  // -------------------------------------- 发布信息 --------------------------------------

  go_fabu_(e) {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    if (app.data.LoginState) {
      // 检查发布限制,调用myFabu接口检查
      api.myFabu({}, (back) => {
        console.log('myFabu', back)
        // 如果已经有信息不能在发布,没有信息back.data == null
        if (back.data) {
          wx.showModal({ content: '只能同时展示1条信息,可以先去「我的发布」删除旧信息再回来发新信息' })
        } else {
          // 取Config数组
          let leimuArray = []
          let leimuObj = this.data.leimuObj
          for (let i in leimuObj) { leimuArray.push(leimuObj[i].leimu) }

          wx.showActionSheet({
            // ['招聘', '求职', '生活', '出租', '出售', '转让']
            itemList: leimuArray,
            success: (res) => { wx.navigateTo({ url: '/pages/bmxx/fabu?leimu=' + res.tapIndex }) }  // 去发布页
          })
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginTanChuang: true })
    }
  },

  // -------------------------------------- 我的发布 --------------------------------------

  my_fabu_() {
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/wode/myfabu' })
    } else {
      this.setData({ loginTanChuang: true })
    }
  },


  // -------------------------------------- 商家入驻 --------------------------------------
  create_shangjia() {
    // 是否登陆过 ？ 跳转到新增商家页 ： 调用登陆
    if (app.data.LoginState) {
      api.getMyShangjia({}, (res) => {
        console.log('我的店铺', res)
        if (res.data == null) {
          wx.navigateTo({ url: '/pages/wode/create-shangjia' })
        } else {
          wx.showModal({ content: '已入驻过,可以先去「我的店铺」删除旧店铺' })
        }
      })
    } else {
      this.setData({ loginTanChuang: true })
    }
  },


  // -------------------------------------- 我的店铺 --------------------------------------
  my_shangjia_() {
    // 是否登陆过 ？
    if (app.data.LoginState) {
      wx.navigateTo({ url: '/pages/wode/my-shangjia' })
    } else {
      this.setData({ loginTanChuang: true })
    }
  },

  // -------------------------------------- 关于我 --------------------------------------
  go_guanyuwo() { wx.navigateTo({ url: '/pages/wode/guanyuwo' }) }
})