import { Api } from '../../utils/Api.js'

const api = new Api()
const app = getApp()

Page({

  data: {
    Res: [],
  },


  onLoad: function (op) {
    console.log('bb')
    this._load()
  },

  // 请求数据
  _load() {
    api.getList({}, res => {
      console.log('aa', res.data)
      this.setData({ Res: res.data })
    })
  },

  // 发布页
  go_fabu() {
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    app.appData.LoginState ? wx.navigateTo({ url: '/pages/fabu/fabu' }) : app.newGetToken(back => { this.go_fabu() })
  },


  // 点击+按钮显示蒙层
  go_wode() {
    console.log('go_wode')
    // 是否登陆过 ？ 跳转到我的留言页 ： 调用登陆
    wx.navigateTo({ url: '/pages/wode/list' })
  },

  // 预览
  yulan(e) {
    console.log(e.currentTarget.dataset)
    let img = e.currentTarget.dataset.img
    let index = e.currentTarget.dataset.index
    let arr = []
    for (let i in img) {
      arr.push(img[i].url)
    }
    console.log('arr', arr)

    wx.previewImage({
      current: index, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

})