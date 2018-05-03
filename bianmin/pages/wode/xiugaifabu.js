import { Api } from '../../utils/Api.js'
const api = new Api()

Page({

  data: {
    Res: {},
    neirong: ""
  },

  onLoad: function (op) {
    // op.index = 上一页for-index
    this._load()
  },

  _load(index) {
    //上一个页面实例对象
    var pages = getCurrentPages();
    var prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage.data.Res)
    this.setData({ Res: prePage.data.Res })
  },

  // textarea_事件
  textarea_(e) {
    this.setData({ neirong: e.detail.value, cursor: e.detail.cursor })
  },

  // 提交
  tijiao_() {
    api.xiugaiNeirong({ id: this.data.Res.id, neirong: this.data.neirong }, res => {
      console.log('xiugaiNeirong', res)
      wx.navigateBack({ delta: 1 })
    })
  },
})