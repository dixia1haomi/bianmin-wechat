
Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    huodongRes: {
      type: Object,
      value: null
    }

  },


  data: {

  },

  methods: {

    // 点击头图事件(在我的商家页点击头图进入商家详情页使用)
    toutu_tap_(e){
      this.triggerEvent('toutu', { id: e.currentTarget.id })
    },

  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
