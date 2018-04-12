
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
        value: "招聘,\n哈哈。"
      }
    ],
    index: 0
  },
  {
    leimu: '求职',
    item: [
      {
        name: '求职',
        value: "期望职位：XXXX\n期望薪资：XXXX\n性别：XXXX\n年龄：XX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX\n详细描述：XXXX"
      }
    ],
    index: 1
  },
  {
    leimu: '生活',
    item: [
      {
        name: '生活1',
        value: "生活1,\n哈哈。"
      },
      {
        name: '生活2',
        value: "生活2,\n哈哈。"
      },
      {
        name: '生活3',
        value: "生活3,\n哈哈。"
      },
      {
        name: '生活4',
        value: "生活4,\n哈哈。"
      },
      {
        name: '生活5',
        value: "生活5,\n哈哈。"
      },
      {
        name: '生活6',
        value: "生活6,\n哈哈。"
      }
    ],
    index: 2
  },
  {
    leimu: '出租',
    item: [
      {
        name: '租车',
        value: "租车,\n哈哈。"
      },
      {
        name: '租房',
        value: "租房,\n哈哈。"
      }
    ],
    index: 3
  },
  {
    leimu: '出售',
    item: [
      {
        name: '售车',
        value: "售车,\n哈哈。"
      },
      {
        name: '售房',
        value: "售房,\n哈哈。"
      }
    ],
    index: 4
  },
  {
    leimu: '转让',
    item: [{
      name: '店铺',
      value: "店铺,\n哈哈。"
    }, {
      name: '生意',
      value: "生意,\n哈哈。"
    }],
    index: 5
  }
]


export { Config }