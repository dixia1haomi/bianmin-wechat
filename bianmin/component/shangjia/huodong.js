
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    shangjiaRes: {
      type: Object,
      value: null
    }

  },


  data: {

  },

  methods: {

    // 去活动详情页
    go_huodong_detail_(e) {
      wx.navigateTo({ url: '/pages/huodong/detail?id=' + e.currentTarget.id })
    }


  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
