// pages/user/index.js
const App = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    my:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.getmy();
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

  //获取用户信息

  getmy:function(){
    let _this = this,
    my = _this.data.my;
    App._get("customer/my",{},function(res){
      _this.setData({
        my:res.data
      })
    })
  },

  unbundling:function(){

    wx.showModal({
      title: '提示',
      content: '是否确认解绑？',
      success (res) {
        if (res.confirm) {
          App._post_form('customer/unbind',{},function(res){
            wx.showToast({
              title: '解绑成功！',
              icon: 'success',
              duration: 1500,
              success:function() {
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
            })
          })
        }
      }
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