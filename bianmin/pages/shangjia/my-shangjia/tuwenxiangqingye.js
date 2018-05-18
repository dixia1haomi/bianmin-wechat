import { Api } from '../../../utils/Api.js'
import { Cos } from '../../../utils/Cos.js'
import { Utils } from '../../../utils/utils.js'

const api = new Api()
const cos = new Cos()
const utils = new Utils()


Page({

  data: {
    Res: [],
    // 图文块图片
    content: {
      // 正在添加图文块时不显示添加按钮、默认显示
      state: false,
      img: [],
      text: {
        value: '',
        cursor: 0
      }
    },
  },

  onLoad: function (op) {
    //上一个页面实例对象
    var pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage)
    this.setData({ Res: prePage.data.myShangjiaRes.withshangjia_img, shangjia_id: prePage.data.myShangjiaRes.id })
  },

  // ------------------------------ 组件抛出的delete事件、携带商家IMG的ID --------------------------
  // 删除Res里对应的数据setData后让组件重新接受Res并渲染
  com_delete_(e) {
    console.log('com_delete_', e.detail.id)
    let res = this.data.Res
    for (let i in res) {
      if (res[i].id == e.detail.id) {
        res.splice(i, 1)
        break
      }
    }
    this.setData({ Res: res })
  },

  // 添加图文块
  create_content_() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: (res) => {
        this.setData({ 'content.img': res.tempFilePaths, 'content.state': true })
      }
    })
  },

  // 图文块textarea输入事件
  textarea_bindinput_(e) {
    console.log('图文块textarea输入事件', e)
    this.setData({ 'content.text': e.detail })
  },

  // 创建商家IMG
  content_queding_() {
    // 1.上传图片
    let img = this.data.content.img              // 图片array
    let cospath = "/shangjia"
    // cos上传
    cos.update_img_cos(cospath, img, (back) => {
      // 上传成功
      let params = {
        shangjia_id: this.data.shangjia_id,
        url: back.data.source_url,
        text: this.data.content.text.value
      }
      // 2.API新增商家IMG
      api.createShangjiaImg({ params: params }, res => {
        console.log('新增商家IMG-OK', res)
        // 更新Res
        let Res = this.data.Res
        Res.push(res.data)
        this.setData({ Res: Res, 'content.state': false, 'content.text.value': '', 'content.text.cursor': 0 })
      })
    }, (ok) => {
      console.log('ok', ok)
    })
  },

  // 取消
  content_quxiao_() {
    // 清空选择的img、显示添加按钮
    this.setData({ 'content.img': [], 'content.state': false, 'content.text.value': '', 'content.text.cursor': 0 })
  },



})