import {
  Utils
} from '../../utils/utils.js'

const utils = new Utils()

Page({

  data: {
    // title
    title: '',
    // tips
    tips: '',
    // 
    value: '',
    cursor: 0,
    // 模板
    moban: [{
      leibie: '招聘',
      tips: '详细描述教育经历,工作经历,特长,自我评价,获得更多机会',
      content: ['详细描述教育经历,工作经历,特长,自我评价,获得更多机会aaa', '详细描述教育经历,工作经历,特长,自我评价,获得更多机会bbb'],
    }, {
      leibie: '求职',
      tips: '详细描述教育经历,工作经历,特长,自我评价,获得更多机会',
      content: ['求职aaa求职aaa求职aaa求职aaa', '求职bbb求职bbb求职bbb求职bbb'],
    }, {
      leibie: '房产出售',
      tips: '房产出售',
      content: ['房产出售aaa房产出售aaa房产出售aaa', '房产出售bbb房产出售bbb房产出售bbb'],
    }, {
      leibie: '房屋出租',
      tips: '房屋出租',
      content: ['房屋出租aaa房屋出租aaa房屋出租aaa', '房屋出租bbb房屋出租bbb房屋出租bbb'],
    }, {
      leibie: '房屋求租',
      tips: '房屋求租',
      content: ['房屋求租aaa房屋求租aaa房屋求租aaa', '房屋求租bbb房屋求租bbb房屋求租bbb'],
    }, {
      leibie: '店铺转让',
      tips: '店铺转让',
      content: ['店铺转让aaa店铺转让aaa店铺转让aaa', '店铺转让bbb店铺转让bbb店铺转让bbb'],
    }, {
      leibie: '商铺出租',
      tips: '商铺出租',
      content: ['商铺出租aaa商铺出租aaa商铺出租aaa商铺出租aaa', '商铺出租bbb商铺出租bbb商铺出租bbb商铺出租bbb'],
    }, {
      leibie: '物品出售',
      tips: '在这里描述一下宝贝的\n转手原因、\n入手渠道、\n尺寸规格和使用感受吧~',
      content: ['物品出售aaa物品出售aaa物品出售aaa物品出售aaa', '物品出售bbb物品出售bbb物品出售bbb物品出售bbb'],
    }, {
      leibie: '人找车',
      tips: '人找车',
      content: ['人找车aaa人找车aaa人找车aaa人找车aaa', '人找车bbb人找车bbb人找车bbb人找车bbb人找车bbb'],
    }, {
      leibie: '车找人',
      tips: '车找人',
      content: ['目的地小范围偏差可以电话沟通调整'],
    }, {
      leibie: '其他',
      tips: '其他',
      content: ['其他aaa其他aaa其他aaa其他aaa其他aaa其他aaa', '其他bbbb其他bbbb其他bbbb其他bbbb其他bbbb'],
    }],
    // mobanContent
    mobanContent: [],
    mobanContent_index: 0,
  },

  onLoad: function(op) {
    this._load(op)
  },

  _load(op) {
    console.log('op', op)
    //上一个页面实例对象
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage)
    // 获取title和模板
    this.setData({
      title: op.title,
      mobanContent: this._mobanContent(op.leibie),
      tips: this._mobanTips(op.leibie),
      // 获取上一页保存的mobanContent_index
      mobanContent_index: prePage.data.textareaPage_mobanContent_index
    }, () => {
      // 获取上一页的data数据
      let prePage_neirong = prePage.data.params.neirong
      this.setData({
        value: prePage_neirong,
        cursor: prePage_neirong.length
      })
    })

  },

  // 找出onLoad--op携带的类别对应的模板内容
  _mobanContent(leibie) {
    let moban = this.data.moban
    for (let i in moban) {
      if (leibie == moban[i].leibie) {
        return moban[i].content
      }
    }
  },
  // 找出onLoad--op携带的类别对应的Tips
  _mobanTips(leibie) {
    let moban = this.data.moban
    for (let i in moban) {
      if (leibie == moban[i].leibie) {
        return moban[i].tips
      }
    }
  },


  // bindinput事件
  bindinput_(e) {
    console.log('bindinput_', e)
    this.setData({
      value: e.detail.value,
      cursor: e.detail.cursor
    })
  },

  // 切换
  qiehuan_() {
    console.log('qiehuan_')
    let index = this.data.mobanContent_index
    let len = this.data.mobanContent.length
    // 改变Value2的键、清空要提交的textarea数据、键 = 长度 - 1
    index = index >= len - 1 ? 0 : ++index
    this.setData({
      mobanContent_index: index,
      value: this.data.mobanContent[index],
      cursor: this.data.mobanContent[index].length
    })
  },


  // 完成
  ok_() {
    //上一个页面实例对象
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    console.log('上一个页面实例对象', prePage)
    // 设置上一页的data数据
    prePage.setData({
      'params.neirong': utils.checkHuanHangFu2_1(this.data.value), // 处理换行符
      textareaPage_mobanContent_index: this.data.mobanContent_index // 在上一页设置一个mobanContent_index标识，再次进来取出来
    }, () => {
      wx.navigateBack({
        delta: 1
      })
    })
  },
})