// pages/login/index.js
let App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    binding:function(e){

        let user_name = e.detail.value.user_name,
        password = e.detail.value.password;
        if (user_name) {}
        console.log(user_name)
        App._post_form("customer/bind",{
            user_name:user_name,
            password:password
        },function(res){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: '绑定成功',
          success (res) {
            if (res.confirm) {
                wx.switchTab({
                  url: '/pages/index/index'
                })
            }
          }
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