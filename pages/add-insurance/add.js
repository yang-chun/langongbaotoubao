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
        plan:'',
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
        isInput:false,
        sum:0,
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this,
        date = _this.data.date,
        policy_id = _this.data.policy_id,
        plan = _this.data.plan,
        month = _this.data.month,
        getCompany = _this.data.getCompany;
        _this.getWords();
        _this.title();
        _this.setData({
            date:options.date,
            policy_id:options.policy_id,
            plan:options.plan,
            month:options.month
        })
        wx.getStorage({
            key:'data',
            success (res) {
                _this.setData({
                    getCompany:res.data.work_company
                })
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
    
    /**
     * 顶部弹框执行完后执行 
     */
    showInput:function(){
        this.setData({
            isInput:true
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
    
    // 获取title
    title() {
        let _this = this,
        title = _this.data.words.A3;
        wx.setNavigationBarTitle({
            title: title
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

    // 添加加保名
    addlist:function(e){
        let _this = this,
            name = e.detail.value.name,
            idcard = e.detail.value.idcard,
            work_company = e.detail.value.work_company,
            list = _this.data.list,
            formList = _this.data.formList,
            getCompany = _this.data.getCompany,
            myreg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

        if (!name) {
            _this.setData({
                remind: "*请输入保人姓名！"
            })
            return;
        }else if(!idcard){
            this.setData({
                remind: "*请输入保人身份证号！"
            })
            return;
        }else if(!myreg.test(idcard)){
            _this.setData({
                remind: "*请输入正确的身份证号！"
            })
            return false; 
        }else if (!work_company) {
            _this.setData({
                remind: "*请输入被派遣单位全称！"
            })
            return;
        }else{
            _this.setData({
                remind: ""
            })
        }


        list.forEach(function(item,index){
            item.persons.forEach(function(perItem,idx){
                if (perItem.idcard == idcard) {
                    _this.setData({
                        remind: "*当前人员已在“"+perItem.work_company+"”中！"
                    })
                }
            })
            if (_this.data.remind) {
                return;
            }
            if (item.work_company == work_company) {
                item.persons.unshift({name:name,idcard:idcard,work_company:work_company})
                _this.setData({
                    is_there:false,
                })
            }
        })

        if (_this.data.remind) {
            return;
        }

        if (_this.data.is_there) {
            list.unshift({work_company:work_company,persons:[{name:name,idcard:idcard,work_company:work_company}]})
        }else{
            _this.setData({
                is_there:true,
            })
        }

        // 添加派遣单位列表
        if (getCompany.length > 0) {
            if (getCompany.indexOf(work_company) >= 0) {
                getCompany.splice(getCompany.indexOf(work_company),1)
                getCompany.unshift(work_company)
            }else{
                getCompany.unshift(work_company)
            }
            getCompany.splice(5)
        }else{
            getCompany.unshift(work_company)
        }
        
        // 存入缓存
        wx.setStorage({
            key:"data",
            data:{
                work_company:getCompany
            }
        })
        _this.setData({
            name:'',
            idcard:'',
            work_company:'',
            list:list,
            sum:_this.data.sum+1, 
            can_submit:true,
            isfocus:false,
            getCompany:getCompany
        })
        _this.hideTop();
    },

    // 删除人员
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

    // 选择派遣单位
    choose_company:function(e){
        let _this = this,
        work_company = _this.data.work_company;
        // return;
        this.setData({
            work_company:e.currentTarget.dataset.work_company,
            isfocus:false
        })
    },

    company_input:function(){
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
                        persons.unshift(formItem)
                    })
                })
                persons = JSON.stringify(persons);
                _this.setData({
                    can_submit:false
                })
                App._post_form("policy_change/add",{
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
                        url:'/pages/evaluation/index?parameter=1'
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

    // 删除缓存中派遣单位
    delete_company:function(e){
        let _this = this,
        index = e.currentTarget.dataset.index,
        getCompany = _this.data.getCompany;
        getCompany.splice(index,1)
        _this.setData({
            getCompany:getCompany
        })

        wx.setStorage({
            key:"data",
            data:{
                work_company:getCompany
            }
        })
    },
    /**
     * 选择身份证图片
     */
    chooseImage: function (e) {
        let _this = this;
            // POST 参数
        let params = {
            wxapp_id: App.siteInfo.uniacid,
            token: wx.getStorageSync('token')
        };
        _this.setData({
            name:'',
            idcard:''
        })
        // 选择图片
        wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            wx.showLoading({
                title: '正在识别',
                mask:true
            })
            wx.uploadFile({
                url: App.api_root + 'employee/ocr',
                filePath: res.tempFilePaths[0],
                name: 'iFile',
                formData: params,
                success: function (res) {
                    wx.hideLoading()
                    let result = JSON.parse(res.data);
                    if(result.code == 1){
                        _this.setData({
                            name:result.data.name,
                            idcard:result.data.idcard
                        })
                    }else{
                        wx.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000
                          })
                    }
                },complete: function (res) {
                    
                }
            });
        }
        });
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