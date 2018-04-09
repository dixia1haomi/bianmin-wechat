
import { Api } from '../../utils/Api.js'
import { Cos } from '../../utils/Cos.js'

const cos = new Cos()
const api = new Api()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 类别
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,

    // 内容
    textarea: {
      value: "",
      cursor: 0
    },

    // 图片
    img: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 类别事件
  leibiexuanzeqi: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.setData({
      index: e.detail.value,
    })
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
    wx.chooseImage({
      count: 9, // 默认9
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // var tempFilePaths = res.tempFilePaths
        console.log('chooseImage', res)

        this.setData({ img: res.tempFilePaths })
      }
    })
  },

  // 上传图片
  updateImg(callback, callbackupdateOk) {
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = this.data.img.length; //总共个数
    var i = 0; //第几个
    cos.uploadDIY(this.data.img, successUp, failUp, i, length, back => {
      console.log('back--------------', JSON.parse(back))
      callback && callback(JSON.parse(back))
    }, updateOk => {
      console.log('updateOk--上传完成')
      callbackupdateOk && callbackupdateOk(updateOk)
    });
  },

  // tijiao
  tijiao() {
    // 给服务器的参数，user_id服务器获取
    let params = {
      leibie: this.data.array[this.data.index],
      neirong: this.data.textarea.value
    }
    console.log('params', params)

    if (!this.data.textarea.value) {
      wx.showToast({ title: '内容不能为空' })
      return
    }

    // 禁止穿透
    wx.showLoading({ title: '发布中..', mask: true })

    api.createList(params, res => {

      console.log('create', res)
      // 检查是否有图片准备上传
      if (this.data.img.length != 0) {
        //有图片,上传,获取ID
        let list_id = res.data.id
        this.updateImg(back => {
          console.log('update-img', back)
          // 上传成功，写入数据库
          api.createImg({ list_id: list_id, url: back.data.source_url }, res => {
            console.log('写入图片到数据库OK', res)
          })
        }, ok => {
          console.log('ok', ok)
          // 隐藏Loading
          wx.hideLoading()
          // 返回主页
          wx.redirectTo({
            url: '/pages/index/index1'
          })

        })
      }
    })
  },



  // ----------------------------------------------------------




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})