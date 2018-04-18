import { Api } from '../../utils/Api.js'
import { Base } from '../../utils/Base.js'
import { Cos } from '../../utils/Cos.js'

const cos = new Cos()
const api = new Api()
const app = getApp()

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

  },


  onLoad: function (op) {

  },


  // 商家名称
  name_(e) {
    console.log('商家名称', e.detail.value)
    this.setData({ name: e.detail.value })
  },

  // 头图
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

  // 地址
  dizhi_() {
    console.log('地址')
    // 授权地理位置
    new Base().authorize_userLocation(back => {
      console.log('授权地理位置', back)
      // 选择位置
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 记录已选择的位置
          this.setData({ dizhi: e.name, latitude: e.latitude, longitude: e.longitude })
        }
      })
    })
  },

  // 电话
  phone_(e) {
    console.log('电话')
    wx.showLoading({ title: '请稍候' })
    api.getPhone({ encryptedData: e.detail.encryptedData, iv: e.detail.iv }, res => {
      wx.hideLoading()
      console.log('phone', res.data)
      // 返回了电话号码
      this.setData({ phone: res.data })
    })
  },

  // button事件 获取电话
  getPhoneNumber(e) {
    console.log('电话', e)
    // 如果用户允许获取电话
    if (e.detail.iv && e.detail.encryptedData) { app.checkToken(() => { this.phone_(e) }) }
  },

  // 描述
  miaoshu_(e) {
    console.log('描述', e.detail.value)
    this.setData({ miaoshu: e.detail.value, miaoshuCursor: e.detail.cursor })
  },

  // 详情图
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

  // 提交
  tijiao_() {
    console.log('提交')
    let params = {
      name: this.data.name,
      // toutu: this.data.toutu,
      dizhi: this.data.dizhi,
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      phone: this.data.phone,
      miaoshu: this.data.miaoshu,
      // xiangqingtu: this.data.xiangqingtu
    }

    // 验证
    if (this.data.name.length == 0) {
      wx.showToast({ title: '请认真填写name' })
      return
    }

    if (this.data.toutu.length == 0) {
      wx.showToast({ title: 'toutu不能为空' })
      return
    }

    if (this.data.dizhi.length == 0) {
      wx.showToast({ title: 'dizhi不能为空' })
      return
    }

    if (this.data.longitude.length == 0) {
      wx.showToast({ title: 'longitude不能为空' })
      return
    }

    if (this.data.latitude.length == 0) {
      wx.showToast({ title: 'latitude不能为空' })
      return
    }

    if (this.data.phone.length == 0) {
      wx.showToast({ title: '电话不能为空' })
      return
    }

    if (this.data.miaoshu.length == 0) {
      wx.showToast({ title: 'miaoshu不能为空' })
      return
    }

    // if (this.data.xiangqingtu.length == 0) {
    //   wx.showToast({ title: 'xiangqingtu不能为空' })
    //   return
    // }

    // 禁止穿透
    wx.showLoading({ title: '发布中..', mask: true })

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
          // 隐藏loading
          wx.hideLoading()
        })
      })
    }, (ok) => {
      console.log('传头图OK', ok)
    })


    // api.createList(params, res => {
    //   console.log('有图片create', res)
    //   // 有图片,上传,获取ID
    //   let list_id = res.data.id
    //   this.updateImg(back => {
    //     console.log('update-img', back)
    //     // 上传成功，写入数据库
    //     api.createImg({ list_id: list_id, url: back.data.source_url }, res => {
    //       console.log('写入图片到数据库OK', res)
    //     })
    //   }, ok => {
    //     console.log('ok', ok)
    //     // 隐藏Loading
    //     wx.hideLoading()
    //     // 返回主页
    //     wx.reLaunch({ url: '/pages/index/index1' })
    //   })
    // })
  },

  // 上传图片
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