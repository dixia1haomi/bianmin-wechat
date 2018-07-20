import {
  Base
} from './Base.js'

class Api extends Base {
  constructor() {
    super()
  }

  date_ceshi() {

    // 获得X月X日 数组
    let MDarr = ['每天']
    for (let i = 0; i < 7; i++) {
      // date = 当前时间
      let date = new Date();
      // 设置date2的时间 = 当前时间的天数 + i (i天后的时间,返回的是时间戳)
      date.setDate(date.getDate() + i)
      // i天后的时间戳转成 X月X日 push 进arr数组
      MDarr.push((date.getMonth() + 1) + '月' + date.getDate() + '日')
    }
    // 小时 分钟
    let xiaoshi = ['0点', '1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
    let fenzhong = ['0分', '10分', '20分', '30分', '40分', '50分']
    
    return [MDarr, xiaoshi, fenzhong]
  }
  // ------------------------------------------------- 测试 ---------------------------------------------------

  // apiceshi(data, callback) {
  //   this.request({ url: 'ceshi/renzhaoche', data: data, sCallback: (res) => { callback && callback(res) } })
  // }

  // ------------------------------------------------- COS ---------------------------------------------------
  // cos签名
  cosQianming(data, callback) {
    this.request({
      url: 'cos/qianmingdanci',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    })
  }

  // ------------------------------------------------- Token ---------------------------------------------------

  // 获得token
  getToken(data, callback) {
    this.request({
      url: 'token/gettoken',
      data: data,
      sCallback: (res) => {
        callback && callback(res.data)
      }
    })
  }

  // 检查token是否失效 
  checkToken(data, callback) {
    this.request({
      url: 'token/verify',
      data: data,
      sCallback: (res) => {
        callback && callback(res.data)
      }
    })
  }

  // ------------------------------------------------- 登陆 ---------------------------------------------------

  // 保存用户信息
  saveUserInfo(data, callback) {
    wx.showLoading({
      title: '登陆中',
      mask: true
    })
    this.request({
      url: 'user/saveuserinfo',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res.data)
      }
    })
  }

  // --------------------------------------------------- 便民信息 ---------------------------------------------------

  // 获得类目数组
  // leiMu(data, callback) {
  //   // wx.showLoading({ title: '加载中', mask: true })
  //   this.request({
  //     url: 'xinxi/leimu', data: data, sCallback: (res) => {
  //       // wx.hideLoading()
  //       callback && callback(res)
  //     }
  //   })
  // }

  // 生成信息顶置二维码
  xinxiDingzhierweima(data, callback) {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    this.request({
      url: 'xinxi/erweima',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 增加便民信息顶置
  createBmxxDingZhi(data, callback) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.request({
      url: 'xinxi/createbmxxdingzhi',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 获取便民信息列表
  getList(data, callback) {
    // wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'xinxi/getlist',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询单条便民信息
  findBianmin(data, callback) {
    // wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'xinxi/findbianmin',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建便民信息
  createList(data, callback) {
    wx.showLoading({
      title: '发布中',
      mask: true
    })
    this.request({
      url: 'xinxi/create',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    })
  }

  // 创建img
  createImg(data, callback) {
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    this.request({
      url: 'xinxi/createimg',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    })
  }

  // 增加点击量
  incLiulangcishu(data, callback) {
    this.request({
      url: 'xinxi/incliulangcishu',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    })
  }

  // -------------------- 我的 --------------------
  // 我的发布
  myFabu(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'xinxi/myfabu',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 修改便民信息内容
  xiugaiNeirong(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'xinxi/xiugaineirong',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除我的发布(接受list_id)
  deleteMyFabu(data, callback) {
    wx.showLoading({
      title: '删除中',
      mask: true
    })
    this.request({
      url: 'xinxi/deletemyfabu',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 刷新(接受id)
  updateTime(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'xinxi/updatetime',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 获取电话、可能token突然过期返回-41003、让用户重试一次
  getPhone(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'index/getphone',
      data: data,
      sCallback: (res) => {
        console.log('getPhone', res)
        if (res.data == -41003) {
          wx.showModal({
            title: '错误、请重试一次',
            content: '可能因为登录态突然过期、请尝试再次获取电话',
            showCancel: false
          })
        }
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // -------------------- 便民信息留言 --------------------

  // 新增便民留言
  createBianminLiuyan(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'xinxi/createbianminliuyan',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增便民回复
  createBianminHuifu(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'xinxi/createbianminhuifu',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新留言提醒，更新formId
  updateFormId(data, callback) {
    wx.showLoading({
      title: '记录中',
      mask: true
    })
    this.request({
      url: 'xinxi/updateformid',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }



  // ------------------------------------------------- 商家 ---------------------------------------------------

  // 新增商家
  createShangjia(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'shangjia/createshangjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询商家详情(接受商家ID)
  findShangjia(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'shangjia/findshangjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询商家列表
  selectShangjia(data, callback) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.request({
      url: 'shangjia/selectshangjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询我的店铺
  getMyShangjia(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'shangjia/myshangjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 刷新店铺
  shuaXinShangjia(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'shangjia/shuaxin',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除店铺
  deleteShangjia(data, callback) {
    wx.showLoading({
      title: '删除中',
      mask: true
    })
    this.request({
      url: 'shangjia/deleteshangjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '删除成功'
        })
      }
    })
  }

  // -------------- 编辑商家图基本资料 --------------

  // 修改店铺头图
  xiugaiShangjiaToutu(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'shangjia/xiugaishangjiatoutu',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改店铺名称
  xiugaiShangjiaName(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'shangjia/xiugaishangjianame',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改店铺地址
  xiugaiShangjiaDizhi(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'shangjia/xiugaishangjiadizhi',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }



  // -------------- 编辑商家图文详情块 --------------

  // 新增商家IMG表
  createShangjiaImg(data, callback) {
    wx.showLoading({
      title: '创建中',
      mask: true
    })
    this.request({
      url: 'shangjia/createshangjiaimg',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '创建成功'
        })
      }
    })
  }

  // 修改商家IMG里的text字段
  updateShangjiaImgText(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'shangjia/updateshangjiaimgtext',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改商家IMG里的url字段
  updateShangjiaImgUrl(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'shangjia/updateshangjiaimgurl',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 删除商家IMG一条数据
  deleteShangjiaImg(data, callback) {
    wx.showLoading({
      title: '删除中',
      mask: true
    })
    this.request({
      url: 'shangjia/deleteshangjiaimg',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '删除成功'
        })
      }
    })
  }

  // ------------------------------------------------- 商家活动 ---------------------------------------------------
  // 新增商家活动
  createShangjiaHuodong(data, callback) {
    wx.showLoading({
      title: '创建中',
      mask: true
    })
    this.request({
      url: 'huodong/createhuodong',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '创建成功'
        })
      }
    })
  }

  // 查询活动详情
  findShangjiaHuodong(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodong/findhuodong',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询活动列表
  selectShangjiaHuodong(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodong/selecthuodong',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除活动
  deleteShangjiaHuodong(data, callback) {
    wx.showLoading({
      title: '删除中',
      mask: true
    })
    this.request({
      url: 'huodong/deletehuodong',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '删除成功'
        })
      }
    })
  }

  // -------------- 编辑活动基本资料 --------------

  // 修改活动头图
  xiugaiHuodongToutu(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongtoutu',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动标题
  xiugaiHuodongBiaoti(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongbiaoti',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动原价
  xiugaiHuodongYuanjia(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongyuanjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动价
  xiugaiHuodongHuodongjia(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodonghuodongjia',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动数量
  xiugaiHuodongShuliang(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongshuliang',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动条件
  xiugaiHuodongTiaojian(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongtiaojian',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动结束时间
  xiugaiHuodongTime(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongtime',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动说明
  xiugaiHuodongShuoming(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/xiugaihuodongshuoming',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // -------------- 编辑活动图文详情块 --------------

  // 新增活动IMG表
  createHuodongImg(data, callback) {
    wx.showLoading({
      title: '创建中',
      mask: true
    })
    this.request({
      url: 'huodong/createhuodongimg',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '创建成功'
        })
      }
    })
  }

  // 修改活动IMG里的text字段
  updateHuodongImgText(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/updatehuodongimgtext',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 修改活动IMG里的url字段
  updateHuodongImgUrl(data, callback) {
    wx.showLoading({
      title: '修改中',
      mask: true
    })
    this.request({
      url: 'huodong/updatehuodongimgurl',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '修改成功'
        })
      }
    })
  }

  // 删除活动IMG一条数据
  deleteHuodongImg(data, callback) {
    wx.showLoading({
      title: '删除中',
      mask: true
    })
    this.request({
      url: 'huodong/deletehuodongimg',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({
          title: '删除成功'
        })
      }
    })
  }


  // -------------- 参与活动 --------------

  // 检查有canyuId的参与结果
  checkBieren(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/checkbieren',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 检查无canyuId的参与结果
  checkZiji(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/checkziji',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增参与
  createCanyuHuodong(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/canyu',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增助力
  createZhuliHuodong(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/zhuli',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增领取
  createLingquHuodong(data, callback) {
    wx.showLoading({
      title: '领取中',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/lingqu',
      data: data,
      sCallback: (res) => {
        // wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询领取详情
  getJuanDetail(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/juandetail',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询领取列表
  getJuanList(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/juanlist',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 核销劵
  hexiaoLingquHuodong(data, callback) {
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/hexiao',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }


  // 生成活动助力二维码
  huodongZhulierweima(data, callback) {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    this.request({
      url: 'huodongcanyu/erweima',
      data: data,
      sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }


  // ------------------------------------------------- onError ---------------------------------------------------
  onError(data, callback) {
    this.request({
      url: 'index/onerror',
      data: data,
      sCallback: (res) => {
        callback && callback(res)
      }
    })
  }

}

export {
  Api
}