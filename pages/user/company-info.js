// pages/user/company-info.js
const App = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        detail:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.getdetail();
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


    //获取公司信息
    getdetail:function(){
        let _this = this,
        detail = _this.data.detail;
        App._get("customer/detail",{},function(res){
            _this.setData({
                detail:res.data
            })
        })
    },

    // 修改我的资料
    edit:function(e){
        // console.log(e.detail.value)
        let value = e.detail.value,
        _this = this,
        dataPrompt = _this.data.prompt,
        tel_regexp = /^1[3-9]\d{9}$/;
        if (value.address == '') {
            _this.setData({
                dataPrompt:'*请输入公司地址'
            })
            return;
        }else if (value.contact == '') {
            _this.setData({
                dataPrompt:'*请输入联系人'
            })
            return;
        }else if (value.mobile == '') {
            _this.setData({
                dataPrompt:'*请输入手机号码'
            })
            return;
        }else if (value.contact02 == '') {
            _this.setData({
                dataPrompt:'*请输入公司紧急联系人'
            })
            return;
        }else if (value.mobile02 == '') {
            _this.setData({
                dataPrompt:'*请输入公司紧急联系人手机号码'
            })
            return;
        }else if (!tel_regexp.test(value.mobile)) {
            _this.setData({
                dataPrompt:'*请输入正确的手机号码'
            })
            return;
        }else if(!tel_regexp.test(value.mobile02)){
            _this.setData({
                dataPrompt:'*请输入正确的公司紧急联系人手机号码'
            })
             return;
        }else{

            this.setData({
                dataPrompt:''
            })
        }


        wx.showModal({
          title: '提示',
          content: '确认修改吗？',
          success(res) {
            if (res.confirm) {
                App._post_form("customer/edit",e.detail.value,function(res){
                    if (res.code == 1) {
                        wx.showToast({
                          title: '修改成功',
                          icon: 'success',
                          duration: 2000,
                          mask:true,
                          success:function(){
                            wx.reLaunch({
                                url: '/pages/user/index'
                            })
                          }
                        })
                    }
                })
            } else if (res.cancel) {
                return false;
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