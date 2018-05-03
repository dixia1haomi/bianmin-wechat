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
  phone: { required: true },
  miaoshu: { required: true, rangelength: [10, 200] },
  xiangqingtu: { required: true },
}
// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  name: { required: '名称不能为空', rangelength: '名称长度在 2 到 10 之间' },
  toutu: { required: '头图不能为空' },
  dizhi: { required: '地址不能为空' },
  phone: { required: '电话不能为空' },
  miaoshu: { required: '描述不能为空', rangelength: '描述长度在 10 到 200 之间' },
  xiangqingtu: { required: '详情图不能为空' },
}

const wxValidate = new WxValidate(rules, messages)

//---------------------------------------------- 验证 ----------------------------------------------------

Page({

  data: {
    // 商家名称
    name: "",
    // 头图
    toutu: [],
    // 地址
    dizhi: "",
    longitude: "",
    latitude: "",
    // 电话
    phone: '',
    // 描述
    miaoshu: "",
    miaoshuCursor: 0,
    // 详情图
    xiangqingtu: [],
    // 错误提示开关
    toptips_kaiguan: '',
    // // 错误提示内容
    toptips_text: '',
  },


  onLoad: function (op) {

  },


  // 商家名称
  name_(e) {
    console.log('商家名称', e.detail.value)
    this.setData({ name: e.detail.value })
  },

  // ----------------------------------------- 选择头图 -----------------------------------------
  toutu_() {
    // console.log('头图', e)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],         // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片,tempFilePaths = res.tempFilePaths
        console.log('toutu_Image', res)
        this.setData({ toutu: res.tempFilePaths })
      }
    })
  },

  // ----------------------------------------- 地址 -----------------------------------------
  dizhi_() {
    console.log('地址')
    // 授权地理位置
    new Base().authorize_userLocation(back => {
      console.log('授权地理位置', back)
      // 选择位置
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length);
          }
          // 记录已选择的位置
          this.setData({ dizhi: e.address, latitude: e.latitude, longitude: e.longitude })
        }
      })
    })
  },

  //  ----------------------------------------- 电话 -----------------------------------------
  _phone(e) {
    console.log('电话')
    api.getPhone({ encryptedData: e.detail.encryptedData, iv: e.detail.iv }, res => {
      console.log('phone', res.data)
      // 返回了电话号码
      this.setData({ phone: res.data })
    })
  },

  // button事件 获取电话
  getPhoneNumber_(e) {
    console.log('电话', e)
    // 如果用户允许获取电话
    if (e.detail.iv && e.detail.encryptedData) { this._phone(e) }
  },

  // ----------------------------------------- 描述 -----------------------------------------
  miaoshu_(e) {
    console.log('描述', e.detail.value)
    this.setData({ miaoshu: e.detail.value, miaoshuCursor: e.detail.cursor })
  },

  // ----------------------------------------- 详情图 -----------------------------------------
  xiangqingtu_() {
    let xiangqingtu_ImgArray = this.data.xiangqingtu
    wx.chooseImage({
      count: 9 - xiangqingtu_ImgArray.length, // 默认9
      sizeType: ['compressed'],         // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片,tempFilePaths = res.tempFilePaths
        console.log('xiangqingtu_Image', res)
        // 把选择的图片push进imgArray
        xiangqingtu_ImgArray = xiangqingtu_ImgArray.concat(res.tempFilePaths)
        this.setData({ xiangqingtu: xiangqingtu_ImgArray })
      }
    })
  },


  // ----------------------------------------- 删除头图 -----------------------------------------
  shanchu_toutu_(e) {
    wx.showModal({
      title: '删除这张图片？', success: (res) => {
        if (res.confirm) {
          let key = e.currentTarget.id, toutuArray = this.data.toutu
          // splice删除数组中的元素
          toutuArray.splice(key, 1)
          this.setData({ toutu: toutuArray })
        }
      }
    })
  },

  // ----------------------------------------- 删除详情图 -----------------------------------------
  shanchu_xiangqingtu_(e) {
    wx.showModal({
      title: '删除这张图片？', success: (res) => {
        if (res.confirm) {
          let key = e.currentTarget.id, xiangqingtuArray = this.data.xiangqingtu
          // splice删除数组中的元素
          xiangqingtuArray.splice(key, 1)
          this.setData({ xiangqingtu: xiangqingtuArray })
        }
      }
    })
  },

  // ----------------------------------------- 提交 -----------------------------------------
  tijiao_() {
    console.log('提交')
    let params = {
      name: this.data.name,
      dizhi: this.data.dizhi,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      phone: this.data.phone,
      miaoshu: this.data.miaoshu,
    }

    // 传入表单数据，调用验证方法
    let checkObj = {
      name: params.name,
      toutu: this.data.toutu,
      dizhi: params.dizhi,
      phone: params.phone,
      miaoshu: params.miaoshu,
      xiangqingtu: this.data.xiangqingtu
    }
    if (!wxValidate.checkForm(checkObj)) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }



    // 先传头图，返回后再一起新增数据
    let img = this.data.toutu              // 图片array
    let length = img.length    // 总共几张图
    let cospath = "/shangjia"

    this.updateImg(cospath, img, length, (back) => {
      console.log('头图上传成功-back', back)
      // 上传成功，写入数据库
      params.toutu = back.data.source_url
      api.createShangjia(params, res => {
        console.log('新增商家OK', res)
        // 再传详情图
        let xiangqingtu = this.data.xiangqingtu
        let xiangqingtu_length = xiangqingtu.length
        this.updateImg(cospath, xiangqingtu, xiangqingtu_length, (xiangqingtuBack) => {
          // 详情图上传成功，写入详情图库
          let shangjia_id = res.data.id
          let url = xiangqingtuBack.data.source_url
          api.createShangjiaImg({ shangjia_id: shangjia_id, url: url }, (createshangjiaimgBack) => {
            console.log('写入详情图到数据库OK', createshangjiaimgBack)
          })
        }, (xiangqingtuOk) => {
          console.log('传详情图OK', xiangqingtuOk)
          // 返回主页
          wx.reLaunch({ url: '/pages/index/index1' })
        })
      })
    }, (ok) => {
      console.log('传头图OK', ok)
    })
  },

  // ----------------------------------------- 上传图片 -----------------------------------------
  updateImg(cospath, img, length, callback, callbackupdateOk) {
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    // var length = this.data.img.length; //总共个数
    var i = 0; //第几个
    cos.uploadDIY(cospath, img, successUp, failUp, i, length, back => {
      console.log('back--------------', JSON.parse(back))
      callback && callback(JSON.parse(back))
    }, updateOk => {
      console.log('updateOk--上传完成')
      callbackupdateOk && callbackupdateOk(updateOk)
    });
  },

})