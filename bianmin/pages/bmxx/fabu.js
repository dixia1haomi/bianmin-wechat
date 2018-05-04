
import { Api } from '../../utils/Api.js'
import { Base } from '../../utils/Base.js'
import { Cos } from '../../utils/Cos.js'
import { Config } from '../../utils/Config.js'
import { Utils } from '../../utils/utils.js'

import WxValidate from '../../validate/WxValidate.js'

const cos = new Cos()
const api = new Api()
const utils = new Utils()
const app = getApp()

//---------------------------------------------- 验证 ----------------------------------------------------
// 验证字段的规则
const rules = {
  neirong: { required: true, rangelength: [10, 200] },
  address: { required: true },
  phone: { required: true }
}
// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  neirong: { required: '请修改内容', rangelength: '内容长度在 10 到 200 之间' },
  address: { required: '地址不能为空' },
  phone: { required: '电话不能为空' }
}

const wxValidate = new WxValidate(rules, messages)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // index
    index: 0,
    // 内容
    textarea: {
      value: "",
      cursor: 0
    },
    // 图片
    img: [],
    // 填充textarea
    textareaValue: "",
    // 电话
    phone: "",
    // 地址
    address: "",
    // 经度
    longitude: "",
    // 纬度
    latitude: "",
    // leimu下的填充选项
    leimuObj: Config.moban,

    // 错误提示开关
    toptips_kaiguan: '',
    // // 错误提示内容
    toptips_text: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    // op携带类目的key
    this.setData({ index: op.leimu })
  },

  // 
  form_(e) {
    console.log('form', e.detail)
  },


  // 填充模板
  tianchong() {
    // 根据index获得Config.moban对应的item
    let item = this.data.leimuObj[this.data.index].item
    console.log('item', item)
    // 判断item的长度，大于1就用组件选择，否则直接填充
    if (item.length > 1) {
      // 有多中选择，提取出数组给选择组件
      let itemArray = []
      for (let i in item) { itemArray.push(item[i].name) }

      // 打开选择组件填充
      wx.showActionSheet({
        itemList: itemArray,
        success: (res) => { this.setData({ textareaValue: item[res.tapIndex].value }) }
      })
    } else {
      // 直接填充
      this.setData({ textareaValue: item[0].value })
    }
  },

  // textarea事件
  text: function (e) {
    console.log('text发送选择改变，携带值为', e.detail)
    this.setData({
      'textarea.value': e.detail.value,
      'textarea.cursor': e.detail.cursor,
    })
  },

  updateimg: function () {
    let imgArray = this.data.img

    wx.chooseImage({
      count: 4 - imgArray.length, // 默认9
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        console.log('chooseImage', res)
        // 把选择的图片push进imgArray
        imgArray = imgArray.concat(res.tempFilePaths)
        console.log('imgArray', imgArray)
        this.setData({ img: imgArray })
      }
    })
  },

  // 上传图片
  updateImg(cospath, callback, callbackupdateOk) {
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = this.data.img.length; //总共个数
    var i = 0; //第几个
    cos.uploadDIY(cospath, this.data.img, successUp, failUp, i, length, back => {
      console.log('back--------------', JSON.parse(back))
      callback && callback(JSON.parse(back))
    }, updateOk => {
      console.log('updateOk--上传完成')
      callbackupdateOk && callbackupdateOk(updateOk)
    });
  },

  // 删除图片
  shanchuImg(e) {
    wx.showModal({
      title: '删除这张图片？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          let key = e.currentTarget.id, imgArray = this.data.img
          // splice删除数组中的元素
          imgArray.splice(key, 1)
          this.setData({ img: imgArray })
        }
      }
    })
  },

  // tijiao
  tijiao(e) {
    console.log('tijiao', e.detail.formId)


    // 给服务器的参数，user_id服务器获取
    let params = {
      leibie: this.data.leimuObj[this.data.index].leimu,
      neirong: this.data.textarea.value,
      phone: this.data.phone,
      address: this.data.address,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      form_id: e.detail.formId
    }
    // 处理换行符
    params.neirong = utils.checkHuanHangFu2_1(params.neirong)
    console.log('params', params)

    // 传入表单数据，调用验证方法
    if (!wxValidate.checkForm({ neirong: params.neirong, phone: params.phone, address: params.address })) {
      const error = wxValidate.errorList[0]
      // 调用组件tips提示
      this.setData({ toptips_kaiguan: true, toptips_text: error.msg })
      return false
    }

    // 检查是否有图片准备上传
    if (this.data.img.length != 0) {
      api.createList(params, res => {
        console.log('有图片create', res)
        // 有图片,上传,获取ID
        let list_id = res.data.id
        let cospath = "/bianmin"
        this.updateImg(cospath, back => {
          console.log('update-img', back)
          // 上传成功，写入数据库
          api.createImg({ list_id: list_id, url: back.data.source_url }, res => {
            console.log('写入图片到数据库OK', res)
          })
        }, ok => {
          console.log('ok', ok)
          // 返回主页
          wx.reLaunch({ url: '/pages/index/index1' })
        })
      })
    } else {
      // 没图片
      api.createList(params, res => {
        console.log('没图片create', res)
        // 返回主页
        wx.reLaunch({ url: '/pages/index/index1' })
      })
    }
  },




  // ----------------------------------------------------------
  // 选择地址事件
  dizhi() {
    // 授权地理位置
    new Base().authorize_userLocation(back => {
      console.log('授权地理位置', back)
      // 选择位置
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
          }
          // 记录已选择的位置
          this.setData({ address: e.address, latitude: e.latitude, longitude: e.longitude })
        }
      })
    })
  },

  // button事件 获取电话
  getPhoneNumber_(e) {
    // 如果用户允许获取电话
    if (e.detail.iv && e.detail.encryptedData) { this._getPhone(e) }
  },

  // API获取电话号码
  _getPhone(e) {
    wx.showLoading({ title: '请稍候' })
    api.getPhone({ encryptedData: e.detail.encryptedData, iv: e.detail.iv }, res => {
      wx.hideLoading()
      console.log('phone', res.data)
      // 返回了电话号码
      this.setData({ phone: res.data })
    })
  },

})


