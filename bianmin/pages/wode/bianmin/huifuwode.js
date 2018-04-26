import { Api } from '../../../utils/Api.js'

const api = new Api()


Page({

  data: {
    Res: [],
  },


  onLoad: function (op) {
    this._load()
  },

  _load() {
    // 回复我的
    api.huifuWode({}, (back) => {
      console.log('回复我的', back.data)
      this.setData({ Res: back.data })
    })
  },

  // 去详细信息页
  go_Bianmin_Detail_(e) {
    // 携带便民信息ID
    wx.navigateTo({ url: '/pages/wode/bianmin/huifuwode-detail?id=' + e.currentTarget.id })
  }
})