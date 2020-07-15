// pages/needMaterial/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    /**
     * 浏览工作图片
     */
    previewImages: function(e) {
        let idx = e.currentTarget.dataset.idx-1,
            imageUrls = [
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-1.jpg",
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-2.jpg",
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-3.jpg",
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-4.jpg",
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-5.jpg",
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-6.jpg",
              "https://laowuquan.oss-cn-shanghai.aliyuncs.com/yunxiaobao/claim-information-7.jpg",
            ];

        wx.previewImage({
          current: imageUrls[idx],
          urls: imageUrls
        })
    },
})