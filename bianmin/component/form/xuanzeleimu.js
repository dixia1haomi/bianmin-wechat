
// 接受的arr结构
// arr: [
//   {
//     id: 0,
//     name: '房产交易',
//     value: [
//       {
//         name: '房屋出售',
//         value2: [{
//           moban: '房屋出售模板1'
//         }]
//       },
//       {
//         name: '房屋求购',
//         value2: [{
//           moban: '房屋求购模板1'
//         }]
//       }
//     ]
//   },
//   {
//     id: 1,
//     name: '招聘求职',
//     value: [
//       {
//         name: '招聘',
//         value2: [{
//           moban: '招聘模板1'
//         }, {
//           moban: '招聘模板2'
//         }]
//       },
//       {
//         name: '求职',
//         value2: [{
//           moban: '求职模板1'
//         }]
//       }
//     ]
//   }
// ],

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 类目数组
    arr: {
      type: Array,
      value: []
    },

  },


  data: {
    // arr数据1级ID
    id: 0,
  },

  methods: {
    // 一级选择
    xuanze1_(e) {
      this.setData({ id: e.currentTarget.id })
    },

    // 二级选择(选择后抛出类目下的类目名称和模板)
    xuanze2_(e) {
      console.log('xuanze2', e.currentTarget.dataset.value)
      // 抛出
      this.triggerEvent('xuanzeleimu', e.currentTarget.dataset.value)
    },
  },


  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
