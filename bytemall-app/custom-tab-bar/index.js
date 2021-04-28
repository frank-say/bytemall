Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'wap-home-o',
				text: '首页',
        url: '/pages/index/index'
			},
      {
        icon: 'bag-o',
        text: '购物袋',
        url: '/pages/cart/cart'
      },
      {
        icon: 'user-o',
        text: '个人',
        url: '/pages/ucenter/index/index'
      }
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			if(event.detail === 1) { // 点击购物车tab
				wx.navigateTo({
					url: 'plugin-private://wx34345ae5855f892d/pages/shoppingCart/shoppingCart',
				})
			} else {
				wx.switchTab({
					url: this.data.list[event.detail].url
				});
			}
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
