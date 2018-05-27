import { Api } from '../../../utils/Api.js'

const api = new Api()
const app = getApp()

let id;
Page({

  data: {
    huodongRes: false,
  },


  onLoad: function (op) {
    id = op.id
    this._load()
  },

  // 查询活动详情
  _load(callback) {
    api.findShangjiaHuodong({ id: id }, back => {
      console.log('查询活动详情', back)
      this.setData({ huodongRes: back.data })
      callback && callback()
    })
  },

  // ----------------------- 删除店铺 -----------------------
  deleteHuodong_(e) {
    if (app.data.LoginState) {
      wx.showModal({
        title: '删除活动？', content: '将会删除活动相关的所有数据。', success: (res) => {
          if (res.confirm) {
            api.deleteShangjiaHuodong({ id: e.currentTarget.id }, (back) => {
              console.log('删除活动OK', back)
              // 返回上一页
              wx.navigateBack({ delta: 2 })
            })
          }
        }
      })
    } else {
      // 提示登陆
      this.setData({ loginState: true })
    }
  },

  // ----------------------- 转到活动详情页 -----------------------
  // 组件点击头图事件
  com_toutu_(e) {
    wx.navigateTo({ url: '/pages/huodong/detail?id=' + e.detail.id })
  },


  // ----------------------- 下拉刷新 -----------------------
  onPullDownRefresh: function () {
    this._load(back => {
      wx.stopPullDownRefresh()
    })
  },

})