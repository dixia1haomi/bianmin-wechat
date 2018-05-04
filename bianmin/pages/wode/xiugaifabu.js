import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const utils = new Utils()
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
    // 处理换行符
    let neirong = utils.checkHuanHangFu2_1(this.data.neirong)
    // 请求
    api.xiugaiNeirong({ id: this.data.Res.id, neirong: neirong }, res => {
      console.log('xiugaiNeirong', res)
      wx.navigateBack({ delta: 1 })
    })
  },
})