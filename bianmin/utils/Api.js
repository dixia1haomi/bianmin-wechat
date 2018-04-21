import { Base } from './Base.js'

class Api extends Base {
  constructor() {
    super()
  }

  // 获取信息列表
  getList(data, callback) {
    wx.showLoading({ title: '加载中' })
    this.request({
      url: 'index/getlist', data: data, sCallback: (res) => {
        wx.hideLoading()
        callback && callback(res)
      }
    })
  }

  // 创建list
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
  // 登陆
  newLogin(data, callback) {
    this.request({ url: 'token/gettoken', data: data, sCallback: (res) => { callback && callback(res.data) } })
  }

  // 检查token是否失效 
  checkToken(data, callback) {
    this.request({ url: 'token/verify', data: data, sCallback: (res) => { callback && callback(res.data) } })
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


}

export { Api }

