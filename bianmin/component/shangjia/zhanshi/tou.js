
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

    // 打开地图查看地址
    open_map_() {
      wx.openLocation({
        latitude: parseFloat(this.data.shangjiaRes.latitude),
        longitude: parseFloat(this.data.shangjiaRes.longitude),
        name: this.data.shangjiaRes.name,
        scale: 28
      })
    },

    // 拨打电话
    call_phone_() {
      wx.makePhoneCall({
        phoneNumber: this.data.shangjiaRes.phone
      })
    },
  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
