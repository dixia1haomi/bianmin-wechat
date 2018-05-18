
Page({


  data: {

  },

  onLoad: function (op) {

  },


  // 剪贴板
  fuzhi_() {
    wx.setClipboardData({
      data: 'daishuweixin1',
      success: function (res) {
        wx.showModal({
          title: '袋鼠微信已复制',
          content: '你好、我是小优、很期待与你成为朋友、快去加我吧。',
          showCancel: false
        })
      }
    })
  },

  // 用户点击右上角分享
  onShareAppMessage: function () {
    return {
      title: '帮我增加顶置时间',
      path: '/pages/index/index1',
      imageUrl: '/img/150.jpg',
      success: (res) => {
        // 转发成功
      },
      fail: (res1) => {
        // 转发失败
      }
    }
  }
})