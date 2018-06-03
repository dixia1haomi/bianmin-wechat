import { Api } from '../../utils/Api.js'

const api = new Api()
const app = getApp()

var wxbarcode = require('../../utils/hexiao/index.js');

Page({


  data: {
    juanRes: null,
    code: null,
  },


  onLoad: function (op) {
    console.log('kajuan-detail', op)
    this._load(op)
  },

  // 用户自行核销
  deletejuan_() {
    wx.showModal({
      title: '核销?', content: '确定要销毁？', success: (res) => {
        if (res.confirm) {
          let juanRes = this.data.juanRes
          api.hexiaoLingquHuodong({
            // state：0 用户自行核销标识
            params: { state: 0, shangjia_id: juanRes.shangjia_id, huodong_id: juanRes.huodong_id, id: juanRes.id }
          }, back => {
            console.log('用户自行核销OK', back)
            // back.msg = 成功 || 不存在 || 对比失败
            wx.showModal({ title: back.msg, success: (res) => { if (res.confirm) { wx.navigateBack({ delta: 1 }) } } })
          })
        }
      }
    })
  },


  _load(op) {
    // 查询活动劵详情
    api.getLingquHuodong({ params: { id: op.id } }, back => {
      console.log('查询活动劵详情', back)
      if (back.data) {
        let code = back.data.shangjia_id + '-' + back.data.huodong_id + '-' + back.data.id
        this.setData({ juanRes: back.data, code: code })
        console.log('code', code)
        /**
          * id: wxml文件中的 Canvas ID
          * code: 用于生成条形码的字符串
          * width: 生成的条形码宽度，单位 rpx
          * height: 生成的条形码高度，单位 rpx
         */
        wxbarcode.barcode('barcode', code, 680, 200);
        wxbarcode.qrcode('qrcode', code, 420, 420);
      }
    })
  },

})