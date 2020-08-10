// pages/work-company/index.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
        video_url:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLists();
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

    showPopup(e) {
        let index = e.currentTarget.dataset.index,
            file_name = this.data.list[index]['file_name'],
            file_url = this.data.list[index]['file_url'];
        this.setData({ 
            helpShow: true,
            video_url:file_url+'/'+file_name
        });
    },

    onClose() {
        this.setData({ helpShow: false });
    },

    /**
     * 跳转新增被派遣单位页面
     */
    addWorkCompany(){
        wx.navigateTo({
            url: '/pages/work-company/add'
          })
    },

    /**
     * 获取被派遣单位列表
     */
    getLists:function(){
        let _this = this;
        App._get('work_company/lists',{},function(res){
            _this.setData({
                list:res.data
            })
        })
    },

    /**
     * 删除被派遣单位
     */

    deleteCompany:function(e){
        let _this = this,
            company_id = e.currentTarget.dataset.company_id,
            index = e.currentTarget.dataset.index,
            list = this.data.list;
        wx.showModal({
            title: '提示',
            content: '确定删除吗！',
            success(res) {
              if (res.confirm) {
                App._post_form('work_company/delete',{
                    company_id:company_id
                },function(res){
                    wx.showToast({
                        title: '删除成功!',
                        icon: 'success',
                        duration: 1500,
                        mask:true,
                        success:function(){
                            list.splice(index, 1)
                            _this.setData({
                              'list': list
                            })
                        }
                    })
                })
              } else if (res.cancel) {
                  return false;
              }
            }
          })

    }
})