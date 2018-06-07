import { Api } from '../../utils/Api.js'
const api = new Api()

Page({

  data: {
    juanRes: false,
  },


  onLoad: function (op) {
    this._load()
  },

  _load() {
    // 获取劵列表
    api.getJuanList({}, back => {
      console.log('获取劵列表', back)
      this.setData({ juanRes: back.data })
    })
  },

  go_juanDetail_(e) {
    wx.navigateTo({
      url: '/pages/kajuan/detail?id=' + e.currentTarget.id,
    })
  }

})