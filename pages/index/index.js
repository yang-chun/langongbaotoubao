//index.js
//获取应用实例
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: 1,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    isDistribution: false,
    list:[{
      user_id:1
    }],
    words:'',
    notice:{'content':''}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.customer_panel();
    _this.getWords();
    _this.getNotice();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(wx.getStorageSync("words"))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 获取菜单列表
  getWords() {
      let _this = this;
      App.getWords(function (res) {
          _this.setData({
              words: res
          })
      })
  },

  //跳转登录
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  // 导航切换
  nav: function (e) {
    let _this = this;
    let nav = e.currentTarget.dataset.nav;
    this.setData({
      nav
    });
  },

  tool:function (e){
    let _this = this,
        tool = e.currentTarget.dataset.index,
        url = '';
      switch (tool) {
        case '1':
          url = "insurance-policy";
          break;
        case '2':
          url = "record";
          break;
        case '3':
          url = "add-insurance";
          break;
        case '4':
          url = "reduce-insurance";
          break;
        case '5':
          url = "report";
          break;
        case '6':
          url = "staff-query";
          break;
        case '7':
          url = "work-company";
          break;
        case '8':

          break;
      }
      wx.navigateTo({
        url: '/pages/'+url+'/index'
      })
  },


  // 获取工作台数据
  customer_panel:function(){
    let _this = this,
    list = _this.data.list;
    App._get('customer/panel',{},function(res){
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        _this.setData({
          list:res.data
        })
    })
  },


// 拨打电话
  callem:function(e){
    let mobile = e.currentTarget.dataset.mobile;
    if (mobile){
      mobile = mobile
    }else{
      return false;
    }
    let _this = this;
    wx.makePhoneCall({
      phoneNumber: mobile
    })
  },
  /**
   * 通知跳转 
   */
  jump: function(e){
      let url = e.currentTarget.dataset.url;
      App.navigationTo(url);
  },
    
  /**
   * 充值跳转
   */
  topUp:function(){
    wx.navigateTo({
      url: '/pages/topUp/index'
    })
  },

  /**
   * 获取通知栏信息
   */
  getNotice:function(){
    let _this = this;
    App._get('customer/notice',{},function(res){
      _this.setData({
        notice:res.data
      })

    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let _this = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    _this.customer_panel();
    _this.getNotice();
  },
})