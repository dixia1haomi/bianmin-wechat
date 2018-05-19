import { Api } from '../../../utils/Api.js'

const api = new Api()
const app = getApp()


Page({

  data: {
    myShangjiaRes: {},
  },


  // -----------------------  onLoad  ------------------------

  onLoad: function (options) {
    this._load()
  },

  _load(callback) {
    // API 我的店铺
    api.getMyShangjia({}, (res) => {
      console.log('我的店铺', res)
      this.setData({ myShangjiaRes: res.data })
      callback && callback()
    })
  },


  // ----------------------- 删除店铺 -----------------------
  deleteShangjia_(e) {
    if (app.data.LoginState) {
      wx.showModal({
        title: '删除店铺？', content: '将会删除店铺相关的所有数据。', success: (res) => {
          if (res.confirm) {
            api.deleteShangjia({ id: e.currentTarget.id }, (back) => {
              console.log('删除店铺OK', back)
              this._load()
            })
          }
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // ----------------------- 转到商家详情页 -----------------------
  // 组件点击头图事件
  com_toutu_(e) {
    wx.navigateTo({ url: '/pages/shangjia/detail?id=' + e.detail.id })
  },


  // ----------------------- 下拉刷新 -----------------------
  onPullDownRefresh: function () {
    this._load(back => {
      wx.stopPullDownRefresh()
    })
  },



})