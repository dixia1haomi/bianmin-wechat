import { Base } from './Base.js'

class Api extends Base {
  constructor() {
    super()
  }

  // ------------------------------------------------- COS ---------------------------------------------------
  // cos签名
  cosQianming(data, callback) {
    this.request({ url: 'cos/qianmingdanci', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------------------------- Token ---------------------------------------------------

  // 获得token
  getToken(data, callback) {
    this.request({ url: 'token/gettoken', data: data, sCallback: (res) => { callback && callback(res.data) } })
  }

  // 检查token是否失效 
  checkToken(data, callback) {
    this.request({ url: 'token/verify', data: data, sCallback: (res) => { callback && callback(res.data) } })
  }

  // ------------------------------------------------- 登陆 ---------------------------------------------------

  // 保存用户信息
  saveUserInfo(data, callback) {
    wx.showLoading({ title: '登陆中', mask: true })
    this.request({
      url: 'user/saveuserinfo', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res.data)
      }
    })
  }

  // --------------------------------------------------- 便民信息 ---------------------------------------------------

  // 获得类目数组
  leiMu(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'xinxi/leimu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 生成二维码
  shengChengErWeiMa(data, callback) {
    wx.showLoading({ title: '生成中', mask: true })
    this.request({
      url: 'xinxi/erweima', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 增加便民信息顶置
  createBmxxDingZhi(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'xinxi/createbmxxdingzhi', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 获取便民信息列表
  getList(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'xinxi/getlist', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询单条便民信息
  findBianmin(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'xinxi/findbianmin', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建便民信息
  createList(data, callback) {
    wx.showLoading({ title: '发布中', mask: true })
    this.request({
      url: 'xinxi/create', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建img
  createImg(data, callback) {
    wx.showLoading({ title: '上传中', mask: true })
    this.request({
      url: 'xinxi/createimg', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 增加点击量
  incLiulangcishu(data, callback) {
    this.request({ url: 'xinxi/incliulangcishu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // -------------------- 我的 --------------------
  // 我的发布
  myFabu(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'xinxi/myfabu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 修改便民信息内容
  xiugaiNeirong(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'xinxi/xiugaineirong', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除我的发布(接受list_id)
  deleteMyFabu(data, callback) {
    wx.showLoading({ title: '删除中', mask: true })
    this.request({
      url: 'xinxi/deletemyfabu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 刷新(接受id)
  updateTime(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'xinxi/updatetime', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 获取电话、可能token突然过期返回-41003、让用户重试一次
  getPhone(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/getphone', data: data, sCallback: (res) => {
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
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'xinxi/createbianminliuyan', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增便民回复
  createBianminHuifu(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'xinxi/createbianminhuifu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新留言提醒，更新formId
  updateFormId(data, callback) {
    wx.showLoading({ title: '记录中', mask: true })
    this.request({
      url: 'xinxi/updateformid', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }



  // ------------------------------------------------- 商家 ---------------------------------------------------
  // 新增商家
  createShangjia(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'shangjia/createshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // -------------- 编辑商家图基本资料 --------------

  // 修改店铺头图
  xiugaiShangjiaToutu(data, callback) {
    wx.showLoading({ title: '修改中', mask: true })
    this.request({
      url: 'shangjia/xiugaishangjiatoutu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '修改成功' })
      }
    })
  }

  // 修改店铺名称
  xiugaiShangjiaName(data, callback) {
    wx.showLoading({ title: '修改中', mask: true })
    this.request({
      url: 'shangjia/xiugaishangjianame', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '修改成功' })
      }
    })
  }

  // 修改店铺地址
  xiugaiShangjiaDizhi(data, callback) {
    wx.showLoading({ title: '修改中', mask: true })
    this.request({
      url: 'shangjia/xiugaishangjiadizhi', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '修改成功' })
      }
    })
  }

  // 修改店铺描述
  // xiugaiShangjiaMiaoshu(data, callback) {
  //   wx.showLoading({ title: '修改中', mask: true })
  //   this.request({
  //     url: 'shangjia/xiugaishangjiamiaoshu', data: data, sCallback: (res) => {
  //       wx.hideLoading()
  //       callback && callback(res)
  //       wx.showToast({ title: '修改成功' })
  //     }
  //   })
  // }



  // -------------- 编辑商家图文详情块 --------------

  // 新增商家IMG表
  createShangjiaImg(data, callback) {
    wx.showLoading({ title: '创建中', mask: true })
    this.request({
      url: 'shangjia/createshangjiaimg', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '创建成功' })
      }
    })
  }

  // 修改商家IMG里的text字段
  createShangjiaImgText(data, callback) {
    wx.showLoading({ title: '修改中', mask: true })
    this.request({
      url: 'shangjia/updateshangjiaimgtext', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '修改成功' })
      }
    })
  }

  // 修改商家IMG里的url字段
  createShangjiaImgUrl(data, callback) {
    wx.showLoading({ title: '修改中', mask: true })
    this.request({
      url: 'shangjia/updateshangjiaimgurl', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '修改成功' })
      }
    })
  }

  // 删除商家IMG一条数据
  deleteShangjiaImg(data, callback) {
    wx.showLoading({ title: '删除中', mask: true })
    this.request({
      url: 'shangjia/deleteshangjiaimg', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '删除成功' })
      }
    })
  }

  // 查询商家详情(接受商家ID)
  findShangjia(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'shangjia/findshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询商家列表
  selectShangjia(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'shangjia/selectshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询我的店铺
  getMyShangjia(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'shangjia/myshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除店铺
  deleteShangjia(data, callback) {
    wx.showLoading({ title: '删除中', mask: true })
    this.request({
      url: 'shangjia/deleteshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
        wx.showToast({ title: '删除成功' })
      }
    })
  }

  // 删除店铺详情图1张
  deleteShangjiaImg(data, callback) {
    this.request({ url: 'shangjia/deleteshangjiaimg', data: data, sCallback: (res) => { callback && callback(res) } })
  }








  // ------------------------------------------------- onError ---------------------------------------------------
  onError(data, callback) {
    this.request({ url: 'index/onerror', data: data, sCallback: (res) => { callback && callback(res) } })
  }

}

export { Api }

