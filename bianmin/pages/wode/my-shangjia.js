import { Api } from '../../utils/Api.js'

const api = new Api()

Page({

  data: {
    myShangjiaRes: {},
  },

  // 我的店铺
  onLoad: function (options) {
    this._load()
  },

  _load() {
    api.getMyShangjia({}, (res) => {
      console.log('我的店铺', res)
      this.setData({ myShangjiaRes: res.data })
    })
  },

  // 转到商家详情页
  go_shangjiaDetail_() {
    wx.navigateTo({ url: '/pages/shangjia/detail?id=' + this.data.myShangjiaRes.id })
  },

  // 删除店铺
  deleteShangjia_(e) {
    wx.showModal({
      title: '删除店铺？', success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '删除中..', mask: true })
          api.deleteShangjia({ id: e.currentTarget.id }, (res) => {
            console.log('删除店铺', res)
            wx.hideLoading()
            wx.showToast({ title: '删除成功' })
            this._load()
          })
        }
      }
    })
  },

})