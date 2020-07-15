// pages/evaluation/index.js
const App = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expression:'',
        parameter:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            parameter:options.parameter
        })
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

    //选择表情
    expression:function(e){
        this.setData({
            expression:e.currentTarget.dataset.index
        })
    },

    //提交
    formsubmit:function(e){
        let _this = this,
        expression = _this.data.expression,
        advice = e.detail.value.advice;
        App._post_form('feedback/add',{
            rank:expression,
            content:advice
        },function(res){
            wx.reLaunch({
                url: '/pages/index/index'
            })
        })
    },

    //完成
    complete:function(){
        wx.reLaunch({
          url: '/pages/index/index'
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