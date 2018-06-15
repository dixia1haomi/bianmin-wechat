import { Api } from '../../../utils/Api.js'

const api = new Api()
const app = getApp()

Page({


  data: {

  },


  onLoad: function (op) {
    this._load(op)
  },

  _load(op, callback) {
    // 查询单个便民信息
    api.findBianmin({ id: op.id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
  },


  // 顶置
  dingzhi_() {
    if (app.data.LoginState) {
      api.createBmxxDingZhi({ id: this.data.Res.id }, back => {
        console.log('增加顶置时间OK', back)
        // 提示 帮顶成功 || 已经顶过
        wx.showModal({
          title: back.msg,
          content: '感谢使用袋鼠同城',
          showCancel: false
        })

        // 刷新(信息ID)
        this._load({ id: this.data.Res.id })
      })
    } else {
      // 显示登录
      this.setData({ loginState: true })
    }
  },

})