// pages/user/index.js
const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    words:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this,
    policy_change_id = options.policy_change_id;
    _this.getDetail(policy_change_id)
    _this.getWords();
    _this.title();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // 获取title
  title() {
      let _this = this,
          title = _this.data.words.C10;
      wx.setNavigationBarTitle({
          title: title
      })
  },

  // 获取菜单列表
  getWords(){
    let _this = this;
    App.getWords(function(res){
      _this.setData({
        words:res
      })
    })
  },
  personnel:function(e){
    let _this = this,
    policy_change_id = e.currentTarget.dataset.policy_change_id,
    work_company = e.currentTarget.dataset.work_company;
    wx.navigateTo({
        url:'personnel?policy_change_id='+policy_change_id+'&work_company='+work_company
    })
  },

  // 获取详情信息
  getDetail:function(id){
    let _this = this,
    list = _this.data.list;
    App._get("policy_change/detail",{
      policy_change_id:id
    },function(res){
      // console.log(res.data)
      _this.setData({
        list:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})