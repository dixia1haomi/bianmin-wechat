import { Api } from '../../../utils/Api.js'

const api = new Api()


Page({


  data: {

  },

  onLoad: function (options) {
    this._load()
  },


  _load(callback) {
    // 获取我的发布
    api.myFabu({}, back => {
      console.log('我的发布', back)
      callback && callback(back)
      this.setData({ Res: back.data })
    })
  },

  // 去我的信息详情
  go_wode_xinxi_detail_(e) {
    console.log('去我的信息详情', e.currentTarget.id)
    wx.navigateTo({ url: '/pages/wode/xinxi/detail?id=' + e.currentTarget.id })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this._load(back => {
      console.log('下拉刷新', back)
      wx.stopPullDownRefresh()
    })
  },

})