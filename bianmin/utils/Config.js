
class Config {
  constructor() { }
}

// 服务器接口请求地址
// Config.url = 'http://bianmin.com/api/'
Config.url = 'https://bianmin.qujingdaishuyanxuan.org/api/'

// 类目
// Config.leimu = ['招聘', '求职', '生活', '出租', '出售', '转让']

// 类目模板 item长度最大为6
Config.moban = [
  {
    leimu: '招聘',
    item: [
      {
        name: '招聘',
        value: "----招聘----职位,\n工作内容：----\n待遇：2000-3000\n年龄：18-40岁\n性别：男女不限\n地址：----\n详细描述：----"
      }
    ]
  },
  {
    leimu: '求职',
    item: [
      {
        name: '求职',
        value: "期望职位：----\n期望薪资：----\n性别：男?女?\n年龄：?\n详细描述：文化程度？ 吃苦耐劳？ 特殊技能？"
      }
    ]
  },
  {
    leimu: '出租',
    item: [
      {
        name: '租车',
        value: "抱歉，待后续添加。"
      },
      {
        name: '租房',
        value: "100平米2室1厅1卫？房屋干净、清爽、简单装修\n楼层：5/7层\n付款：季付？半年副？年付？\n地址：沾益-XX小区\n描述：采光好，带部分家具，交通便利"
      }
    ]
  },
  {
    leimu: '出售',
    item: [
      {
        name: '售车',
        value: "抱歉，待后续添加。"
      },
      {
        name: '售房',
        value: "抱歉，待后续添加。"
      }
    ]
  },
  {
    leimu: '转让',
    item: [{
      name: '店铺',
      value: "抱歉，待后续添加。"
    }, {
      name: '生意',
      value: "抱歉，待后续添加。"
    }]
  },
  {
    leimu: '生活',
    item: [
      {
        name: '家政',
        value: "抱歉，待后续添加。"
      },
      {
        name: '商务',
        value: "抱歉，待后续添加。"
      },
      {
        name: '教育',
        value: "抱歉，待后续添加。"
      },
      {
        name: '休闲',
        value: "抱歉，待后续添加。"
      }
    ]
  }
]


export { Config }