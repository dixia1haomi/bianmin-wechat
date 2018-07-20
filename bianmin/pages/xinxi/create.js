import {
  Api
} from '../../utils/Api.js'
import {
  Base
} from '../../utils/Base.js'
import {
  Cos
} from '../../utils/Cos.js'
import {
  Config
} from '../../utils/Config.js'
import {
  Utils
} from '../../utils/utils.js'

import WxValidate from '../../validate/WxValidate.js'

const cos = new Cos()
const api = new Api()
const utils = new Utils()
const app = getApp()

// * 物品出售 textarea待修改

Page({

  data: {
    // value2index: 0,
    // textarea
    // com_textarea: {
    //   value: '',
    //   cursor: 0
    // },
    // 选择图片
    // com_xuanzetupian: [],
    // 地址
    // com_dizhi: {

    // },

    params: {
      // 内容
      neirong: '',
      kuozhan: {}
    },
    // 类目
    com_xuanzeleimu_data: {},
    // 选择器
    leibie_state: true,
    // 类别数组
    leibieArr: Config.leibie,
    // -- textareatex页的模板标识textareaPage_mobanContent_index
    textareaPage_mobanContent_index: 0,

    // -------------


    // --------- 招聘 ---------
    // 薪资
    zhaopin_xinziArr: ['1000-2000元', '2000-3000元', '3000-5000元', '5000-8000元', '面议'],
    zhaopin_xinzi_index: 1,
    // 福利
    zhaopin_fuli_xuanzeqi_state: false,
    zhaopinfuliArr: Config.zhaopinfuliArr,
    // 学历要求
    zhaopin_xueliArr: ['不限', '初中', '中专', '高中', '大专', '本科'],
    zhaopin_xueli_index: 0,
    // 经验要求：
    zhaopin_jingyanArr: ['不限', '1年以下', '1-2年', '3-5年'],
    zhaopin_jingyan_index: 0,


    // --------- 求职 ---------

    // 性别
    qiuzhi_xingbieArr: ['男', '女'],
    qiuzhi_xingbie_index: 0,
    // 学历
    qiuzhi_xueliArr: ['高中以下', '高中', '中专', '技校', '本科', '硕士', '博士'],
    qiuzhi_xueli_index: 0,
    // 工作时间
    qiuzhi_shijianArr: ['无经验', '应届生', '1年以下', '1-2年', '2-3年', '3-5年', '5-8年', '8-10年', '10年以上'],
    qiuzhi_shijian_index: 3,
    // 期望薪资
    qiuzhi_xinziArr: ['面议', '1000-2000元', '2000-3000元', '3000-5000元', '5000元以上'],
    qiuzhi_xinzi_index: 2,
    // 求职区域
    qiuzhi_quyuArr: ['全曲靖', '麒麟', '沾益', '马龙', '富源', '宣威', '会泽', '陆良', '罗平', '师宗'],
    qiuzhi_quyu_index: 0,
    // 亮点标签
    qiuzhi_liangdian_xuanzeqi_state: false,
    qiuzhi_liangdianArr: Config.qiuzhi_liangdianArr,

    // --------- 房产出售 ---------
    // 装修
    fangchan_chushou_zhuangxiuArr: ['毛坯', '简装', '精装', '豪华'],
    fangchan_chushou_zhuangxiu_index: 0,

    // --------- 房屋出租 ---------
    fangchan_chuzu_zhuangxiu_index: 0, // 和房产出售装修共用Arr
    // 楼层
    loucengArray: Config.loucengArray,
    loucengIndex: [1, 4],
    // 房型
    multiArray: [
      ['1室', '2室', '3室', '4室', '5室', '6室'],
      ['0厅', '1厅', '2厅', '3厅', '4厅', '5厅', '6厅'],
      ['0卫', '1卫', '2卫', '3卫', '4卫', '5卫', '6卫']
    ],
    multiIndex: [0, 1, 1],
    // 租金缴付方式
    fangchan_chuzu_zujinjiaofuArr: ['面议', '押一付一', '押一付三', '押一付半年', '押一付一年'],
    fangchan_chuzu_zujinjiaofu_index: 2,
    // 配置
    fangchan_chuzu_peizhi_xuanzeqi_state: false,
    fangchan_chuzu_peizhiArr: Config.fangchan_chuzu_peizhiArr,

    // --------- 房屋求租 ---------

    // 要求房型 - Arr共用出租的房型
    fangchan_qiuzu_fangxingIndex: [0, 0, 0],
    // 期望租金
    fangchan_qiuzu_qiwangzujinArr: ['300以下', '500以下', '700以下', '900以下', '1200以下', '1500以下', '2000以下'],
    fangchan_qiuzu_qiwangzujin_index: 2,
    // 我的性别 - Arr共用求职的性别
    fangchan_qiuzu_xingbie_index: 0,
    // 配置要求 - Arr共用出租的配置
    fangchan_qiuzu_peizhi_xuanzeqi_state: false,


    // --------- 店铺转让 ---------
    // 转让费用
    dianpu_zhuanrang_feiyongArr: ['无', '面议'],
    dianpu_zhuanrang_feiyong_index: 0,


    // --------- 商铺出租 ---------
    // 起租期
    // shangpu_chuzu_zuqiArr: ['1年', '2年', '3年'],
    // shangpu_chuzu_zuqi_index: 0,
    // 支付方式
    // shangpu_chuzu_zhifufangshiArr: ['面议', '半年付', '年付'],
    // shangpu_chuzu_zhifufangshi_index: 0,
    // 历史经营行业
    shangpu_chuzu_lishihangye_xuanzeqi_state: false,
    shangpu_chuzu_lishihangyeArr: Config.shangpu_chuzu_lishihangyeArr,

    // --------- 车辆出售 ---------

    // 当前时间
    end_date: utils.get_Y_M_D(),
    // 下个月
    xiageyue_date: utils.get_Y_M_1_D(),


    // --------- 物品出售 ---------
    // 交易方式
    wupin_chushou_fangshi_xuanzeqi_state: false,
    wupin_chushou_fangshiArr: [{
      name: '自提',
      state: false
    }, {
      name: '同城面交',
      state: false
    }],
    // 成色
    wupin_chushou_chengseArr: ['全新', '9成新', '8成新', '7成新', '6成新', '5成新'],
    wupin_chushou_chengse_index: 0,


    // --------- 车找人 ---------
    // 车型
    chezhaoren_chexingArr: ['微型', '轿车', 'SUV', 'MVP'],
    chezhaoren_chexing_index: 0,
    // 剩余座位
    chezhaoren_zuoweiArr: ['1座', '2座', '3座', '4座', '5座'],
    chezhaoren_zuowei_index: 3,
    // 出发日期
    chezhaoren_riqiArr: utils.get_chezhaoren_chufariqi(),
    chezhaoren_riqi_index: 1,


    // --------- 人找车 ---------
    // 出发日期 - Arr公用车找人的日期
    renzhaoche_riqi_index: 1,
    // 同行人数
    renzhaoche_renshuArr: ['1人', '2人', '3人', '4人', '5人'],
    renzhaoche_renshu_index: 0,

    // 提交loading
    btn_tijiao_loading: false,
  },



  // ------------------------------------------ onLoad ------------------------------------------
  onLoad: function(op) {
    // API获得类目数组
    // api.leiMu({}, back => {
    // console.log('API获得类目数组', this.data.leibie)
    //   this.setData({
    //     leimuArr: back.data
    //   })
    // })
    // let params = this.data.params
    // console.log('onLoad', params)
  },

  // ------------- 固定事件 -------------

  // 类目选择器事件
  com_xuanzeqi_(e) {
    console.log('xuanzeqi_', e)
    // 打开类目选择
    this.setData({
      leibie_state: true
    })
  },

  // 选择类目
  com_xuanzeleimu_(e) {
    console.log('com_xuanzeleimu_', e.detail)
    this.setData({
      // 关闭类目选择
      leibie_state: false,
      // com_xuanzeleimu_data: e.detail,
      // value2index: 0,
      // 初始化params
      // 'params.leibie': e.detail.name,
      // 'params.neirong': '',
      // 'params.kuozhan': {},
      params: {
        leibie: e.detail.name,
        neirong: '',
        kuozhan: {}
      }
    })
  },
  // 选择图片
  com_xuanzetupian_(e) {
    this.setData({
      // com_xuanzetupian: e.detail,
      'params.img': e.detail
    })
  },
  // 电话
  com_dianhua_(e) {
    this.setData({
      com_dianhua: e.detail,
      'params.phone': e.detail
    })
  },


  // --------------------- 分类 -----------------------

  // ---------------------------------------- 招聘 ----------------------------------------

  // 职位
  zhaopin_zhiwei_(e) {
    console.log('招聘-职位', e.detail.value)
    this.setData({
      'params.kuozhan.zhaopin_zhiwei': e.detail.value
    })
  },

  // 公司
  zhaopin_gongsi_(e) {
    console.log('招聘-公司', e.detail.value)
    this.setData({
      'params.kuozhan.zhaopin_gongsi': e.detail.value
    })
  },

  // 薪资
  zhaopin_xinzi_(e) {
    console.log('招聘-薪资', e.detail.value)
    this.setData({
      zhaopin_xinzi_index: e.detail.value
    })
  },

  // 学历
  zhaopin_xueli_(e) {
    console.log('招聘-学历', e.detail.value)
    this.setData({
      zhaopin_xueli_index: e.detail.value
    })
  },

  // 经验
  zhaopin_jingyan_(e) {
    console.log('招聘-经验', e.detail.value)
    this.setData({
      zhaopin_jingyan_index: e.detail.value
    })
  },

  // 工作地址
  zhaopin_dizhi_() {
    console.log('招聘-工作地址')
    new Base().authorize_userLocation(back => {
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
          }
          this.setData({
            'params.kuozhan.zhaopin_gongzuodizhi': e.address,
            'params.kuozhan.zhaopin_longitude': e.longitude,
            'params.kuozhan.zhaopin_latitude': e.latitude
          })
        }
      })
    })
  },

  // 福利
  zhaopin_fuli_xuanzeqi_(e) {
    console.log('zhaopin_fuli_xuanzeqi_', e.detail)
    this.setData({
      zhaopin_fuli_xuanzeqi_state: !this.data.zhaopin_fuli_xuanzeqi_state
    })
  },

  zhaopin_fuli_(e) {
    console.log('checkbox_', e.detail, 'Json.str', JSON.stringify(e.detail))
    this.setData({
      'params.kuozhan.zhaopin_fuli': e.detail,
      // 数组转，分隔的字符串，用于显示在选择器
      zhaopin_fuli_xuanzeqi_content: e.detail.join(',')
    })
  },

  // 职位描述
  zhaopin_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '招聘' + '&title=' + '职位描述'
    })
  },


  // ---------------------------------------- 求职 ----------------------------------------

  // 性别
  qiuzhi_xingbie_(e) {
    console.log('求职-性别', e.detail.value)
    this.setData({
      qiuzhi_xingbie_index: e.detail.value
    })
  },

  // 年龄
  qiuzhi_nianling_(e) {
    console.log('求职-年龄', e.detail.value)
    this.setData({
      'params.kuozhan.qiuzhi_nianling': e.detail.value
    })
  },

  // 学历
  qiuzhi_xueli_(e) {
    console.log('求职-学历', e.detail.value)
    this.setData({
      qiuzhi_xueli_index: e.detail.value
    })
  },

  // 工作时间
  qiuzhi_shijian_(e) {
    console.log('求职-工作时间', e.detail.value)
    this.setData({
      qiuzhi_shijian_index: e.detail.value
    })
  },

  // 意向职位
  qiuzhi_yixiangzhiwei_(e) {
    console.log('求职-意向职位', e.detail.value)
    this.setData({
      'params.kuozhan.qiuzhi_yixiangzhiwei': e.detail.value
    })
  },

  // 期望薪资
  qiuzhi_xinzi_(e) {
    console.log('求职-期望薪资', e.detail.value)
    this.setData({
      qiuzhi_xinzi_index: e.detail.value
    })
  },

  // 求职区域
  qiuzhi_quyu_(e) {
    console.log('求职-求职区域', e.detail.value)
    this.setData({
      qiuzhi_quyu_index: e.detail.value
    })
  },

  // 亮点标签
  qiuzhi_liangdian_xuanzeqi_(e) {
    console.log('qiuzhi_liangdian_xuanzeqi_', e.detail)
    this.setData({
      qiuzhi_liangdian_xuanzeqi_state: !this.data.qiuzhi_liangdian_xuanzeqi_state
    })
  },

  qiuzhi_liangdian_(e) {
    console.log('checkbox_', e.detail, 'Json.str', JSON.stringify(e.detail))
    this.setData({
      'params.kuozhan.qiuzhi_liangdian': e.detail,
      // 数组转，分隔的字符串，用于显示在选择器
      qiuzhi_liangdian_xuanzeqi_content: e.detail.join(',')
    })
  },

  // 职位描述
  qiuzhi_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '求职' + '&title=' + '个人描述'
    })
  },

  // ---------------------------------------- 房产出售 ----------------------------------------

  // 小区 - input
  fangchan_chushou_xiaoqu_(e) {
    console.log('房产出售-小区', e.detail.value)
    this.setData({
      'params.kuozhan.fangchan_chushou_xiaoqu': e.detail.value
    })
  },

  // 面积 - input
  fangchan_chushou_mianji_(e) {
    console.log('房产出售-面积', e.detail.value)
    // 判断是否有总价
    let zongjia = this.data.params.kuozhan.fangchan_chushou_zongjia * 10000
    let mianji = e.detail.value
    if (zongjia) {
      // 计算单价
      let danjia = parseInt(zongjia / mianji)
      console.log('面积中计算单价', danjia)
      this.setData({
        'params.kuozhan.fangchan_chushou_danjia': danjia
      })
    }
    this.setData({
      'params.kuozhan.fangchan_chushou_mianji': e.detail.value
    })
  },

  // 总价 - input
  fangchan_chushou_zongjia_(e) {
    console.log('房产出售-总价', e.detail.value)
    // 判断是否有面积
    let mianji = this.data.params.kuozhan.fangchan_chushou_mianji
    let zongjia = e.detail.value * 10000
    if (mianji) {
      // 计算单价
      let danjia = parseInt(zongjia / mianji)
      console.log('总价中计算单价', danjia)
      this.setData({
        'params.kuozhan.fangchan_chushou_danjia': danjia
      })
    }
    this.setData({
      'params.kuozhan.fangchan_chushou_zongjia': e.detail.value
    })
  },

  // 装修 - picker
  fangchan_chushou_zhuangxiu_(e) {
    console.log('房产出售-装修', e.detail.value)
    this.setData({
      fangchan_chushou_zhuangxiu_index: e.detail.value
    })
  },

  // 房型 - picker2
  fangchan_chushou_fangxing_(e) {
    console.log('房产出售-房型', e.detail.value)
    // let value = e.detail.value
    // let multiArray = this.data.multiArray
    this.setData({
      multiIndex: e.detail.value
      // 'params.kuozhan.fangchan_chushou_fangxing': multiArray[0][value[0]] + multiArray[1][value[1]] + multiArray[2][value[2]]
    })
  },

  // 详细描述
  fangchan_chushou_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '房产出售' + '&title=' + '描述'
    })
  },



  // ---------------------------------------- 房屋出租 ----------------------------------------

  // 小区 - input
  fangchan_chuzu_xiaoqu_(e) {
    console.log('房屋出租-小区', e.detail.value)
    this.setData({
      'params.kuozhan.fangchan_chuzu_xiaoqu': e.detail.value
    })
  },
  // 面积 - input
  fangchan_chuzu_mianji_(e) {
    console.log('房屋出租-面积', e.detail.value)
    this.setData({
      'params.kuozhan.fangchan_chuzu_mianji': e.detail.value
    })
  },

  // 楼层 - picker2
  fangchan_chuzu_louceng_(e) {
    console.log('房屋出租-楼层', e.detail.value)
    // let value = e.detail.value
    // let loucengArray = this.data.loucengArray
    this.setData({
      loucengIndex: e.detail.value
      // 'params.kuozhan.fangchan_chuzu_louceng': loucengArray[0][value[0]] + '/' + loucengArray[1][value[1]]
    })
  },

  // 价格 - input
  fangchan_chuzu_jiage_(e) {
    console.log('房屋出租-价格', e.detail.value)
    this.setData({
      'params.kuozhan.fangchan_chuzu_jiage': e.detail.value
    })
  },

  // 房型 - picker2
  fangchan_chuzu_fangxing_(e) {
    console.log('房屋出租-房型', e.detail.value)
    // let value = e.detail.value
    // let multiArray = this.data.multiArray
    this.setData({
      multiIndex: e.detail.value
      // 'params.kuozhan.fangchan_chuzu_fangxing': multiArray[0][value[0]] + multiArray[1][value[1]] + multiArray[2][value[2]]
    })
  },

  // 装修 - picker
  fangchan_chuzu_zhuangxiu_(e) {
    console.log('房屋出租-装修', e.detail.value)
    this.setData({
      fangchan_chuzu_zhuangxiu_index: e.detail.value
    })
  },

  // 租金缴付 - picker
  fangchan_chuzu_zujinjiaofu_(e) {
    console.log('房屋出租-租金缴付', e.detail.value)
    this.setData({
      fangchan_chuzu_zujinjiaofu_index: e.detail.value
    })
  },

  // 配置选择器
  fangchan_chuzu_peizhi_xuanzeqi_(e) {
    console.log('fangchan_chuzu_peizhi_xuanzeqi_', e.detail)
    this.setData({
      fangchan_chuzu_peizhi_xuanzeqi_state: !this.data.fangchan_chuzu_peizhi_xuanzeqi_state
    })
  },

  fangchan_chuzu_peizhi_(e) {
    this.setData({
      'params.kuozhan.fangchan_chuzu_peizhi': e.detail,
      // 数组转，分隔的字符串，用于显示在选择器
      fangchan_chuzu_peizhi_xuanzeqi_content: e.detail.join(',')
    })
  },

  // 详细描述
  fangchan_chuzu_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '房屋出租' + '&title=' + '房屋描述'
    })
  },

  // ---------------------------------------- 房屋求租 ----------------------------------------
  // 求租区域 - input
  fangchan_qiuzu_quyu_(e) {
    console.log('房屋求租-区域', e.detail.value)
    this.setData({
      'params.kuozhan.fangchan_qiuzu_quyu': e.detail.value
    })
  },

  // 房型要求
  fangchan_qiuzu_fangxing_(e) {
    console.log('房屋求租-房型', e.detail.value)
    this.setData({
      fangchan_qiuzu_fangxingIndex: e.detail.value
    })
  },

  // 期望租金
  fangchan_qiuzu_qiwangzujin_(e) {
    console.log('房屋求租-期望租金', e.detail.value)
    this.setData({
      fangchan_qiuzu_qiwangzujin_index: e.detail.value
    })
  },

  // 配置要求 - 选择器
  fangchan_qiuzu_peizhi_xuanzeqi_(e) {
    console.log('fangchan_qiuzu_peizhi_xuanzeqi_', e.detail)
    this.setData({
      fangchan_qiuzu_peizhi_xuanzeqi_state: !this.data.fangchan_qiuzu_peizhi_xuanzeqi_state
    })
  },

  fangchan_qiuzu_peizhi_(e) {
    this.setData({
      'params.kuozhan.fangchan_qiuzu_peizhi': e.detail,
      // 数组转，分隔的字符串，用于显示在选择器
      fangchan_qiuzu_peizhi_xuanzeqi_content: e.detail.join(',')
    })
  },

  // 我的性别
  fangchan_qiuzu_xingbie_(e) {
    console.log('房屋求租-性别', e.detail.value)
    this.setData({
      fangchan_qiuzu_xingbie_index: e.detail.value
    })
  },

  // 我的年龄
  fangchan_qiuzu_nianling_(e) {
    console.log('房屋求租-年龄', e.detail.value)
    this.setData({
      'params.kuozhan.fangchan_qiuzu_nianling': e.detail.value
    })
  },

  // 描述
  fangchan_qiuzu_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '房屋求租' + '&title=' + '详细描述'
    })
  },


  // ---------------------------------------- 店铺转让 ----------------------------------------

  // 标题
  dianpu_zhuanrang_biaoti_(e) {
    console.log('店铺转让-标题', e.detail.value)
    this.setData({
      'params.kuozhan.dianpu_zhuanrang_biaoti': e.detail.value
    })
  },

  // 位置
  dianpu_zhuanrang_weizhi_() {
    console.log('店铺转让-位置')
    new Base().authorize_userLocation(back => {
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
          }
          this.setData({
            'params.kuozhan.dianpu_zhuanrang_weizhi': e.address,
            'params.kuozhan.dianpu_zhuanrang_longitude': e.longitude,
            'params.kuozhan.dianpu_zhuanrang_latitude': e.latitude
          })
        }
      })
    })
  },

  // 面积
  dianpu_zhuanrang_mianji_(e) {
    console.log('店铺转让-面积', e.detail.value)
    this.setData({
      'params.kuozhan.dianpu_zhuanrang_mianji': e.detail.value
    })
  },

  // 剩余租期
  dianpu_zhuanrang_zuqi_(e) {
    console.log('店铺转让-剩余租期', e.detail.value)
    this.setData({
      'params.kuozhan.dianpu_zhuanrang_zuqi': e.detail.value
    })
  },

  // 转让费用
  dianpu_zhuanrang_feiyong_(e) {
    console.log('店铺转让-转让费用', e.detail.value)
    this.setData({
      dianpu_zhuanrang_feiyong_index: e.detail.value
    })
  },

  // 描述
  dianpu_zhuanrang_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '店铺转让' + '&title=' + '店铺描述'
    })
  },


  // ---------------------------------------- 商铺出租 ----------------------------------------

  // 标题
  shangpu_chuzu_biaoti_(e) {
    console.log('商铺出租-标题', e.detail.value)
    this.setData({
      'params.kuozhan.shangpu_chuzu_biaoti': e.detail.value
    })
  },

  // 位置
  shangpu_chuzu_weizhi_() {
    console.log('商铺出租-位置')
    new Base().authorize_userLocation(back => {
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
          }
          this.setData({
            'params.kuozhan.shangpu_chuzu_weizhi': e.address,
            'params.kuozhan.shangpu_chuzu_longitude': e.longitude,
            'params.kuozhan.shangpu_chuzu_latitude': e.latitude
          })
        }
      })
    })
  },

  // 面积
  shangpu_chuzu_mianji_(e) {
    console.log('商铺出租-面积', e.detail.value)
    this.setData({
      'params.kuozhan.shangpu_chuzu_mianji': e.detail.value
    })
  },

  // 期望租金
  // shangpu_chuzu_zujin_(e) {
  //   console.log('商铺出租-期望租金', e.detail.value)
  //   this.setData({
  //     'params.kuozhan.shangpu_chuzu_zujin': e.detail.value
  //   })
  // },

  // 起租期
  // shangpu_chuzu_zuqi_(e) {
  //   console.log('商铺出租-起租期', e.detail.value)
  //   this.setData({
  //     shangpu_chuzu_zuqi_index: e.detail.value
  //   })
  // },

  // 支付方式
  // shangpu_chuzu_zhifufangshi_(e) {
  //   console.log('商铺出租-支付方式', e.detail.value)
  //   this.setData({
  //     shangpu_chuzu_zhifufangshi_index: e.detail.value
  //   })
  // },

  // 历史经营行业 - 选择器
  shangpu_chuzu_lishihangye_xuanzeqi_(e) {
    console.log('shangpu_chuzu_lishihangye_xuanzeqi_', e.detail)
    this.setData({
      shangpu_chuzu_lishihangye_xuanzeqi_state: !this.data.shangpu_chuzu_lishihangye_xuanzeqi_state
    })
  },

  shangpu_chuzu_lishihangye_(e) {
    this.setData({
      'params.kuozhan.shangpu_chuzu_lishihangye': e.detail,
      // 数组转，分隔的字符串，用于显示在选择器
      shangpu_chuzu_lishihangye_xuanzeqi_content: e.detail.join(',')
    })
  },

  // 描述
  shangpu_chuzu_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '商铺出租' + '&title=' + '商铺描述'
    })
  },


  // ---------------------------------------- 车辆出售 ----------------------------------------
  // <!--品牌、车系、车型 - input、上牌时间 - picker-date、里程 - input、价格 - input-- >

  // 车型 - input
  cheliang_chushou_chexing_(e) {
    console.log('车辆出售-车型', e.detail.value)
    this.setData({
      'params.kuozhan.cheliang_chushou_chexing': e.detail.value
    })
  },

  // 里程 - input
  cheliang_chushou_licheng_(e) {
    console.log('车辆出售-里程', e.detail.value)
    this.setData({
      'params.kuozhan.cheliang_chushou_licheng': e.detail.value
    })
  },

  // 价格 - input
  cheliang_chushou_jiage_(e) {
    console.log('车辆出售-价格', e.detail.value)
    this.setData({
      'params.kuozhan.cheliang_chushou_jiage': e.detail.value
    })
  },

  // 上牌时间
  cheliang_chushou_shangpai_(e) {
    console.log('车辆出售-上牌时间', e.detail.value)
    this.setData({
      'params.kuozhan.cheliang_chushou_shangpai': e.detail.value
    })
  },

  // 看车地址
  cheliang_chushou_dizhi_() {
    console.log('车辆出售-看车地址')
    new Base().authorize_userLocation(back => {
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
          }
          this.setData({
            'params.kuozhan.cheliang_chushou_dizhi': e.address,
            'params.kuozhan.cheliang_chushou_longitude': e.longitude,
            'params.kuozhan.cheliang_chushou_latitude': e.latitude
          })
        }
      })
    })
  },

  // 描述
  cheliang_chushou_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '车辆出售' + '&title=' + '补充描述'
    })
  },

  // ---------------------------------------- 物品出售 ----------------------------------------

  // 标题 
  wupin_chushou_biaoti_(e) {
    console.log('物品出售-标题', e.detail.value)
    this.setData({
      'params.kuozhan.wupin_chushou_biaoti': e.detail.value
    })
  },

  // 价格
  wupin_chushou_jiage_(e) {
    console.log('物品出售-价格', e.detail.value)
    this.setData({
      'params.kuozhan.wupin_chushou_jiage': e.detail.value
    })
  },

  // 入手价
  wupin_chushou_yuanjia_(e) {
    console.log('物品出售-入手价', e.detail.value)
    this.setData({
      'params.kuozhan.wupin_chushou_yuanjia': e.detail.value
    })
  },

  // 成色
  wupin_chushou_chengse_(e) {
    console.log('物品出售-成色', e.detail.value)
    this.setData({
      wupin_chushou_chengse_index: e.detail.value
    })
  },

  // 交易方式
  wupin_chushou_fangshi_xuanzeqi_(e) {
    console.log('wupin_chushou_fangshi_xuanzeqi_', e.detail)
    this.setData({
      wupin_chushou_fangshi_xuanzeqi_state: !this.data.wupin_chushou_fangshi_xuanzeqi_state
    })
  },

  wupin_chushou_fangshi_(e) {
    console.log('wupin_chushou_fangshi_', e.detail)
    this.setData({
      'params.kuozhan.wupin_chushou_fangshi': e.detail,
      // 数组转，分隔的字符串，用于显示在选择器
      wupin_chushou_fangshi_xuanzeqi_content: e.detail.join(',')
    })
  },

  // 位置
  wupin_chushou_weizhi_(e) {
    console.log('物品出售-位置', e.detail)
    new Base().authorize_userLocation(back => {
      wx.chooseLocation({
        success: (e) => {
          console.log('success', e)
          // 去除“云南省曲靖市”
          if ((e.address.indexOf("云南省曲靖市")) != -1) {
            e.address = e.address.substring((e.address.indexOf("市") + 1), e.address.length)
          }
          this.setData({
            'params.kuozhan.wupin_chushou_weizhi': e.address,
            'params.kuozhan.wupin_chushou_longitude': e.longitude,
            'params.kuozhan.wupin_chushou_latitude': e.latitude
          })
        }
      })
    })
  },

  // 描述
  cheliang_chushou_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '物品出售' + '&title=' + '物品描述'
    })
  },

  // ---------------------------------------- 人找车----------------------------------------

  // 出发地
  renzhaoche_chufadi_(e) {
    console.log('人找车-出发地', e.detail.value)
    this.setData({
      'params.kuozhan.renzhaoche_chufadi': e.detail.value
    })
  },

  // 目的地
  renzhaoche_mudidi_(e) {
    console.log('人找车-目的地', e.detail.value)
    this.setData({
      'params.kuozhan.renzhaoche_mudidi': e.detail.value
    })
  },

  // 出发日期 - picker
  renzhaoche_riqi_(e) {
    console.log('车找人-出发日期', e.detail.value)
    this.setData({
      renzhaoche_riqi_index: e.detail.value
    })
  },

  // 最早出发时间 - picker
  renzhaoche_zuizaoshijian_(e) {
    console.log('人找车-最早出发时间', e.detail.value)
    this.setData({
      'params.kuozhan.renzhaoche_zuizaoshijian': e.detail.value
    })
  },

  // 最晚出发时间 - picker
  renzhaoche_zuiwanshijian_(e) {
    console.log('人找车-最晚出发时间', e.detail.value)
    this.setData({
      'params.kuozhan.renzhaoche_zuiwanshijian': e.detail.value
    })
  },


  // 同行人数 - picker
  renzhaoche_renshu_(e) {
    console.log('人找车-同行人数', e.detail.value)
    this.setData({
      renzhaoche_renshu_index: e.detail.value
    })
  },

  // 描述
  renzhaoche_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '人找车' + '&title=' + '描述'
    })
  },


  // ---------------------------------------- 车找人----------------------------------------
  //   <!--出发地 - input、目的地 - input、时间 - time、车型 - 单选、空余座位 - input-- >

  // 出发地
  chezhaoren_chufadi_(e) {
    console.log('车找人-出发地', e.detail.value)
    this.setData({
      'params.kuozhan.chezhaoren_chufadi': e.detail.value
    })
  },

  // 目的地
  chezhaoren_mudidi_(e) {
    console.log('车找人-目的地', e.detail.value)
    this.setData({
      'params.kuozhan.chezhaoren_mudidi': e.detail.value
    })
  },

  // 出发日期 - picker
  chezhaoren_riqi_(e) {
    console.log('车找人-出发日期', e.detail.value)
    this.setData({
      chezhaoren_riqi_index: e.detail.value
    })
  },

  // 最早出发时间 - picker
  chezhaoren_zuizaoshijian_(e) {
    console.log('人找车-最早出发时间', e.detail.value)
    this.setData({
      'params.kuozhan.chezhaoren_zuizaoshijian': e.detail.value
    })
  },

  // 最晚出发时间 - picker
  chezhaoren_zuiwanshijian_(e) {
    console.log('人找车-最晚出发时间', e.detail.value)
    this.setData({
      'params.kuozhan.chezhaoren_zuiwanshijian': e.detail.value
    })
  },

  // 车型 - picker
  chezhaoren_chexing_(e) {
    console.log('车找人-车型', e.detail.value)
    this.setData({
      chezhaoren_chexing_index: e.detail.value
    })
  },

  // 空余座位 - picker
  chezhaoren_zuowei_(e) {
    console.log('车找人-空余座位', e.detail.value)
    this.setData({
      chezhaoren_zuowei_index: e.detail.value
    })
  },

  // 描述
  chezhaoren_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '车找人' + '&title=' + '描述'
    })
  },


  // ---------------------------------------- 其他----------------------------------------

  // 标题
  qita_biaoti_(e) {
    console.log('其他-标题', e.detail.value)
    this.setData({
      'params.kuozhan.qita_biaoti': e.detail.value
    })
  },

  // 描述
  qita_miaoshu_() {
    wx.navigateTo({
      url: '/pages/xinxi/textarea?leibie=' + '其他' + '&title=' + '描述'
    })
  },


  // ------------------------------ 参数验证 ------------------------------

  _checkParams(params) {
    console.log('参数验证', params)

    // --- 验证分类参数 ---
    if (params.leibie == '招聘') {

      // 薪资
      params.kuozhan.zhaopin_xinzi = this.data.zhaopin_xinziArr[this.data.zhaopin_xinzi_index]
      // 学历
      params.kuozhan.zhaopin_xueli = this.data.zhaopin_xueliArr[this.data.zhaopin_xueli_index]
      // 经验
      params.kuozhan.zhaopin_jingyan = this.data.zhaopin_jingyanArr[this.data.zhaopin_jingyan_index]

      // -- 招聘分类参数 -- 职位，薪资，公司，工作地址
      const rules = {
        zhaopin_zhiwei: {
          required: true,
          rangelength: [2, 10]
        },
        zhaopin_xinzi: {
          required: true
        },
        zhaopin_gongsi: {
          required: true,
          rangelength: [2, 10]
        },
        zhaopin_gongzuodizhi: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        phone: {
          required: true
        }
      }
      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {

        zhaopin_zhiwei: {
          required: '标题是必填项',
          rangelength: '职位长度在 2 到 10 之间'
        },
        zhaopin_xinzi: {
          required: '薪资是必填项'
        },
        zhaopin_gongsi: {
          required: '公司是必填项',
          rangelength: '公司长度在 2 到 10 之间'
        },
        zhaopin_gongzuodizhi: {
          required: '工作地址是必填项'
        },
        neirong: {
          required: '描述是必填项',
          rangelength: '描述长度在 10 到 1000 之间'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      return this._validate_params(rules, messages, params)

      // -- 求职 -- 
    } else if (params.leibie == '求职') {
      // 性别
      params.kuozhan.qiuzhi_xingbie = this.data.qiuzhi_xingbieArr[this.data.qiuzhi_xingbie_index]
      // 学历
      params.kuozhan.qiuzhi_xueli = this.data.qiuzhi_xueliArr[this.data.qiuzhi_xueli_index]
      // 工作时间
      params.kuozhan.qiuzhi_shijian = this.data.qiuzhi_shijianArr[this.data.qiuzhi_shijian_index]
      // 期望薪资
      params.kuozhan.qiuzhi_xinzi = this.data.qiuzhi_xinziArr[this.data.qiuzhi_xinzi_index]
      // 求职区域
      params.kuozhan.qiuzhi_quyu = this.data.qiuzhi_quyuArr[this.data.qiuzhi_quyu_index]

      // 性别 - 年龄 - 学历 - 意向职位
      const rules = {

        qiuzhi_nianling: {
          required: true
        },
        qiuzhi_yixiangzhiwei: {
          required: true,
          rangelength: [2, 10]
        },
        qiuzhi_liangdian: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        phone: {
          required: true
        }
      }
      const messages = {
        qiuzhi_nianling: {
          required: '年龄是必填项'
        },
        qiuzhi_yixiangzhiwei: {
          required: '意向职位是必填项',
          rangelength: '意向职位长度在 2 到 10 之间'
        },
        qiuzhi_liangdian: {
          required: '亮点标签是必填项',
        },
        neirong: {
          required: '个人描述是必填项',
          rangelength: '个人描述长度在 10 到 1000 之间'
        },
        phone: {
          required: '电话是必填项'
        }
      }
      // 
      return this._validate_params(rules, messages, params)

      // -- 房产出售 --
    } else if (params.leibie == '房产出售') {

      // 房型
      let multiArray = this.data.multiArray
      let multiIndex = this.data.multiIndex
      params.kuozhan.fangchan_chushou_fangxing = multiArray[0][multiIndex[0]] + ' ' + multiArray[1][multiIndex[1]] + ' ' + multiArray[2][multiIndex[2]]
      // 装修
      params.kuozhan.fangchan_chushou_zhuangxiu = this.data.fangchan_chushou_zhuangxiuArr[this.data.fangchan_chushou_zhuangxiu_index]
      //
      const rules = {
        fangchan_chushou_xiaoqu: {
          required: true,
          rangelength: [2, 20]
        },
        fangchan_chushou_mianji: {
          required: true
        },
        fangchan_chushou_zongjia: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        img: {
          required: true
        },
        phone: {
          required: true
        }
      }
      const messages = {
        fangchan_chushou_xiaoqu: {
          required: '位置是必填项',
          rangelength: '小区长度在 2 到 10 之间'
        },
        fangchan_chushou_mianji: {
          required: '面积是必填项'
        },
        fangchan_chushou_zongjia: {
          required: '总价是必填项'
        },
        neirong: {
          required: '详细描述是必填项',
          rangelength: '详细描述长度在 10 到 1000 之间'
        },
        img: {
          required: '房产图片是必填项'
        },
        phone: {
          required: '电话是必填项'
        }
      }
      // 
      return this._validate_params(rules, messages, params)


    } else if (params.leibie == '房屋出租') {
      //  -------------- 房屋出租 --------------

      // 房型
      let multiArray = this.data.multiArray
      let multiIndex = this.data.multiIndex
      params.kuozhan.fangchan_chuzu_fangxing = multiArray[0][multiIndex[0]] + multiArray[1][multiIndex[1]] + multiArray[2][multiIndex[2]]
      // 楼层
      let loucengArray = this.data.loucengArray
      let loucengIndex = this.data.loucengIndex
      params.kuozhan.fangchan_chuzu_louceng = loucengArray[0][loucengIndex[0]] + ' ' + loucengArray[1][loucengIndex[1]]
      // 装修
      params.kuozhan.fangchan_chuzu_zhuangxiu = this.data.fangchan_chushou_zhuangxiuArr[this.data.fangchan_chuzu_zhuangxiu_index]
      // 租金缴付方式
      params.kuozhan.fangchan_chuzu_zujinjiaofu = this.data.fangchan_chuzu_zujinjiaofuArr[this.data.fangchan_chuzu_zujinjiaofu_index]

      // 位置、面积、租金,房型、楼层,装修,交付方式,配置
      const rules = {
        fangchan_chuzu_xiaoqu: {
          required: true,
          rangelength: [2, 20]
        },
        fangchan_chuzu_mianji: {
          required: true
        },
        fangchan_chuzu_jiage: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        img: {
          required: true
        },
        phone: {
          required: true
        }
      }
      const messages = {
        fangchan_chuzu_xiaoqu: {
          required: '位置是必填项',
          rangelength: '位置长度在 2 到 20 之间'
        },
        fangchan_chuzu_mianji: {
          required: '面积是必填项'
        },
        fangchan_chuzu_jiage: {
          required: '租金是必填项'
        },
        neirong: {
          required: '房屋描述是必填项',
          rangelength: '房屋描述长度在 10 到 1000 之间'
        },
        img: {
          required: '房屋图片是必填项'
        },
        phone: {
          required: '电话是必填项'
        }
      }
      //
      return this._validate_params(rules, messages, params)


    } else if (params.leibie == '房屋求租') {

      // 房型
      let multiArray = this.data.multiArray
      let index = this.data.fangchan_qiuzu_fangxingIndex
      params.kuozhan.fangchan_qiuzu_fangxing = multiArray[0][index[0]] + multiArray[1][index[1]] + multiArray[2][index[2]]
      // 期望租金
      params.kuozhan.fangchan_qiuzu_qiwangzujin = this.data.fangchan_qiuzu_qiwangzujinArr[this.data.fangchan_qiuzu_qiwangzujin_index]
      // 我的性别
      params.kuozhan.fangchan_qiuzu_xingbie = this.data.qiuzhi_xingbieArr[this.data.fangchan_qiuzu_xingbie_index]

      // 区域-input
      const rules = {
        fangchan_qiuzu_quyu: {
          required: true,
          rangelength: [2, 20]
        },
        fangchan_qiuzu_nianling: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        phone: {
          required: true
        }
      }
      const messages = {
        fangchan_qiuzu_quyu: {
          required: '区域是必填项',
          rangelength: '区域长度在 2 到 20 之间'
        },
        fangchan_qiuzu_nianling: {
          required: '年龄是必填项'
        },
        neirong: {
          required: '详细描述是必填项',
          rangelength: '详细描述长度在 10 到 1000 之间'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)

    } else if (params.leibie == '店铺转让') {
      //  -------------- 店铺转让 --------------

      // 转让费用
      params.kuozhan.dianpu_zhuanrang_feiyong = this.data.dianpu_zhuanrang_feiyongArr[this.data.dianpu_zhuanrang_feiyong_index]


      const rules = {
        dianpu_zhuanrang_biaoti: {
          required: true,
          rangelength: [2, 20]
        },
        dianpu_zhuanrang_weizhi: {
          required: true
        },
        dianpu_zhuanrang_mianji: {
          required: true
        },
        dianpu_zhuanrang_zuqi: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        img: {
          required: true
        },
        phone: {
          required: true
        }

      }
      const messages = {
        dianpu_zhuanrang_biaoti: {
          required: '标题是必填项',
          rangelength: '标题长度在 2 到 20 之间'
        },
        dianpu_zhuanrang_weizhi: {
          required: '位置是必填项',
        },
        dianpu_zhuanrang_mianji: {
          required: '面积是必填项',
        },
        dianpu_zhuanrang_zuqi: {
          required: '租期是必填项',
        },
        neirong: {
          required: '店铺描述是必填项',
          rangelength: '房屋描述长度在 10 到 1000 之间'
        },
        img: {
          required: '店铺图片是必填项'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)


    } else if (params.leibie == '商铺出租') {
      //  -------------- 商铺出租 --------------

      // 起租期
      // params.kuozhan.shangpu_chuzu_zuqi = this.data.shangpu_chuzu_zuqiArr[this.data.shangpu_chuzu_zuqi_index]
      // 支付方式
      // params.kuozhan.shangpu_chuzu_zhifufangshi = this.data.shangpu_chuzu_zhifufangshiArr[this.data.shangpu_chuzu_zhifufangshi_index]

      const rules = {
        shangpu_chuzu_biaoti: {
          required: true,
          rangelength: [2, 20]
        },
        shangpu_chuzu_weizhi: {
          required: true
        },
        shangpu_chuzu_mianji: {
          required: true
        },
        // shangpu_chuzu_zujin: {
        //   required: true
        // },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        img: {
          required: true
        },
        phone: {
          required: true
        }

      }
      const messages = {
        shangpu_chuzu_biaoti: {
          required: '标题是必填项',
          rangelength: '标题长度在 2 到 20 之间'
        },
        shangpu_chuzu_weizhi: {
          required: '位置是必填项',
        },
        shangpu_chuzu_mianji: {
          required: '面积是必填项',
        },
        // shangpu_chuzu_zujin: {
        //   required: '期望租金是必填项',
        // },
        neirong: {
          required: '商铺描述是必填项',
          rangelength: '商铺描述长度在 10 到 1000 之间'
        },
        img: {
          required: '商铺图片是必填项'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)


    } else if (params.leibie == '车辆出售') {
      // -------- 车辆出售 --------

      const rules = {
        cheliang_chushou_chexing: {
          required: true,
          rangelength: [2, 30]
        },
        cheliang_chushou_licheng: {
          required: true
        },
        cheliang_chushou_jiage: {
          required: true
        },
        cheliang_chushou_shangpai: {
          required: true
        },
        cheliang_chushou_dizhi: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        img: {
          required: true
        },
        phone: {
          required: true
        }
      }
      const messages = {
        cheliang_chushou_chexing: {
          required: '车型是必填项',
          rangelength: '车型长度在 2 到 30 之间'
        },
        cheliang_chushou_licheng: {
          required: '里程是必填项'
        },
        cheliang_chushou_jiage: {
          required: '价格是必填项'
        },
        cheliang_chushou_shangpai: {
          required: '上牌时间是必填项'
        },
        cheliang_chushou_dizhi: {
          required: '看车地址是必填项'
        },
        neirong: {
          required: '车辆描述是必填项',
          rangelength: '车辆描述长度在 10 到 1000 之间'
        },
        img: {
          required: '车辆图片是必填项'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)


    } else if (params.leibie == '物品出售') {
      // -------- 物品出售 --------

      // 新旧程度
      params.kuozhan.wupin_chushou_chengse = this.data.wupin_chushou_chengseArr[this.data.wupin_chushou_chengse_index]

      const rules = {
        wupin_chushou_biaoti: {
          required: true,
          rangelength: [2, 30]
        },
        wupin_chushou_jiage: {
          required: true
        },
        wupin_chushou_yuanjia: {
          required: true
        },
        wupin_chushou_weizhi: {
          required: true
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        img: {
          required: true
        },
        phone: {
          required: true
        }
      }
      const messages = {
        wupin_chushou_biaoti: {
          required: '标题是必填项',
          rangelength: '标题长度在 2 到 30 之间'
        },
        wupin_chushou_jiage: {
          required: '价格是必填项'
        },
        wupin_chushou_yuanjia: {
          required: '原价是必填项'
        },
        wupin_chushou_weizhi: {
          required: '位置是必填项'
        },
        neirong: {
          required: '描述是必填项',
          rangelength: '描述长度在 10 到 1000 之间'
        },
        img: {
          required: '物品图片是必填项'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)


    } else if (params.leibie == '人找车') {

      // -------- 人找车 --------
      // 日期
      params.kuozhan.renzhaoche_riqi = this.data.chezhaoren_riqiArr[this.data.renzhaoche_riqi_index]
      // 人数
      params.kuozhan.renzhaoche_renshu = this.data.renzhaoche_renshuArr[this.data.renzhaoche_renshu_index]

      const rules = {
        renzhaoche_chufadi: {
          required: true,
          rangelength: [2, 10]
        },
        renzhaoche_mudidi: {
          required: true,
          rangelength: [2, 10]
        },
        renzhaoche_zuizaoshijian: {
          required: true
        },
        renzhaoche_zuiwanshijian: {
          required: true
        },
        // neirong: {
        //   required: true,
        //   rangelength: [10, 1000]
        // },
        phone: {
          required: true
        }
      }
      const messages = {
        renzhaoche_chufadi: {
          required: '出发地是必填项',
          rangelength: '出发地长度在 2 到 10 之间'
        },
        renzhaoche_mudidi: {
          required: '目的地是必填项',
          rangelength: '目的地长度在 2 到 10 之间'
        },
        renzhaoche_zuizaoshijian: {
          required: '最早出发时间是必填项'
        },
        renzhaoche_zuiwanshijian: {
          required: '最晚出发时间是必填项'
        },
        // neirong: {
        //   required: '描述是必填项',
        //   rangelength: '描述长度在 10 到 1000 之间'
        // },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)

    } else if (params.leibie == '车找人') {

      // -------- 车找人 --------
      // 日期
      params.kuozhan.chezhaoren_riqi = this.data.chezhaoren_riqiArr[this.data.chezhaoren_riqi_index]
      // 车型
      params.kuozhan.chezhaoren_chexing = this.data.chezhaoren_chexingArr[this.data.chezhaoren_chexing_index]
      // 剩余座位
      params.kuozhan.chezhaoren_zuowei = this.data.chezhaoren_zuoweiArr[this.data.chezhaoren_zuowei_index]

      const rules = {
        chezhaoren_chufadi: {
          required: true,
          rangelength: [2, 10]
        },
        chezhaoren_mudidi: {
          required: true,
          rangelength: [2, 10]
        },
        chezhaoren_zuizaoshijian: {
          required: true
        },
        chezhaoren_zuiwanshijian: {
          required: true
        },
        // neirong: {
        //   required: true,
        //   rangelength: [10, 1000]
        // },
        phone: {
          required: true
        }
      }
      const messages = {
        chezhaoren_chufadi: {
          required: '出发地是必填项',
          rangelength: '出发地长度在 2 到 10 之间'
        },
        chezhaoren_mudidi: {
          required: '目的地是必填项',
          rangelength: '目的地长度在 2 到 10 之间'
        },
        chezhaoren_zuizaoshijian: {
          required: '最早出发时间是必填项'
        },
        chezhaoren_zuiwanshijian: {
          required: '最晚出发时间是必填项'
        },
        // neirong: {
        //   required: '描述是必填项',
        //   rangelength: '描述长度在 10 到 1000 之间'
        // },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)

    } else if (params.leibie == '其他') {

      const rules = {
        qita_biaoti: {
          required: true,
          rangelength: [2, 30]
        },
        neirong: {
          required: true,
          rangelength: [10, 1000]
        },
        phone: {
          required: true
        }
      }
      const messages = {
        qita_biaoti: {
          required: '标题是必填项',
          rangelength: '标题长度在 2 到 30 之间'
        },
        neirong: {
          required: '描述是必填项',
          rangelength: '描述长度在 10 到 1000 之间'
        },
        phone: {
          required: '电话是必填项'
        }
      }

      //
      return this._validate_params(rules, messages, params)

    }


  },




  // ----------------------------------------------------------- 验证分类参数 ---------------------------------------------------

  _validate_params(rules, messages, params) {
    // 
    const wxValidate = new WxValidate(rules, messages)
    // 把二维对象改成一维验证
    console.log('params', params)
    // 深拷贝 - (直接赋值Object.assign会改变原始params)
    let validateParams = JSON.parse(JSON.stringify(params))
    console.log('深拷贝validateParams', validateParams)
    // 把kuozhan合并进validateParams
    validateParams = Object.assign(validateParams, validateParams.kuozhan)
    console.log('assignvalidateParams', validateParams)
    console.log('params1', params)

    // 验证必要
    if (!wxValidate.checkForm(validateParams)) {
      const error = wxValidate.errorList[0]
      // 提示
      wx.showModal({
        content: error.msg,
        showCancel: false
      })
      return false
    }
    return true
  },



  // 提交
  tijiao_(e) {
    console.log('formId', e.detail.formId)
    let params = this.data.params
    console.log('tijiao_params', params)

    // ------ 验证参数 ------
    let error = this._checkParams(params)
    if (!error) {
      return
    }
    console.log('通过')
    // 打开loading
    this.setData({
      btn_tijiao_loading: true
    }, () => {
      params.form_id = e.detail.formId
      // 检查是否有图片准备上传
      if (params.img && params.img.length > 0) {
        // 有图片、创建信息
        api.createList({
          params: params
        }, (res) => {
          console.log('有图片create', res)
          let list_id = res.data.id,
            cospath = "/bianmin",
            img = params.img
          // cos上传
          cos.update_img_cos(cospath, img, (back) => {
            // 上传成功，写入图片数据库
            api.createImg({
              list_id: list_id,
              url: back.data.source_url
            }, (imgres) => {
              console.log('写入图片到数据库OK', imgres)
            })
          }, (ok) => {
            console.log('ok', ok)
            // hid
            wx.hideLoading()
            // 关闭当前页面，跳转到bmxx/myfabu页
            wx.showModal({
              title: '发布成功',
              content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
              showCancel: false,
              success: () => {
                // 关闭当前页面，跳转到应用内的某个页面。
                wx.redirectTo({
                  url: '/pages/wode/xinxi/detail?id=' + res.data.id
                })
              }
            })
          })
        })
      } else {
        // 没图片
        api.createList({
          params: params
        }, res => {
          console.log('没图片create', res)
          // hid
          wx.hideLoading()
          // 关闭当前页面，跳转到bmxx/myfabu页
          wx.showModal({
            title: '发布成功',
            content: '信息随时可以修改、刷新或删除、还可以邀请好友帮你增加顶置时间',
            showCancel: false,
            success: () => {
              // 关闭当前页面，跳转到应用内的某个页面。
              wx.redirectTo({
                url: '/pages/wode/xinxi/detail?id=' + res.data.id
              })
            }
          })
        })
      }
    })
  },

})