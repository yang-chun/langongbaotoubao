// pages/report/add.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_search:false,
        personnel_list:[],
        introductionLength:0,
        isInput:false
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

    toggle(type, show) {
        this.setData({
          [`show.${type}`]: show
        });
    },
    
    // 顶部弹框
    showTop() {
    this.toggle('top', true);
    },

    showPopup() {
        this.setData({ helpShow: true });
    },

    onClose() {
        this.setData({ helpShow: false });
      },

    /**
     * 顶部弹框执行完后执行 
     */
    showInput:function(){
        this.setData({
            isInput:true
        })
    },

    // 隐藏顶部弹框
    hideTop() {
        this.toggle('top', false);
    },


       // 获取人员列表
       getPersonnelList:function(e){
        let _this = this,
        keyword = e.detail.value.keyword;
        if (!keyword) {
            wx.showToast({
              title: '请输入搜索内容!',
              icon: 'none',
              duration: 1000
            })
            return;
        }
        _this.setData({
            is_search:true
        })
        App._get('employee/lists',{
            keywords:keyword
        },function(res){
            if (res.data.data.length>0) {
                _this.setData({
                    personnel_list:res.data.data
                })
                _this.showTop()
            }else{
                wx.showToast({
                  title: '未搜索到相关人员',
                  icon: 'none',
                  duration: 1500
                })
            }
            _this.setData({
                is_search:false
            })
        })
    },

    /**
     * 选择人员
     */
    choosePersonnel:function(e){
        let index = e.currentTarget.dataset.index, 
            personnel_list = this.data.personnel_list;
            this.setData({
                employee:personnel_list[index]
            })

            this.hideTop();
    },


    /**
     * 获取日期
     */
    bindDate:function(e) {
        let date = e.detail.value;
        console.log(date)
        this.setData({
            date:e.detail.value,
        })

    },
    inputs:function(event){
        this.setData({
            introductionLength: event.detail.value.length
        })
    },

    /**
     * 是否骨折
     */
    isFracture:function(e){
        this.setData({
            is_serious:e.detail.value
        })
    },

    /**
     * 工伤或意外
     */
    isInductrial:function(e){
        this.setData({
            type:e.detail.value
        })
    },

    /**
     * 提交数据
     */
    formSubmit(e) {
        let _this = this,
        formData = e.detail.value,
        tel_regexp = /^1[3-9]\d{9}$/;
        formData.type = _this.data.type;
        formData.is_serious = _this.data.is_serious;
        if(!formData.employee_id){
            _this.Toast("请选择出险人!")
            return;
        }
        if(!tel_regexp.test(formData.employee_phone)){
            _this.Toast("出险人电话号码有误!")
            return;
        }
        if(formData.reporter_phone){
            if(!tel_regexp.test(formData.reporter_phone)){
                _this.Toast("报案人电话电话号码有误!")
                return;
            }
        }
        if(!formData.case_date){
            _this.Toast("请选择出险日期")
            return;
        }
        if(!formData.case_address){
            _this.Toast("请输入出险地点!")
            return;
        }
        if(!formData.is_serious){
            _this.Toast("请选择是否骨折或更严重伤情!")
            return;
        }
        if(!formData.type){
            _this.Toast("请选择事故类型!")
            return;
        }
        if(!formData.case_desc){
            _this.Toast("请输入详细事故经过!")
            return;
        }
        
        App._post_form('report/add',formData,function(res){
            wx.showToast({
                title: '新增成功!',
                icon: 'success',
                duration: 2000,
                mask:true,
                success:function(){
                    wx.navigateTo({
                        url:"/pages/report/index"
                    })
                }
              })
        })

    },
    /**
     * 弹框
     */
    Toast:function(title){
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 1500
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