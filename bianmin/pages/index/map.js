const app = getApp()
// -------------
let plugin = requirePlugin("tengxunditu")
let routeInfo = {
  // startLat: 25.60344,  //起点纬度 选填
  // startLng: 103.82694,  //起点经度 选填
  startName: "我的位置", // 起点名称 选填
  endLat: 25.60344, // 终点纬度必传
  endLng: 103.82694, //终点经度 必传
  endName: "终点名称", //终点名称 必传
  mode: "car" //算路方式 选填
}

Page({

  data: {
    routeInfo: routeInfo
  },


  onLoad: function(op) {
    console.log('app-data',app.data)
    // 设置传进来的数据
    this.setData({
      // 'routeInfo.startLat': app.data.Location.latitude,
      // 'routeInfo.startLng': app.data.Location.longitude,
      'routeInfo.endLat': op.latitude,
      'routeInfo.endLng': op.longitude,
      'routeInfo.endName': op.address
    })
  },


})