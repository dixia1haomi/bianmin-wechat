class Config {
  constructor() {}
}

// 服务器接口请求地址
// Config.url = 'http://bianmin.com/api/'
Config.url = 'https://bianmin.qujingdaishuyanxuan.org/api/'


Config.leibie = [{
    id: 0,
    name: '招聘求职',
    value: [{
        name: '招聘',
      },
      {
        name: '求职',
      }
    ]
  },

  {
    id: 1,
    name: '房产交易',
    value: [{
        name: '房产出售',
      },
      {
        name: '房屋出租',
      },
      {
        name: '房屋求租',
      },
      {
        name: '店铺转让',
      },
      {
        name: '商铺出租',
      }
    ]
  },

  {
    id: 2,
    name: '车辆交易',
    value: [{
      name: '车辆出售'
    }]
  },

  {
    id: 3,
    name: '物品交易',
    value: [{
      name: '物品出售'
    }]
  },
  {
    id: 4,
    name: '顺风车',
    value: [{
        name: '人找车'
      },
      {
        name: '车找人'
      }
    ]
  },
  {
    id: 5,
    name: '其他',
    value: [{
      name: '其他'
    }]
  }
]



// 招聘 - 福利
Config.zhaopinfuliArr = [{
  name: '包吃',
  state: false
}, {
  name: '包住',
  state: false
}, {
  name: '保险',
  state: false
}, {
  name: '双休',
  state: false
}, {
  name: '加班补助',
  state: false
}]



// 求职 - 个人亮点
Config.qiuzhi_liangdianArr = [{
  name: '沟通力强',
  state: false
}, {
  name: '执行力强',
  state: false
}, {
  name: '学习力强',
  state: false
}, {
  name: '有亲和力',
  state: false
}, {
  name: '诚信正直',
  state: false
}, {
  name: '责任心强',
  state: false
}, {
  name: '雷厉风行',
  state: false
}, {
  name: '沉稳内敛',
  state: false
}, {
  name: '阳光开朗',
  state: false
}, {
  name: '人脉广泛',
  state: false
}, {
  name: '善于创新',
  state: false
}, {
  name: '创业经历',
  state: false
}]

// 房屋出租 - 楼层
Config.loucengArray = [
  ['第-1层', '第1层', '第2层', '第3层', '第4层', '第5层', '第6层', '第7层', '第8层', '第9层', '第10层', '第11层', '第12层', '第13层', '第14层', '第15层', '第16层', '第17层', '第18层', '第19层', '第20层', '第21层', '第22层', '第23层', '第24层', '第25层', '第26层', '第27层', '第28层', '第29层', '第30层', '第31层', '第32层', '第33层', '第34层', '第35层', '第36层', '第37层', '第38层', '第39层', '第40层', '第41层', '第42层', '第43层', '第44层', '第45层', '第46层', '第47层', '第48层', '第49层', '第50层'],
  ['共1层', '共2层', '共3层', '共4层', '共5层', '共6层', '共7层', '共8层', '共9层', '共10层', '共11层', '共12层', '共13层', '共14层', '共15层', '共16层', '共17层', '共18层', '共19层', '共20层', '共21层', '共22层', '共23层', '共24层', '共25层', '共26层', '共27层', '共28层', '共29层', '共30层', '共31层', '共32层', '共33层', '共34层', '共35层', '共36层', '共37层', '共38层', '共39层', '共40层', '共41层', '共42层', '共43层', '共44层', '共45层', '共46层', '共47层', '共48层', '共49层', '共50层']
]

// 房屋出租 - 配置
Config.fangchan_chuzu_peizhiArr = [{
  name: '床',
  state: false
}, {
  name: '宽带',
  state: false
}, {
  name: '电视',
  state: false
}, {
  name: '冰箱',
  state: false
}, {
  name: '空调',
  state: false
}, {
  name: '热水器',
  state: false
}, {
  name: '洗衣机',
  state: false
}, {
  name: '沙发',
  state: false
}, {
  name: '衣柜',
  state: false
}, {
  name: '可做饭',
  state: false
}, {
  name: '独立卫生间',
  state: false
}, {
  name: '阳台',
  state: false
}, {
  name: '暖气',
  state: false
}]

// 商铺出租 - 历史经营行业
Config.shangpu_chuzu_lishihangyeArr = [{
  name: '餐饮美食',
  state: false
}, {
  name: '美容美发',
  state: false
}, {
  name: '服装鞋包',
  state: false
}, {
  name: '休闲娱乐',
  state: false
}, {
  name: '生活服务',
  state: false
}, {
  name: '汽修美容',
  state: false
}, {
  name: '酒店宾馆',
  state: false
}, {
  name: '百货超市',
  state: false
}, {
  name: '家居建材',
  state: false
}, {
  name: '电器通讯',
  state: false
}, {
  name: '教育培训',
  state: false
}, {
  name: '其他',
  state: false
}]

// 车找人 - 最晚出发时间
Config.chezhaoren_zuiwanchufashijianArray = [
  ['00 :', '01 :', '02 :', '03 :', '04 :', '05 :', '06 :', '07 :', '08 :', '09 :', '10 :', '11 :', '12 :', '13 :', '14 :', '15 :', '16 :', '17 :', '18 :', '19 :', '20 :', '21 :', '22 :', '23 :'],
  ['00', '10', '20', '30', '40', '50']
]


export {
  Config
}