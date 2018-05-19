import { Api } from '../../utils/Api.js'
import { Base } from '../../utils/Base.js'
import { Cos } from '../../utils/Cos.js'

import WxValidate from '../../validate/WxValidate.js'

const cos = new Cos()
const api = new Api()
const app = getApp()

//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则
const rules = {
  name: { required: true, rangelength: [2, 10] },
  toutu: { required: true },
  dizhi: { required: true },
  phone: { required: true }
}
// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  name: { required: '店名不能为空', rangelength: '店名长度在 2 到 10 之间' },
  toutu: { required: '头图不能为空' },
  dizhi: { required: '地址不能为空' },
  phone: { required: '电话不能为空' }
}

const wxValidate = new WxValidate(rules, messages)

//---------------------------------------------- 验证 ----------------------------------------------------

Page({

  data: {
    // 错误提示开关
    toptips_kaiguan: '',
    // 错误提示内容
    toptips_text: '',
    // 商家名称
    name: {
      value: '',
      cursor: 0
    },
    // 头图
    toutu: [],
    // 地址
    dizhi: {},
    // 电话
    phone: ''
  },


  onLoad: function (op) {

  },

  // 添加/修改头图
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


  // 商家名称
  com_name_(e) {
    console.log('商家名称', e.detail)
    this.setData({ name: e.detail })
  },

  // 选择地址
  com_dizi_(e) {
    console.log('选择地址', e.detail)
    this.setData({ dizhi: e.detail })
  },

  // 获取电话
  com_dianhua_(e) {
    console.log('获取电话', e.detail)
    this.setData({ phone: e.detail })
  },

  // 输入框 
  // com_textarea_(e) {
  //   console.log('textarea', e.detail)
  //   this.setData({ miaoshu: e.detail })
  // },




  // ----------------------------------------- 详情图 -----------------------------------------
  // xiangqingtu_() {
  //   let xiangqingtu_ImgArray = this.data.xiangqingtu
  //   wx.chooseImage({
  //     count: 9 - xiangqingtu_ImgArray.length, // 默认9
  //     sizeType: ['compressed'],         // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
  //     success: (res) => {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片,tempFilePaths = res.tempFilePaths
  //       console.log('xiangqingtu_Image', res)
  //       // 把选择的图片push进imgArray
  //       xiangqingtu_ImgArray = xiangqingtu_ImgArray.concat(res.tempFilePaths)
  //       this.setData({ xiangqingtu: xiangqingtu_ImgArray })
  //     }
  //   })
  // },




  // ----------------------------------------- 删除详情图 -----------------------------------------
  // shanchu_xiangqingtu_(e) {
  //   wx.showModal({
  //     title: '删除这张图片？', success: (res) => {
  //       if (res.confirm) {
  //         let key = e.currentTarget.id, xiangqingtuArray = this.data.xiangqingtu
  //         // splice删除数组中的元素
  //         xiangqingtuArray.splice(key, 1)
  //         this.setData({ xiangqingtu: xiangqingtuArray })
  //       }
  //     }
  //   })
  // },

  // ----------------------------------------- 提交 -----------------------------------------
  tijiao_(e) {
    console.log('提交', e.detail.formId)
    let params = {
      name: this.data.name.value,
      dizhi: this.data.dizhi.name,
      longitude: this.data.dizhi.longitude,
      latitude: this.data.dizhi.latitude,
      phone: this.data.phone,
      form_id: e.detail.formId
    }

    // 传入表单数据，调用验证方法
    let checkObj = {
      name: params.name,
      toutu: this.data.toutu,
      dizhi: params.dizhi,
      phone: params.phone
    }
    if (!wxValidate.checkForm(checkObj)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }
    // 先传头图，返回后再一起新增数据
    let img = this.data.toutu              // 图片array
    let cospath = "/shangjia"
    // cos上传
    cos.update_img_cos(cospath, img, (back) => {
      // 上传成功
      params.toutu = back.data.source_url
      // 新增商家
      api.createShangjia({ params: params }, res => {
        console.log('新增商家OK', res)
        // 进入下一页
        wx.showModal({
          title: '新增成功',
          content: '请继续添加图文详情。',
          showCancel: false,
          success: () => {
            wx.navigateTo({ url: '/pages/shangjia/my-shangjia/index' })
          }
        })
      })
    }, (ok) => {
      console.log('ok', ok)
    })

  },

})