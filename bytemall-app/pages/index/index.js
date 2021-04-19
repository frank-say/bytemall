const app = getApp()

Page({
  data: {
    
  },

  onLoad() {
    
  },
  
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
	}
})