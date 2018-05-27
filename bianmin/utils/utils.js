
class Utils {
  constructor() { }

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

  // -------------------------- 处理换行符号 --------------------------

}

export { Utils }