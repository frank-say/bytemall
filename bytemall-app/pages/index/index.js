const app = getApp()

Page({
  data: {
    list: [
      {
        imgUrl: 'https://bytemall.0-1-byte.com/bytemall-app/img/index-0.gif',
        path: ''
      },
      {
        imgUrl: 'https://bytemall.0-1-byte.com/bytemall-app/img/index-1.jpeg',
        path: 'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=31702238'
      },
      {
        imgUrl: 'https://bytemall.0-1-byte.com/bytemall-app/img/index-2.jpeg',
        path: 'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=31913302'
      },
      {
        imgUrl: 'https://bytemall.0-1-byte.com/bytemall-app/img/index-3.jpeg',
        path: 'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=31813747'
      },
      {
        imgUrl: 'https://bytemall.0-1-byte.com/bytemall-app/img/index-4.jpeg',
        path: 'plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=31831738'
      }
    ]
  },

  onLoad() {
    
  },
  
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
	}
})