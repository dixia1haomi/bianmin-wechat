
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

import { Api } from '../../utils/Api.js'
const api = new Api()

// 生命周期函数,API获得类目数组
// 接受kaiguan，控制组件内容显示隐藏
// 抛出xuanzeleimu，{
//   name:'xxx',
//   value2:{ [moban:'xxx'], [moban:'xxx']}
// }
// < xuanzeleimu bind: xuanzeleimu = "com_xuanzeleimu_" kaiguan= "{{com_xuanzeleimu_kaiguan}}" > </xuanzeleimu>

Component({
  //  目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
  properties: {

    // 显示开关，控制组件内容显示隐藏
    kaiguan: {
      type: Boolean,
      value: true
    },

  },


  data: {
    // 类目数据
    arr: [],
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
      // 关闭组件
      this.setData({ kaiguan: false })
    },
  },

  // 生命周期函数
  attached: function () {
    // API获得类目数组
    api.leiMu({}, back => { this.setData({ arr: back.data }) })
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
})
