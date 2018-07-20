class Utils {
  constructor() {}

  // -------------------------- 处理换行符号 --------------------------

  // \n\n换\n
  checkHuanHangFu2_1(str) {
    for (let i in str) {
      if (str.indexOf("\n\n") == -1) {
        break;
      }
      str = str.replace(/\n\n/g, "\n")
    }
    return str;
  }

  // \n换空格
  checkHuanHangFu(str) {
    for (let i in str) {
      if (str.indexOf("\n") == -1) {
        break;
      }
      str = str.replace(/\n/g, " ")
    }
    return str;
  }


  // -------------------------- 获得当前年月日 --------------------------
  get_Y_M_D() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var data = year + "-" + month + "-" + day;
    return data;
  }

  // -------------------------- 获得当前年月日的下一个月 --------------------------
  get_Y_M_1_D() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 2 < 10 ? "0" + (nowDate.getMonth() + 2) : nowDate.getMonth() + 2;
    var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var data = year + "-" + month + "-" + day;
    return data;
  }

  // -------------------------- 获得 车找人-出发日期 --------------------------

  get_chezhaoren_chufariqi() {
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
    return MDarr
  }


  // get_chezhaoren_zuizaochufashijian() {
  //   // 获得X月X日 数组
  //   let MDarr = ['每天']
  //   for (let i = 0; i < 7; i++) {
  //     // date = 当前时间
  //     let date = new Date();
  //     // 设置date2的时间 = 当前时间的天数 + i (i天后的时间,返回的是时间戳)
  //     date.setDate(date.getDate() + i)
  //     // i天后的时间戳转成 X月X日 push 进arr数组
  //     MDarr.push((date.getMonth() + 1) + '月' + date.getDate() + '日')
  //   }
  //   // 小时 分钟
  //   let xiaoshi = ['00 :', '01 :', '02 :', '03 :', '04 :', '05 :', '06 :', '07 :', '08 :', '09 :', '10 :', '11 :', '12 :', '13 :', '14 :', '15 :', '16 :', '17 :', '18 :', '19 :', '20 :', '21 :', '22 :', '23 :']
  //   let fenzhong = ['00', '10', '20', '30', '40', '50']

  //   return [MDarr, xiaoshi, fenzhong]
  // }

}

export {
  Utils
}