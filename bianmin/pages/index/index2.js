
Page({

  data: {
    // 分类列表
    list: [
      {
        id: 0,
        name: '房产交易',
        value: [
          {
            name: '房屋出售'
          },
          {
            name: '房屋求购'
          }
        ]
      },
      {
        id: 1,
        name: '招聘求职',
        value: [
          {
            name: '招聘'
          },
          {
            name: '求职'
          }
        ]
      }
    ],

    id: 0,
  },

  onLoad: function (op) {

  },

  xuanze1_(e) {
    this.setData({ id: e.currentTarget.id })
  },

  xuanze2_(e) {
    console.log('xuanze2', e.currentTarget.dataset.name)
  },

})