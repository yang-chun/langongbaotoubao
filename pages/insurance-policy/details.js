// pages/insurance-policy/details.js
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
    details: [],
    list: [],
    policy_id: '',
    words: '',
    active: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this,
      policy_id = _this.data.policy_id;
    _this.getdetails(options.policy_id);
    _this.getpolicy_change_lists(options.policy_id);
    _this.title();
    _this.getWords();
    _this.setData({
      policy_id: options.policy_id
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

  // 获取title
  title() {
    wx.setNavigationBarTitle({
      title: '保单详情'
    })
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

  // 获取保单详情
  getdetails: function (policy_id) {
    let _this = this;
    App._get("policy/detail", {
      policy_id: policy_id
    }, function (res) {
      _this.setData({
        details: res.data
      })
    })
  },

  //获取加减保记录列表
  getpolicy_change_lists: function (policy_id, isPage, page) {
    let _this = this;
    App._get("policy_change/lists", {
      page: page || 1,
      policy_id: policy_id
    }, function (result) {
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

  /*跳转到详情页*/

  details: function (e) {
    let _this = this,
      policy_change_id = e.currentTarget.dataset.policy_change_id;
    wx.navigateTo({
      url: '/pages/record/details?policy_change_id=' + policy_change_id
    })
  },

  // 滚动事件
  onPageScroll: function (t) {
    let _this = this;
    _this.setData({
      scrollTop: t.scrollTop
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
  onReachBottom: function (e) {
    let policy_id = this.data.policy_id;
    // 已经是最后一页
    this.setData({
      isLoading: true,
    });
    if (this.data.len == this.data.total) {
      return false;
    }
    this.getpolicy_change_lists(policy_id, true, ++this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onClickDisabled(event) {
    console.log(1)
  }
})