
// 房产出租
// 房型
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // title
    title: {
      type: String,
      value: 'title'
    },

    // 数组
    range: {
      type: Array,
      value: []
    },

    // index
    index: {
      type: Number,
      value: 0
    },
  },


  data: {

  },

  methods: {
    // picker
    bindPickerChange(e) {
      console.log('picker', e)
      this.setData({ index: e.detail.value }, () => {
        this.triggerEvent('picker', e.detail)
      })
    },

  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
