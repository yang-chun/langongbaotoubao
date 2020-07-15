// pages/add-insurance/index.js
var util = require("../../utils/util.js");
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
        planinfo:{},
        words: ''
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
        let _this = this;
        _this.getActiveLists();
        _this.getWords();
        _this.title();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    // 获取title
    title() {
        let _this = this,
            title = _this.data.words.A4;
        wx.setNavigationBarTitle({
            title: title
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
    // 获取日期
    bindDate:function(e) {
        let _this = this,
        date = _this.data.date;
        _this.setData({
            date:e.detail.value,
            remind: ""
        })

    },

    //获取有效期内列表
    getActiveLists:function(){
        let _this = this,
        plan = _this.data.plan,
        planList = _this.data.planList;
        App._get("policy/activeLists",{},function(res){
            res.data.forEach(function(item,index){
                plan.push(item.plan+'('+item.month+')')
            })
            _this.setData({
                plan:plan,
                planList:res.data
            })
        })
    },

    // 选择保单
    bindplan:function(e){
        let _this = this,
        value = e.detail.value,
        planList = _this.data.planList,
        plan = _this.data.plan,
        policy_id = _this.data.policy_id,
        type = _this.data.type,
        month = _this.data.month,
        planValue = _this.data.planValue;
        _this.setData({
            planValue:plan[value],
            policy_id:planList[value].policy_id,
            type:planList[value].plan,
            month:planList[value].month,
            date_from:planList[value].date_from,
            date_to:planList[value].date_to
        })
        _this.setData({
            remind: ""
        })
    },

    confirm:function(e){
        let _this = this,
        date = e.detail.value.date,
        plan = e.detail.value.plan,
        policy_id = _this.data.policy_id,
        type = _this.data.type,
        month = _this.data.month,
        words = _this.data.words.C1;
        if (!plan) {
            _this.setData({
                remind: "*请" + words + "！"
            })
            return false;
        }else if(!date){
            _this.setData({
                remind: "*请选择生效时间！"
            })
            return false;
        }else{
            _this.setData({
                remind: ""
            })
        }
        wx.navigateTo({
            url:"/pages/reduce-insurance/reduce?date="+date+"&policy_id="+policy_id+"&type="+type+"&month="+month
        })

    }
})