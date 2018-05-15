import { Api } from '../../utils/Api.js'

const api = new Api()

Page({

  data: {
    Res: false,
    loginState: false
  },




  // ---------------------------- onLoad -----------------------------
  onLoad: function (op) {
    // mobanxiaoxi携带id
    this._load(op.id)
  },

  _load(id) {
    // 查询单个便民信息
    api.findBianmin({ id: id }, (back) => {
      console.log('查询单个便民信息', back)
      this.setData({ Res: back.data })
    })
  },

  // 组件留言触发的登录弹窗
  com_login_() {
    this.setData({ loginState: true })
  }


})