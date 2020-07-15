// pages/report/index.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data:'',
        list:[],
        page: 1, // 当前页码
        len: '',
        no_more: false, // 没有更多数据
        isLoading: false, // 是否正在加载中
    },

    // 获取title
    title() {
        let _this = this,
            title = _this.data.words.A7;
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.getPanel();
        _this.getList();
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
        let _this = this;
        wx.showNavigationBarLoading() //在标题栏中显示加载
        _this.getPanel();
        _this.getList();
        _this.setData({
            page: 1, // 当前页码
            len: '',
            no_more: false, // 没有更多数据
            isLoading: false, // 是否正在加载中
        })
      },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 已经是最后一页
        if (this.data.len == this.data.total) {
          return false;
        }
        this.setData({
            isLoading: true,
        });
        this.getList(true, ++this.data.page);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 跳转详情
     */
    details:function(e){
        let report_id = e.currentTarget.dataset.report_id;
        wx.navigateTo({
            url:"/pages/report/details?report_id="+report_id
        })
    },
    /**
     * 跳转理赔流程
     */
    claimsProcess:function(){
        wx.navigateTo({
            url:"/pages/report/claimsProcess"
        })
    },
    /**
     * 跳转新增报案
     */
    addReport:function(){
        wx.navigateTo({
          url: '/pages/report/add'
        })
    },
    /**
     * 获取头部数据
     */
    getPanel:function(){
        let _this = this;
        App._get('report/panel',{},function(res){
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
            _this.setData({
                data:res.data
            })
        })
    },
    /**
     * 获取报案列表
     */
    getList:function(isPage,page){
        let _this = this;
        _this.setData({
            isLoading: true
        });
        App._get('report/lists',{
            page: page || 1
        },function(res){
           
            let resList = res.data,
            dataList = _this.data.list;
            if (isPage == true) {
                if (resList.data == '') {
                  _this.setData({
                    no_more: true,
                  });
                }
                _this.setData({
                  list: dataList.concat(resList.data),
                  isLoading: false,
                  len: dataList.concat(resList.data).length
                });
            } else {
                _this.setData({
                  list: resList.data,
                  isLoading: false,
                  total: resList.total,
                  len: resList.data.length
                });
            }
        })
    }
})