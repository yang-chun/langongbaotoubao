// pages/work-company/add.js
let App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        formData: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            formData: {
                name: '',
              image_list: [],
              uploaded: []
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
     * 选择视频
     */
    chooseVideo: function (e) {
        let _this = this,
        imageList = _this.data.formData.image_list;

        // 选择视频
        wx.chooseVideo({
            sourceType: ['album','camera'],
            maxDuration: 60,
            camera: 'back',
            success(res) {
                _this.setData({
                    ['formData.image_list']: imageList.concat(res.tempFilePath)
                });
            }
        })

    },

    /**
     * 删除图片
     */
    deleteImage: function (e) {
        let dataset = e.currentTarget.dataset,
        image_list = this.data.formData.image_list;
        image_list.splice(dataset.imageIndex, 1);
        this.setData({
            ['formData.image_list']: image_list
        });
    },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    let _this = this,
      formData = _this.data.formData;
    this.setData({
      ['formData.name']: e.detail.value.name,
    });

    // 判断是否重复提交
    if (_this.submitDisable === true) {
      return false;
    }

    // 表单提交按钮设为禁用 (防止重复提交)
    _this.submitDisable = true;

    wx.showLoading({
      title: '正在处理...',
      mask: true
    });

    // form提交执行函数
    let fromPostCall = function (formData) {

      App._post_form('work_company/add', {
        formData: JSON.stringify(formData)
      }, function (result) {
        if (result.code === 1) {
          wx.showModal({
            title: '提示',
            content: result.msg,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/work-company/index'
                })
              }
            }
          });
        } else {
          App.showError(result.msg);
        }
      },
        false,
        function () {
          wx.hideLoading();
          _this.submitDisable = false;
        });
    };

    // 统计图片数量
    let imagesLength = formData.image_list.length;

    if (imagesLength > 0 || e.detail.value.name) {
      // 判断是否需要上传图片
      imagesLength > 0 ? _this.uploadFile(imagesLength, formData, fromPostCall) : fromPostCall(formData);
    } else {
      wx.showToast({
        title: "没有任何信息!",
        icon: "none",
        duration: 1000
      });
      _this.submitDisable = false;
    }
  },

  /**
   * 上传图片
   */
  uploadFile: function (imagesLength, formData, callBack) {
    // POST 参数
    let params = {
      wxapp_id: App.siteInfo.uniacid,
      token: wx.getStorageSync('token')
    };
    // 文件上传
    let i = 0;
    formData.image_list.forEach(function (filePath, fileKey) {
      wx.uploadFile({
        url: App.api_root + 'upload/video',
        filePath: filePath,
        name: 'iFile',
        formData: params,
        success: function (res) {
          let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
          if (result.code === 1) {
            formData.uploaded[fileKey] = result.data.file_id;
          }
        },
        complete: function () {
          i++;
          if (imagesLength === i) {
            // 所有文件上传完成
            // 执行回调函数
            callBack && callBack(formData);
          }
        }
      });
    });
  }
})