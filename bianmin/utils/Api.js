import { Base } from './Base.js'

class Api extends Base {
  constructor() {
    super()
  }

  // 获取便民信息列表
  getList(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'index/getlist', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询单条便民信息
  findBianmin(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'index/findbianmin', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建便民信息
  createList(data, callback) {
    wx.showLoading({ title: '发布中', mask: true })
    this.request({
      url: 'index/create', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建img
  createImg(data, callback) {
    wx.showLoading({ title: '上传中', mask: true })
    this.request({
      url: 'index/createimg', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 增加点击量
  incLiulangcishu(data, callback) {
    this.request({ url: 'index/incliulangcishu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------------------------- 我的 ---------------------------------------------------
  // 我的发布
  myFabu(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/myfabu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 修改便民信息内容
  xiugaiNeirong(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/xiugaineirong', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除我的发布(接受list_id)
  deleteMyFabu(data, callback) {
    wx.showLoading({ title: '删除中', mask: true })
    this.request({
      url: 'index/deletemyfabu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 刷新(接受id)
  updateTime(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/updatetime', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 获取电话
  getPhone(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/getphone', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
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

  // ------------------------------------------------- 商家 ---------------------------------------------------
  // 新增商家
  createShangjia(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/createshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增商家图片
  createShangjiaImg(data, callback) {
    wx.showLoading({ title: '上传中', mask: true })
    this.request({
      url: 'index/createshangjiaimg', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询商家详情(接受商家ID)
  findShangjia(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/findshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询商家列表
  selectShangjia(data, callback) {
    wx.showLoading({ title: '加载中', mask: true })
    this.request({
      url: 'index/selectshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询我的店铺
  getMyShangjia(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'index/myshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除店铺
  deleteShangjia(data, callback) {
    wx.showLoading({ title: '删除中', mask: true })
    this.request({
      url: 'index/deleteshangjia', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 删除店铺详情图1张
  deleteShangjiaImg(data, callback) {
    this.request({ url: 'index/deleteshangjiaimg', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 修改店铺头图
  xiugaiShangjiaToutu(data, callback) {
    this.request({ url: 'index/xiugaishangjiatoutu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 修改店铺名称
  xiugaiShangjiaName(data, callback) {
    this.request({ url: 'index/xiugaishangjianame', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 修改店铺描述
  xiugaiShangjiaMiaoshu(data, callback) {
    this.request({ url: 'index/xiugaishangjiamiaoshu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 修改店铺地址
  xiugaiShangjiaDizhi(data, callback) {
    this.request({ url: 'index/xiugaishangjiadizhi', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------------------------- 便民信息留言 ---------------------------------------------------

  // 新增便民留言
  createBianminLiuyan(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'liuyan/createbianminliuyan', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新增便民回复
  createBianminHuifu(data, callback) {
    wx.showLoading({ title: '请稍候', mask: true })
    this.request({
      url: 'liuyan/createbianminhuifu', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 新留言提醒，更新formId
  updateFormId(data, callback) {
    wx.showLoading({ title: '记录中', mask: true })
    this.request({
      url: 'liuyan/updateformid', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询我的留言
  // selectMyLiuyan(data, callback) {
  //   this.request({ url: 'liuyan/selectmyliuyan', data: data, sCallback: (res) => { callback && callback(res) } })
  // }

  // 回复我的
  // huifuWode(data, callback) {
  //   this.request({ url: 'liuyan/huifuWode', data: data, sCallback: (res) => { callback && callback(res) } })
  // }




}

export { Api }

