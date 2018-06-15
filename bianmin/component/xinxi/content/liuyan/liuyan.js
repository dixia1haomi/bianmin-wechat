

Component({

  properties: {

    Res: {
      type: Object,
      value: {}
    },

  },


  data: {
  },

  methods: {
    // 点击名称
    name_(e) {
      console.log('组件内部点击名称', e.currentTarget.dataset)
      this.triggerEvent('name', e.currentTarget.dataset)
    },
  }

})

