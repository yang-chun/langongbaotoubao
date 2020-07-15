// pages/topUp/index.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        account_number:'',
        company_name:'',
        info:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecharge();
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
     * 4位添加一个空格
     */
    toThousands:function(num) {
        return num.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    },

    /**
     * 复制内容
     */
    copy:function(e){
        let content = e.currentTarget.dataset.content;
        wx.setClipboardData({
            data: content,
            success (res) {
              wx.getClipboardData({
                success (res) {
                    
                }
              })
            }
        })
    },

    /**
     * 获取充值汇款信息
     */
    getRecharge:function(){
        let _this = this;
        App._get('funds/recharge',{},function(res){
                if(res.data.fund_account.length > 0){
                    let account_number = _this.toThousands(res.data.fund_account.account_number );
                    res.data.fund_account.account_number = account_number;
                }
                _this.setData({
                    info:res.data.fund_account,
                    company_name:res.data.company_name
                })                
        })
    }

})