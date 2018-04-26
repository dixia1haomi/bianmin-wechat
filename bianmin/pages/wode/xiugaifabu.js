import { Api } from '../../utils/Api.js'
const api = new Api()

Page({

  data: {
    Res: {},
    neirong: ""
  },

  onLoad: function (op) {
    // op.index = 上一页for-index
    this._load(op.index)
  },

  _load(index) {
    //上一个页面实例对象
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage.data.Res[index])
    this.setData({ Res: prePage.data.Res[index] })
  },

  // textarea_事件
  textarea_(e) {
    this.setData({ neirong: e.detail.value, cursor: e.detail.cursor })
  },

  // 提交
  tijiao_() {
    wx.showLoading({ title: '提交中', mask: true })
    api.xiugaiNeirong({ id: this.data.Res.id, neirong: this.data.neirong }, res => {
      console.log('xiugaiNeirong', res)
      wx.hideLoading()
      wx.navigateBack({ delta: 1 })
    })
  },
})