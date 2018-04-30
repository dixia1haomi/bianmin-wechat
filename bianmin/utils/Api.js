import { Base } from './Base.js'

class Api extends Base {
  constructor() {
    super()
  }

  // 获取便民信息列表
  getList(data, callback) {
    wx.showLoading({ title: '加载中' })
    this.request({
      url: 'index/getlist', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 查询单条便民信息
  findBianmin(data, callback) {
    this.request({ url: 'index/findbianmin', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 创建便民信息
  createList(data, callback) {
    this.request({ url: 'index/create', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 创建img
  createImg(data, callback) {
    this.request({ url: 'index/createimg', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 增加点击量
  incLiulangcishu(data, callback) {
    this.request({ url: 'index/incliulangcishu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ------------------------------------------------- 我的 ---------------------------------------------------
  // 我的发布
  myFabu(data, callback) {
    this.request({ url: 'index/myfabu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 修改便民信息内容
  xiugaiNeirong(data, callback) {
    this.request({ url: 'index/xiugaineirong', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 删除我的发布(接受list_id)
  deleteMyFabu(data, callback) {
    this.request({ url: 'index/deletemyfabu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 刷新(接受id)
  updateTime(data, callback) {
    this.request({ url: 'index/updatetime', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 获取电话
  getPhone(data, callback) {
    this.request({ url: 'index/getphone', data: data, sCallback: (res) => { callback && callback(res) } })
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
    this.request({ url: 'user/saveuserinfo', data: data, sCallback: (res) => { callback && callback(res.data) } })
  }

  // ------------------------------------------------- 商家 ---------------------------------------------------
  // 新增商家
  createShangjia(data, callback) {
    this.request({ url: 'index/createshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 新增商家图片
  createShangjiaImg(data, callback) {
    this.request({ url: 'index/createshangjiaimg', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询商家详情(接受商家ID)
  findShangjia(data, callback) {
    this.request({ url: 'index/findshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询商家列表
  selectShangjia(data, callback) {
    this.request({ url: 'index/selectshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询我的店铺
  getMyShangjia(data, callback) {
    this.request({ url: 'index/myshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 删除店铺
  deleteShangjia(data, callback) {
    this.request({ url: 'index/deleteshangjia', data: data, sCallback: (res) => { callback && callback(res) } })
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
    this.request({ url: 'liuyan/createbianminliuyan', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 新增便民留言回复
  createBianminLiuyanHuifu(data, callback) {
    this.request({ url: 'liuyan/createbianminliuyanhuifu', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // 查询我的留言
  // selectMyLiuyan(data, callback) {
  //   this.request({ url: 'liuyan/selectmyliuyan', data: data, sCallback: (res) => { callback && callback(res) } })
  // }

  // 回复我的
  huifuWode(data, callback) {
    this.request({ url: 'liuyan/huifuWode', data: data, sCallback: (res) => { callback && callback(res) } })
  }

  // ----- 测试模板消息 -------
  mobanXiaoxi(data, callback) {
    this.request({ url: 'liuyan/xiaoxiapi', data: data, sCallback: (res) => { callback && callback(res) } })
  }


}

export { Api }

