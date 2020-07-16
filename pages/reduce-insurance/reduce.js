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
        can_submit:false,
        list:[],
        form_list:{
            start_date:'',
            policy_id:'',
            persons:[]
        },
        keyword:'',
        personnel_list:[], //搜索结果列表
        sum:0,
        words: '',
        is_search:false,
        isInput:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.getWords();
        _this.title();
        _this.setData({
            date:options.date,
            policy_id:options.policy_id,
            type:options.type,
            month:options.month
        })
        _this.getList();
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
     * 获取title
     */
    title() {
        let _this = this,
            title = _this.data.words.A4;
        wx.setNavigationBarTitle({
            title: title
        })
    },

    /**
     * 获取菜单列表
     */
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
    
    /**
     * 顶部弹框执行完后执行 
     */
    showInput:function(){
        this.setData({
            isInput:true
        })
    },

    /**
     * 顶部弹框
     */
    showTop() {
        let _this = this,
            policy_id = _this.data.policy_id,
            list = _this.data.list;
        this.toggle('top', true);
        App._get('/employee/listsForOff',{
            keywords:'',
            policy_id:policy_id
        },function(res){
                let data = [],
                personList = [];
                if(list.length > 0){
                    // 获取已选择列表身份证号码
                    list.forEach(function(listItem,listIndex){
                        listItem.persons.forEach(function(personsItem,personsIndex){
                            personList.push(personsItem.idcard)
                        })
                    })
                    // 判断是否存在
                    res.data.forEach(function(dataItem,dataIndex){
                        if(personList.indexOf(dataItem.idcard) >= 0){
                            dataItem.status = true;
                        }else{
                            dataItem.status = false;
                        }
                        data.push(dataItem)
                    })
                }else{
                    res.data.forEach(function(dataItem,dataIndex){
                        dataItem.status = false;
                        data.push(dataItem)
                    })
                }
                _this.setData({
                    personnel_list:data
                })
        })
    },

    /**
     * 隐藏顶部弹框
     */
    hideTop() {
        this.toggle('top', false);
        this.setData({
            keyword:''
        })
    },


    /**
     * 获取人员列表
     */
    getPersonnelList:function(e){
        let _this = this,
        keyword = e.detail.value.keyword,
        policy_id = _this.data.policy_id,
        list = _this.data.list;

        _this.setData({
            is_search:true
        })
        App._get('/employee/listsForOff',{
            keywords:keyword,
            policy_id:policy_id
        },function(res){
            if (res.data.length>0) {
                let data = [],
                personList = [];
                if(list.length > 0){
                    // 获取已选择列表身份证号码
                    list.forEach(function(listItem,listIndex){
                        listItem.persons.forEach(function(personsItem,personsIndex){
                            personList.push(personsItem.idcard)
                        })
                    })
                    // 判断是否存在
                    res.data.forEach(function(dataItem,dataIndex){
                        if(personList.indexOf(dataItem.idcard) >= 0){
                            dataItem.status = true;
                        }else{
                            dataItem.status = false;
                        }
                        data.push(dataItem)
                    })
                }else{
                    res.data.forEach(function(dataItem,dataIndex){
                        dataItem.status = false;
                        data.push(dataItem)
                    })
                }
                _this.setData({
                    personnel_list:data
                })
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
        let _this = this,
            index = e.currentTarget.dataset.index,
            personnel = _this.data.personnel_list[index],
            personnel_list = _this.data.personnel_list,
            list = _this.data.list;
            personnel_list[index].status = !personnel.status;
            if(personnel.status){
                //选中
                _this.data.sum++;
                list.forEach(function(item,index){
                    if (item.work_company == personnel.work_company) {
                        item.persons.unshift(personnel)
                        _this.setData({
                            is_there:false,
                        })
                    }
                })
                if (_this.data.is_there) {
                    list.unshift({work_company:personnel.work_company,persons:[personnel]})
                }else{
                    _this.setData({
                        is_there:true,
                    })
                }
                //设置缓存
                _this.setList(list,_this.data.sum,_this.data.sum>0?true:false)
            }else{
                //取消选中
                _this.data.sum--;
                list.forEach(function(ListItem,listIndex){
                        ListItem.persons.forEach(function(personsItem,personsIndex){
                            if(personnel_list[index]['idcard'] == personsItem.idcard){
                                list[listIndex]['persons'].splice(personsIndex, 1)
                                if (list[listIndex]['persons'].length == 0) {
                                    list.splice(listIndex, 1)
                                }
                            }
                        })
                })
                _this.setList(list,_this.data.sum,_this.data.sum>0?true:false)
            }
        _this.setData({
            list:list,
            isfocus:false,
            sum:_this.data.sum,
            can_submit:_this.data.sum>0?true:false,
            personnel_list:personnel_list
        })
    },

    /**
     * 滚动到底部
     */
    // pageScrollToBottom: function() {
    //     wx.createSelectorQuery().select('#j_page').boundingClientRect(function(rect) {
    //       if (rect){
    //         wx.pageScrollTo({
    //            scrollTop: rect.height
    //         })
    //       }
    //     }).exec()
    // },

    /**
     * 在list删除人员
     */
    delete:function(e){
        let _this = this,
        index = e.currentTarget.dataset.index,
        idx = e.currentTarget.dataset.idx,
        list = _this.data.list;

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
                _this.setList(list,_this.data.sum,_this.data.sum>0?true:false)
            } else if (res.cancel) {
                return false;
            }
          }
        })
    },

    /**
     * 显示派遣单位列表
     */
    company_show:function(){
        // console.log(1)
        let _this = this;
        _this.setData({
            isfocus:true
        })
    },

    /**
     * 隐藏派遣单位列表
     */
    company_hide:function(){
        let _this = this;
        _this.setData({
            isfocus:false
        })
    },

    /**
     * 提交数据
     */
    form_list:function(){
        let _this = this,
        list = _this.data.list,
        persons = [],
        date = _this.data.date,
        can_submit = _this.data.can_submit,
        policy_id = _this.data.policy_id;
        if (!can_submit)return false;

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
                        persons.unshift(formItem)
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
                    //清空list缓存
                    _this.setList();
                    
                    wx.hideLoading();
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
     * 设置list缓存
     */
    setList(list=[],sum=0,can_submit=false){
        wx.setStorage({
            key:"addList",
            data:{
                list:list,
                sum:sum, 
                can_submit:can_submit,
            }
        })
    },

    /**
     * 获取缓存list 列表
     */
    getList(){
        let _this = this;
        wx.getStorage({
            key: 'addList',
            success(res){
                _this.setData({
                    list:res.data.list?res.data.list:[],
                    sum:res.data.sum?res.data.sum:0,
                    can_submit:res.data.can_submit?res.data.can_submit:false
                })
            }
        })
    },
})