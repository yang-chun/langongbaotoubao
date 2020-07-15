// pages/report/details.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        case_money:'0.00',
        policy:{},
        trace: []
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let _this = this,
          report_id = options.report_id;
      _this.getDetails(report_id);
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 获取案件详情
     */
    getDetails:function(report_id){
      let _this = this;
      App._get('report/detail',{
        report_id:report_id
      },function(res){
        let trace = [];
        res.data.trace.forEach((item, index) => {
          trace.push({text:item.trace_desc,desc:item.trace_date});
        });
        
        _this.setData({
          case_money:res.data.case_money,
          policy:res.data.policy,
          trace:trace,
          info:res.data
        })
      })
    }
})