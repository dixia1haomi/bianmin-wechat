

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // title
    title: {
      type: String,
      value: '选择图片'
    },

    // 数量
    count: {
      type: Number,
      value: 1
    },

  },


  data: {
    // 图片数组
    img: [],
    setData: {

    }
  },

  methods: {
    // 选择图片
    xuanzeimg_: function () {
      let imgArray = this.data.img
      wx.chooseImage({
        count: this.data.count - imgArray.length,      // 默认9
        sizeType: ['compressed'],        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片、tempFilePaths = res.tempFilePaths
          // 把选择的图片concat进imgArray
          imgArray = imgArray.concat(res.tempFilePaths)
          // 设置数据
          this.setData({ img: imgArray })
          // 抛出
          this.triggerEvent('xuanzetupian', imgArray)
        }
      })
    },

    // 删除图片
    deleteimg_(e) {
      wx.showModal({
        title: '删除这张图片？',
        success: (res) => {
          if (res.confirm) {
            let key = e.currentTarget.id
            let imgArray = this.data.img
            // splice删除数组中的元素
            imgArray.splice(key, 1)
            // 设置数据
            this.setData({ img: imgArray })
            // 抛出
            this.triggerEvent('xuanzetupian', imgArray)
          }
        }
      })
    },

  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
