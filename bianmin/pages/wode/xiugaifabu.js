import { Api } from '../../utils/Api.js'
import { Utils } from '../../utils/utils.js'

const utils = new Utils()
const api = new Api()

//上一个页面实例对象
let prePage;

Page({

  data: {
    Res: {},
    neirong: ""
  },

  onLoad: function (op) {
    this._load()
  },

  _load() {
    //上一个页面实例对象
    var pages = getCurrentPages();
    // 赋给全局,刷新时要用
    prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage)
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
    // 验证
    if (!neirong || neirong.length < 10) {
      wx.showModal({ content: '最少输入10个字符', showCancel: false })
      return
    }
    // 请求
    api.xiugaiNeirong({ id: this.data.Res.id, neirong: neirong }, res => {
      console.log('xiugaiNeirong', res)
      // 调用上一页的_load()刷新
      prePage._load()
      // 返回上一页
      wx.navigateBack({ delta: 1 })
    })
  },
})