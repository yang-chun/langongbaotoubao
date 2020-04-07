// pages/staff-query/details.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info:{
        	is_active:1
        },
        words: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this,
        employee_id = options.employee_id;
        _this.detail(employee_id)
        _this.getWords();
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
    // 获取菜单列表
    getWords() {
        let _this = this;
        App.getWords(function (res) {
            _this.setData({
                words: res
            })
        })
    },
    //获取人员信息详情
    detail:function(employee_id){
        let _this = this;
        wx.showLoading({
          title: '加载中',
          mask:true
        })
        App._get('employee/detail',{
            employee_id:employee_id
        },function(res){
            _this.setData({
                info:res.data
            })
            wx.hideLoading();
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