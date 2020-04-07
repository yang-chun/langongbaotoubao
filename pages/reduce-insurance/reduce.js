// pages/add-insurance/index.js
const App = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        none:0,
        date:'',
        policy_id:'',
        type:'',
        month:'',
        top: false,
        remind:'',
        is_there:true,
        name:'',
        idcard:'',
        work_company:'',
        getCompany:[],
        isfocus:false,
        can_submit:true,
        list:[],
        form_list:{
            start_date:'',
            policy_id:'',
            persons:[]
        },
        keyword:'',
        personnel_list:[], //搜索结果列表
        sum:0,
        words: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this,
        date = _this.data.date,
        policy_id = _this.data.policy_id,
        type = _this.data.type,
        month = _this.data.month,
        getCompany = _this.data.getCompany;
        _this.getWords();
        _this.title();
        _this.setData({
            date:options.date,
            policy_id:options.policy_id,
            type:options.type,
            month:options.month
        })
        wx.getStorage({
            key:'data',
            success (res) {
                _this.setData({
                    getCompany:res.data.work_company
                })
                // console.log('初始数据  '+res.data.work_company)
            }
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

    toggle(type, show) {
        this.setData({
          [`show.${type}`]: show
        });
    },
    
    // 顶部弹框
    showTop() {
    this.toggle('top', true);
    },

    // 隐藏顶部弹框
    hideTop() {
        this.toggle('top', false);
    },


    // 获取人员列表
    getPersonnelList:function(e){
        let _this = this,
        keyword = e.detail.value.keyword,
        policy_id = _this.data.policy_id;
        wx.showLoading({
          title: '加载中',
        })
        if (!keyword) {
            wx.showToast({
              title: '请输入搜索内容!',
              icon: 'none',
              duration: 1000
            })
            return;
        }
        App._get('/employee/listsForOff',{
            keywords:keyword,
            policy_id:policy_id
        },function(res){
            if (res.data.length>0) {
                _this.setData({
                    personnel_list:res.data
                })
                _this.showTop()
            }else{
                wx.showToast({
                  title: '未搜索到相关人员',
                  icon: 'none',
                  duration: 1000
                })
            }
            wx.hideLoading()
        })
    },

    // 选择人员
    choosePersonnel:function(e){
        let _this = this,
            // name = e.detail.value.name,
            // idcard = e.detail.value.idcard,
            // work_company = e.detail.value.work_company,
            index = e.currentTarget.dataset.index,
            personnel_list = _this.data.personnel_list[index],
            list = _this.data.list,
            formList = _this.data.formList,
            getCompany = _this.data.getCompany;
        _this.setData({
            remind: ""
        })
        list.forEach(function(item,index){
            item.persons.forEach(function(perItem,idx){
                // console.log(perItem.idcard)
                if (perItem.idcard == personnel_list.idcard) {
                   _this.setData({
                        remind: "*当前人员已在“"+perItem.work_company+"”中！"
                    })
                }

            })
            if (_this.data.remind) {
                return;
            }
            if (item.work_company == personnel_list.work_company) {
                item.persons.unshift(personnel_list)
                _this.setData({
                    is_there:false,
                })
            }
        })

        if (_this.data.remind) {
            return;
        }

        if (_this.data.is_there) {
            list.unshift({work_company:personnel_list.work_company,persons:[personnel_list]})
        }else{
            _this.setData({
                is_there:true,
            })
        }

        _this.setData({
            list:list,
            personnel_list:[],
            isfocus:false,
            sum:_this.data.sum+1,
            can_submit:true,
            keyword:''
        })
        _this.hideTop();
    },

    // 在list删除人员
    delete:function(e){
        let _this = this,
        index = e.currentTarget.dataset.index,
        idx = e.currentTarget.dataset.idx,
        list = _this.data.list;

        // return;
        wx.showModal({
          title: '提示',
          content: '确定删除吗！',
          success(res) {
            if (res.confirm) {
                list[index]['persons'].splice(idx, 1)
         
                if (list[index]['persons'].length == 0) {
                    list.splice(index, 1)
                }
                _this.setData({
                    list:list,
                    sum:_this.data.sum-1,
                    can_submit:_this.data.sum-1>0?true:false
                })
            } else if (res.cancel) {
                return false;
            }
          }
        })
    },
    // 显示派遣单位列表
    company_show:function(){
        // console.log(1)
        let _this = this;
        _this.setData({
            isfocus:true
        })
    },

    // 隐藏派遣单位列表
    company_hide:function(){
        let _this = this;
        _this.setData({
            isfocus:false
        })
    },


    // 提交数据
    form_list:function(){
        let _this = this,
        list = _this.data.list,
        persons = [],
        form_list = _this.data.form_list,
        date = _this.data.date,
        can_submit = _this.data.can_submit,
        policy_id = _this.data.policy_id;


        if (!can_submit) {
            return false;
        }


        wx.showModal({
          title: '提示',
          content: '确定提交吗！',
          success(res) {
            if (res.confirm) {
                wx.showLoading({
                  title: '加载中',
                })

                list.forEach(function(item,index){
                    item.persons.forEach(function(formItem,formIndex){
                        persons.push(formItem)
                    })
                })
                persons = JSON.stringify(persons);
                _this.setData({
                    can_submit:false
                })
                App._post_form("policy_change/off",{
                    policy_id:policy_id,
                    start_date:date,
                    persons:persons
                },function(res){
                    _this.setData({
                        list:[],
                        can_submit:false,
                        sum:0
                    })
                    wx.hideLoading()
                    wx.navigateTo({
                        url:'/pages/evaluation/index'
                    })
                },function(e){
                    _this.setData({
                        can_submit:true
                    })
                    wx.hideLoading()
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