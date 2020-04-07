// pages/record/index.js
const App = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1, // 当前页码
        len: '',
        no_more: false, // 没有更多数据
        isLoading: true, // 是否正在加载中
        details:[],
        list:[],
        words:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.getpolicy_change_lists();
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
            title = _this.data.words.A2;
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
    
    /*跳转到详情页*/
    details:function(e){
        let _this = this,
            policy_change_id = e.currentTarget.dataset.policy_change_id;    
            wx.navigateTo({
                url:'details?policy_change_id='+policy_change_id
            })
    },

    //获取加减保记录列表
    getpolicy_change_lists:function(isPage,page){
        let _this = this;
        App._get("policy_change/lists",{
            page: page || 1
        },function(result){
            let resList = result.data,
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
        // 已经是最后一页
        if (this.data.len == this.data.total) {
          return false;
        }
        this.setData({
            isLoading: true,
        });
        this.getpolicy_change_lists(true, ++this.data.page);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})