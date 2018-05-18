import { Api } from '../../../utils/Api.js'
import { Cos } from '../../../utils/Cos.js'
// import { Utils } from '../../../utils/utils.js'

const api = new Api()
const cos = new Cos()
// const utils = new Utils()

Page({

  data: {
    myShangjiaRes: false,

    // 修改名称
    name: {
      disabled: true,
      value: ''
    },
    // 地址
    // address: {},
  },

  onLoad: function (op) {
    //上一个页面实例对象
    var pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage)
    this.setData({ myShangjiaRes: prePage.data.myShangjiaRes })
  },

  // -----------------------  修改名称  ------------------------
  // 确定要修改名称?
  input_() {
    console.log('点击input')
    if (this.data.name.disabled) {
      wx.showModal({ title: '修改名称?', success: (res) => { if (res.confirm) { this.setData({ 'name.disabled': false }) } } })
    }
  },

  // 修改名称bindinput事件
  com_name_(e) {
    console.log('修改名称', e.detail)
    this.setData({ 'name.value': e.detail.value })
  },

  // 失去焦点
  com_blur_input_() {
    wx.showModal({
      title: '提交修改?', success: (res) => {
        if (res.confirm) {
          // API 修改商家名称
          api.xiugaiShangjiaName({ shangjia_id: this.data.myShangjiaRes.id, name: this.data.name.value }, (back) => {
            console.log('修改名称OK', back)
            // 禁用修改名称input
            this.setData({ 'name.disabled': true })
          })
        }
      }
    })
  },


  // -----------------------  修改地址  ------------------------

  // 修改地址
  com_dizhi_(e) {
    console.log('修改地址', e.detail)
    // API 修改地址
    api.xiugaiShangjiaDizhi({
      shangjia_id: this.data.myShangjiaRes.id,
      dizhi: e.detail.name,
      longitude: e.detail.longitude,
      latitude: e.detail.latitude
    }, (back) => {
      console.log('修改商家地址OK', back)
      this.setData({ 'myShangjiaRes.dizhi': e.detail.name })
    })
  },

  // ----------------------- 修改头图 -----------------------

  xiugai_toutu_() {
    wx.showModal({
      title: '修改店铺头图？', success: (res) => {
        if (res.confirm) {
          wx.chooseImage({
            count: 1, // 最多允许9张
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            success: (resimg) => {
              // 上传新的 -> 修改头图（服务器删除COS旧图,更新新的商家头图url）
              let img = resimg.tempFilePaths
              let cospath = "/shangjia"
              // 上传到COS成功，修改头图API
              cos.update_img_cos(cospath, img, (back) => {
                let shangjia_id = this.data.myShangjiaRes.id
                let toutu = back.data.source_url
                api.xiugaiShangjiaToutu({ params: { shangjia_id: shangjia_id, toutu: toutu } }, (xiugaiBack) => {
                  console.log('修改头图OK', xiugaiBack)
                  this.setData({ 'myShangjiaRes.toutu': img[0] })
                })
              }, (ok) => {
                console.log('上传和写入结束', ok)
              })
            }
          })
        }
      }
    })
  },
})