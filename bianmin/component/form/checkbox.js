Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 接受的数组必须是Arr这种结构
    Arr: {
      type: Array,
      value: []
    },
    // Arr: [{
    //   name: 'a',
    //   state: false
    // }, {
    //   name: 'b',
    //   state: false
    // }, {
    //   name: 'c',
    //   state: false
    // }],

    // 数量限制
    xianzhi: {
      type: Number,
      value: 99
    }

  },


  data: {
    // 返回的数组
    returnArr: [],
  },

  methods: {

    // 
    // checkboxChange(e) {
    //   console.log('checkbox', e.detail.value)
    // },
    selectRep: function(e) {
      let index = e.currentTarget.dataset.index; // 获得index
      let Arr = this.data.Arr // 获得原始数组
      let returnArr = this.data.returnArr // 要返回的数组

      // 判断是选中还是取消
      if (Arr[index].state) {
        // 取消 -> 如果返回的数组的某一项被取消选中则删除 -> 设置state
        let name = returnArr.indexOf(Arr[index].name); // 返回的数组中是否包含操作的元素
        // 包含就删除
        if (name > -1) {
          returnArr.splice(name, 1);
        }
        // 设置state
        this.setData({
          ['Arr[' + index + '].state']: false
        })
      } else {
        // 选中 -> 判断限制数量
        if (returnArr.length < this.data.xianzhi) {
          returnArr.push(Arr[index].name)
          this.setData({
            ['Arr[' + index + '].state']: true
          })
        }
      }

      console.log('returnArr', returnArr)
      this.triggerEvent('checkbox', returnArr)
    }


  },



  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})