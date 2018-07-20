Component({

  properties: {

    imgArr: {
      type: Array,
      value: []
    }

  },


  data: {

  },

  methods: {

    //
    item_(e) {
      // 预览
      console.log('预览', e.currentTarget.dataset)
      let img = this.data.imgArr,
        index = e.currentTarget.dataset.index,
        arr = []
      for (let i in img) {
        arr.push(img[i].url)
      }

      wx.previewImage({
        current: arr[index], // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      })
    },
  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})