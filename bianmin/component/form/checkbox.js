Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 接受的数组必须是Arr这种结构
    Arr: {
      type: Array,
      value: []
    }
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
      let Arr = this.data.Arr // 获得数组
      Arr[index].state = !Arr[index].state //点击就赋相反的值
      this.setData({
        Arr: Arr
      })
      // 取返回的数组
      let returnArr = this.data.returnArr
      if (Arr[index].state) {
        // 如果接受的数组的某一项已选中则push进返回的数组
        returnArr.push(Arr[index].name)
      } else {
        // 如果返回的数组的某一项被取消选中则删除
        let name = returnArr.indexOf(Arr[index].name); // 返回的数组中是否包含操作的元素
        if (name > -1) {
          // 包含就删除
          returnArr.splice(name, 1);
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