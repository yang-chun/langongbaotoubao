// pages/renewal/index.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        plan:[],
        date:'',
        planValue:'',
        planList:[],
        planValue:'',
        list:[],
        is_LastMonth:1,
        words: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.getlistsForOnekey();
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
    // 获取菜单列表
    getWords() {
        let _this = this;
        App.getWords(function (res) {
            _this.setData({
                words: res
            })
        })
    },

    // 获取title
    title() {
        let _this = this,
            title = _this.data.words.A5;
        wx.setNavigationBarTitle({
            title: title
        })
    },
    // 选择保单
    bindplan:function(e){
        let _this = this,
        planList = _this.data.planList,
        plan = _this.data.plan;

        _this.setData({
            planValue: plan[e.detail.value],
            list:planList[e.detail.value]
        })

    },

    //是否使用上月在保人员
    radioChange:function(e){
        let _this = this,
        is_LastMonth = _this.data.is_LastMonth;

        _this.setData({
            is_LastMonth:e.detail.value
        })

    },

    // 获取保单列表
    getlistsForOnekey:function(){
        let _this = this,
        plan = [];
        wx.showLoading({
          title: '加载中',
          mask:true
        })
        App._get("policy/listsForOnekey",{},function(res){
            // console.log(res)
            res.data.forEach(function(item,index){
                plan.push("方案"+item.type+'('+item.month+')')
            })
            _this.setData({
                plan:plan,
                planList:res.data
            })
            wx.hideLoading()
        },function(){
            wx.hideLoading()
        })
    },

    // 提交表单
    confirm:function(){
        // console.log('提交信息')
        let _this = this,
        list = _this.data.list,
        is_LastMonth = _this.data.is_LastMonth;
        App._post_form("policy/onekey",{
            policy_id:list.policy_id,
            is_inherit:is_LastMonth
        },function(res){
            console.log(res)
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