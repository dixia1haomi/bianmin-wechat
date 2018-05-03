import { Api } from '../../utils/Api.js'
import { Cos } from '../../utils/Cos.js'
// import { Base } from '../../utils/Api.js'

const api = new Api()
const cos = new Cos()
// const base = new Base()

Page({

  data: {
    myShangjiaRes: {},
    // 修改名称
    xiugai_name_kaiguan: true,
    // 修改描述
    xiugai_miaoshu_kaiguan: true,
  },

  // 我的店铺
  onLoad: function (options) {
    this._load()
  },

  _load() {
    api.getMyShangjia({}, (res) => {
      console.log('我的店铺', res)
      this.setData({ myShangjiaRes: res.data })
    })
  },

  // 删除详情图
  shanchu_xiangqingtu_item_(e) {
    console.log('xiangqingtu_item-id', e.currentTarget.id)
    console.log('xiangqingtu_item-url', e.currentTarget.dataset.url)
    let id = e.currentTarget.id
    let url = e.currentTarget.dataset.url
    wx.showModal({
      title: '删除这张图片？', success: (res) => {
        if (res.confirm) {
          api.deleteShangjiaImg({ id: id, url: url }, (back) => {
            console.log('删除详情图', back)
            this._load()
          })
        }
      }
    })
  },

  // 添加图片
  tianjia_img_() {
    let imgArray = this.data.myShangjiaRes.withshangjia_img    // 详情图

    wx.chooseImage({
      count: 9 - imgArray.length, // 最多允许9张
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        let shangjia_id = this.data.myShangjiaRes.id
        let imgArr = res.tempFilePaths
        let cospath = "/shangjia"

        wx.showLoading({ title: '上传中', mask: true })
        cos.update_img_cos(cospath, imgArr, (back) => {
          // 详情图上传成功，写入详情图库
          let url = back.data.source_url
          api.createShangjiaImg({ shangjia_id: shangjia_id, url: url }, (createshangjiaimgBack) => {
            console.log('写入详情图到数据库OK', createshangjiaimgBack)
          })
        }, (ok) => {
          console.log('上传和写入结束', ok)
          wx.hideLoading()
          this._load()
        })
      }
    })
  },


  // 修改头图
  xiugai_toutu_() {
    wx.showModal({
      title: '修改店铺头图？', success: (res) => {
        if (res.confirm) {
          wx.chooseImage({
            count: 1, // 最多允许9张
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (chooseImage) => {
              // 上传新的 -> 修改头图（服务器删除COS旧图,更新新的商家头图url）
              let shangjia_id = this.data.myShangjiaRes.id
              let jiu_toutu = this.data.myShangjiaRes.toutu
              let imgArr = chooseImage.tempFilePaths
              let cospath = "/shangjia"

              wx.showLoading({ title: '上传中', mask: true })
              cos.update_img_cos(cospath, imgArr, (back) => {
                // 上传到COS成功，修改头图API
                let url = back.data.source_url
                api.xiugaiShangjiaToutu({ shangjia_id: shangjia_id, url: url, jiu_toutu: jiu_toutu }, (xiugaiBack) => {
                  console.log('修改头图OK', xiugaiBack)
                })
              }, (ok) => {
                console.log('上传和写入结束', ok)
                wx.hideLoading()
                this._load()
              })
            }
          })
        }
      }
    })
  },

  // -----------------------  修改名称  ------------------------

  // 修改名称允许输入事件
  xiugai_name_kaiguan_() {
    this.setData({ xiugai_name_kaiguan: false })
  },

  // 修改名称输入bindinput事件
  bindinput_name_(e) {
    console.log('修改名称bindinput事件', e.detail)
    this.setData({ name: e.detail.value })
  },

  // 修改名称取消
  xiugai_name_quxiao_() {
    this.setData({ xiugai_name_kaiguan: true, 'myShangjiaRes.name': this.data.myShangjiaRes.name })
  },

  // 修改名称确定
  xiugai_name_queding_() {
    let shangjia_id = this.data.myShangjiaRes.id
    let name = this.data.name
    api.xiugaiShangjiaName({ shangjia_id: shangjia_id, name: name }, (back) => {
      console.log('修改名称OK', back)
      this.setData({ xiugai_name_kaiguan: true, name: "" })
      this._load()
    })
  },

  // -----------------------  修改描述  ------------------------

  // 修改描述允许输入事件
  xiugai_miaoshu_kaiguan_() {
    this.setData({ xiugai_miaoshu_kaiguan: false })
  },

  // 修改描述输入bindinput事件
  bindinput_miaoshu_(e) {
    console.log('修改名称bindinput事件', e.detail)
    this.setData({ miaoshu: e.detail.value })
  },

  // 修改描述取消
  xiugai_miaoshu_quxiao_() {
    this.setData({ xiugai_miaoshu_kaiguan: true, 'myShangjiaRes.miaoshu': this.data.myShangjiaRes.miaoshu })
  },

  // 修改描述确定
  xiugai_miaoshu_queding_() {
    let shangjia_id = this.data.myShangjiaRes.id
    let miaoshu = this.data.miaoshu
    api.xiugaiShangjiaMiaoshu({ shangjia_id: shangjia_id, miaoshu: miaoshu }, (back) => {
      console.log('修改miaoshuOK', back)
      this.setData({ xiugai_miaoshu_kaiguan: true, miaoshu: "" })
      this._load()
    })
  },

  // -----------------------  修改地址  ------------------------

  xiugai_dizhi_() {
    wx.showModal({
      title: '确定修改地址？', success: (res) => {
        if (res.confirm) {
          api.authorize_userLocation(back => {
            console.log('授权地理位置', back)
            // 选择位置
            wx.chooseLocation({
              success: (e) => {
                console.log('success', e)
                // 去除“云南省曲靖市”
                if ((e.address.indexOf("云南省曲靖市")) != -1) {
                  e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
                }
                // 请求修改地址，经度，纬度
                wx.showLoading({ title: '修改中', mask: true })
                api.xiugaiShangjiaDizhi({
                  shangjia_id: this.data.myShangjiaRes.id,
                  dizhi: e.address,
                  longitude: e.longitude,
                  latitude: e.latitude
                }, (back) => {
                  console.log('修改商家地址OK', back)
                  wx.hideLoading()
                  this._load()
                })
              }
            })
          })
        }
      }
    })
  },

  // 转到商家详情页
  // go_shangjiaDetail_() {
  //   wx.navigateTo({ url: '/pages/shangjia/detail?id=' + this.data.myShangjiaRes.id })
  // },

  // 删除店铺
  deleteShangjia_(e) {
    wx.showModal({
      title: '删除店铺？', success: (res) => {
        if (res.confirm) {
          api.deleteShangjia({ id: e.currentTarget.id }, (res) => {
            console.log('删除店铺', res)
            wx.showToast({ title: '删除成功' })
            this._load()
          })
        }
      }
    })
  },

})