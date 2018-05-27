
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    shangjiaList: {
      type: Array,
      value: []
    }

  },


  data: {

  },

  methods: {

    // 去商家详情页
    scroll(e) { wx.navigateTo({ url: '/pages/shangjia/detail?id=' + e.currentTarget.id }) },

    // 去商家列表页
    go_shangjiaList_() { wx.navigateTo({ url: '/pages/shangjia/list' }) },

    // 去我的页
    go_wode_() { wx.navigateTo({ url: '/pages/wode/index' }) },
  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
