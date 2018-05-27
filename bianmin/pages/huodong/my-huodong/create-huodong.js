import { Api } from '../../../utils/Api.js'
import { Cos } from '../../../utils/Cos.js'
import { Utils } from '../../../utils/utils.js'

import WxValidate from '../../../validate/WxValidate.js'

const api = new Api()
const cos = new Cos()
const utils = new Utils()

//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则
const rules = {
  shangjia_id: { required: true },
  biaoti: { required: true },
  yuanjia: { required: true },
  huodongjia: { required: true },
  shuliang: { required: true },
  tiaojian: { required: true },
  jieshu_time: { required: true },
  shuoming: { required: true },
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  shangjia_id: { required: '出现了未知错误' },
  biaoti: { required: '标题不能为空' },
  yuanjia: { required: '原价不能为空' },
  huodongjia: { required: '活动价不能为空' },
  shuliang: { required: '数量不能为空' },
  tiaojian: { required: '条件不能为空' },
  jieshu_time: { required: '结束时间不能为空' },
  shuoming: { required: '说明不能为空' },
}

const wxValidate = new WxValidate(rules, messages)

//---------------------------------------------- 验证 ----------------------------------------------------

Page({

  data: {
    // 头图
    toutu: [],
    // 有效期
    start_data: '',
    end_data: '',
    // 最大数量(3位数)
    maxshuliang: 3,
    // 原价有小数点
    maxyuanjia: 5,
    // 活动价有小数点
    maxhuodongjia: 5,
    // 说明
    shuoming: {
      cursor: 0
    },
    // params
    params: {
      // 商家ID
      shangjia_id: null,
      // 活动标题
      biaoti: '',
      // 原价
      yuanjia: '',
      // 活动价
      huodongjia: '',
      // 数量
      shuliang: '',
      // 条件
      tiaojian: '',
      // 结束时间
      jieshu_time: '',
      // 说明
      shuoming: ''
    },

    // 错误提示开关
    toptips_kaiguan: '',
    // 错误提示内容
    toptips_text: '',
  },


  onLoad: function (op) {
    this.setData({ 'params.shangjia_id': op.id })
    // 获得picker组件的开始日期和结束日期
    this.get_picker_time()
  },

  // 活动标题
  com_biaoti_(e) {
    console.log('com_biaoti_', e.detail)
    this.setData({ 'params.biaoti': e.detail.value })
  },

  // 头图
  tianjia_toutu_() {
    if (this.data.toutu.length > 0) {
      wx.showModal({
        title: '更换这张图片？', success: (res) => {
          if (res.confirm) {
            // 选择图片
            wx.chooseImage({
              count: 1,
              sizeType: ['compressed'],         // 可以指定是原图还是压缩图，默认二者都有
              success: (res) => {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片,tempFilePaths = res.tempFilePaths
                this.setData({ toutu: res.tempFilePaths })
              }
            })
          }
        }
      })
    } else {
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],         // 可以指定是原图还是压缩图，默认二者都有
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片,tempFilePaths = res.tempFilePaths
          this.setData({ toutu: res.tempFilePaths })
        }
      })
    }
  },


  // 原价
  com_yuanjia_(e) {
    console.log('com_yuanjia_', e.detail)
    this.setData({ 'params.yuanjia': e.detail.value })
  },

  // 活动价
  com_huodongjia_(e) {
    console.log('com_huodongjia_', e.detail)
    this.setData({ 'params.huodongjia': e.detail.value })
  },

  // 物品数量
  com_shuliang_(e) {
    console.log('com_shuliang_', e.detail)
    this.setData({ 'params.shuliang': e.detail.value })
  },

  // 条件
  com_tiaojian_(e) {
    console.log('com_tiaojian_', e.detail)
    this.setData({ 'params.tiaojian': e.detail.value })
  },

  // 结束时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({ 'params.jieshu_time': e.detail.value })
  },

  // 活动说明
  textarea_bindinput_(e) {
    console.log('textarea_bindinput_', e.detail)
    this.setData({
      'shuoming.cursor': e.detail.cursor,
      'params.shuoming': e.detail.value
    })
  },

  // 确认创建活动
  chuangjian_(e) {
    console.log('提交', e.detail.formId, 'params', this.data.params)
    let params = this.data.params
    params.form_id = e.detail.formId

    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm(params)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }

    // 先传头图，返回后再一起新增数据
    let img = this.data.toutu              // 图片array
    if (img.length != 1) {
      wx.showModal({ title: '头图不能为空' })
      return
    }
    let cospath = "/huodong"
    // cos上传
    cos.update_img_cos(cospath, img, (back) => {
      // 上传成功
      params.toutu = back.data.source_url
      // 新增商家
      api.createShangjiaHuodong({ params: params }, res => {
        console.log('新增活动OK', res)
        // 进入下一页
        wx.showModal({
          title: '创建成功成功',
          content: '请继续添加活动图文详情',
          showCancel: false,
          success: () => {
            wx.navigateTo({ url: '/pages/huodong/my-huodong/index?id=' + res.data.id })
          }
        })
      })
    }, (ok) => {
      console.log('ok', ok)
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