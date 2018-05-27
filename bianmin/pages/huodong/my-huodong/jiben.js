import { Api } from '../../../utils/Api.js'
import { Cos } from '../../../utils/Cos.js'
import { Utils } from '../../../utils/utils.js'


const api = new Api()
const cos = new Cos()
const utils = new Utils()


Page({

  data: {
    huodongRes: false,
    // 修改标题
    biaoti: {
      disabled: true,
      value: ''
    },
    // 修改原价
    yuanjia: {
      disabled: true,
      value: ''
    },
    // 修改活动价
    huodongjia: {
      disabled: true,
      value: ''
    },
    // 修改数量
    shuliang: {
      disabled: true,
      value: ''
    },
    // 修改条件
    tiaojian: {
      disabled: true,
      value: ''
    },
    // 修改说明
    shuoming: {
      disabled: true,
      value: ''
    },

    // 有效期
    start_data: '',
    end_data: '',
  },

  onLoad: function (op) {
    //上一个页面实例对象
    var pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage)
    this.setData({ huodongRes: prePage.data.huodongRes })

    // 获得picker组件的开始日期和结束日期
    this.get_picker_time()
  },

  // ----------------------- 修改标题 -----------------------
  // 修改名称bindinput事件
  com_biaoti_(e) {
    console.log('修改标题', e.detail)
    this.setData({ 'biaoti.value': e.detail.value })
  },

  // 确定
  com_biaoti_queding_() {
    // 验证
    let huodong_id = this.data.huodongRes.id
    let biaoti = this.data.biaoti.value
    if (biaoti.length < 5) {
      wx.showModal({
        title: '长度不能小于5'
      })
      return
    }
    api.xiugaiHuodongBiaoti({ huodong_id: huodong_id, biaoti: biaoti }, (back) => {
      console.log('修改活动标题OK', back)
      // 禁用修改名称input
      this.setData({ 'biaoti.disabled': true, 'huodongRes.biaoti': biaoti })
    })
  },


  // ----------------------- 修改原价 -----------------------
  // 修改原价bindinput事件
  com_yuanjia_(e) {
    console.log('修改原价', e.detail)
    this.setData({ 'yuanjia.value': e.detail.value })
  },

  // 确定
  com_yuanjia_queding_() {
    console.log('修改原价确定')
    // * 验证
    let huodong_id = this.data.huodongRes.id
    let yuanjia = this.data.yuanjia.value
    api.xiugaiHuodongYuanjia({ huodong_id: huodong_id, yuanjia: yuanjia }, (back) => {
      console.log('修改活动原价OK', back)
      // 禁用修改原价input
      this.setData({ 'yuanjia.disabled': true, 'huodongRes.yuanjia': yuanjia })
    })
  },


  // ----------------------- 修改活动价 -----------------------
  com_huodongjia_(e) {
    this.setData({ 'huodongjia.value': e.detail.value })
  },

  // 确定
  com_huodongjia_queding_() {
    // * 验证
    let huodong_id = this.data.huodongRes.id
    let huodongjia = this.data.huodongjia.value
    api.xiugaiHuodongHuodongjia({ huodong_id: huodong_id, huodongjia: huodongjia }, (back) => {
      console.log('修改活动价OK', back)
      // 禁用修改原价input
      this.setData({ 'huodongjia.disabled': true, 'huodongRes.huodongjia': huodongjia })
    })
  },


  // ----------------------- 修改数量 -----------------------
  // 修改原价bindinput事件
  com_shuliang_(e) {
    console.log('修改数量', e.detail)
    this.setData({ 'shuliang.value': e.detail.value })
  },

  // 确定
  com_shuliang_queding_() {
    console.log('修改数量确定')
    // * 验证
    let huodong_id = this.data.huodongRes.id
    let shuliang = this.data.shuliang.value
    api.xiugaiHuodongShuliang({ huodong_id: huodong_id, shuliang: shuliang }, (back) => {
      console.log('修改活动数量OK', back)
      // 禁用修改原价input
      this.setData({ 'shuliang.disabled': true, 'huodongRes.shuliang': shuliang })
    })
  },

  // ----------------------- 修改条件 -----------------------
  com_tiaojian_(e) {
    console.log('修改条件', e.detail)
    this.setData({ 'tiaojian.value': e.detail.value })
  },

  // 确定
  com_tiaojian_queding_() {
    console.log('修改条件确定')
    // * 验证
    let huodong_id = this.data.huodongRes.id
    let tiaojian = this.data.tiaojian.value
    api.xiugaiHuodongTiaojian({ huodong_id: huodong_id, tiaojian: tiaojian }, (back) => {
      console.log('修改活动条件OK', back)
      // 禁用修改原价input
      this.setData({ 'tiaojian.disabled': true, 'huodongRes.tiaojian': tiaojian })
    })
  },

  // ----------------------- 修改结束时间 -----------------------
  bindDateChange_: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // 修改结束时间
    // * 验证
    let huodong_id = this.data.huodongRes.id
    let jieshu_time = e.detail.value
    api.xiugaiHuodongTime({ huodong_id: huodong_id, jieshu_time: jieshu_time }, (back) => {
      console.log('修改结束时间OK', back)
      // 禁用修改原价input
      this.setData({ 'huodongRes.jieshu_time': jieshu_time })
    })
  },


  // ----------------------- 修改说明 -----------------------
  com_shuoming_(e) {
    console.log('修改说明', e.detail)
    this.setData({ 'shuoming.value': e.detail.value })
  },

  // 确定
  com_shuoming_queding_() {
    console.log('修改说明确定')
    // * 验证
    let huodong_id = this.data.huodongRes.id
    let shuoming = this.data.shuoming.value
    api.xiugaiHuodongShuoming({ huodong_id: huodong_id, shuoming: shuoming }, (back) => {
      console.log('修改活动说明OK', back)
      // 禁用修改说明input
      this.setData({ 'shuoming.disabled': true, 'huodongRes.shuoming': shuoming })
    })
  },



  // ----------------------- 修改头图 -----------------------

  xiugai_huodong_toutu_() {
    wx.showModal({
      title: '修改活动头图？', success: (res) => {
        if (res.confirm) {
          wx.chooseImage({
            count: 1, // 最多允许9张
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            success: (resimg) => {
              // 上传新的 -> 修改头图（服务器删除COS旧图,更新新的商家头图url）
              let img = resimg.tempFilePaths
              let cospath = "/huodong"
              // 上传到COS成功，修改头图API
              cos.update_img_cos(cospath, img, (back) => {
                let huodong_id = this.data.huodongRes.id
                let toutu = back.data.source_url
                // 修改活动头图
                api.xiugaiHuodongToutu({ params: { huodong_id: huodong_id, toutu: toutu } }, (xiugaiBack) => {
                  console.log('修改活动头图OK', xiugaiBack)
                  this.setData({ 'huodongRes.toutu': img[0] })
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

  // 获得picker组件的开始日期和结束日期
  get_picker_time() {
    this.setData({
      start_data: utils.get_Y_M_D(),
      end_data: utils.get_Y_M_1_D()
    })
  },

})