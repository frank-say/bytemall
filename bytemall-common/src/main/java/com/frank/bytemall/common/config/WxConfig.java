package com.frank.bytemall.common.config;


import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.api.impl.WxMaServiceImpl;
import com.frank.bytemall.core.config.WxProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

@Configuration
public class WxConfig {
    @Resource
    private WxProperties properties;
    @Resource
    private WxMaMysqlConfigImpl wxMaMysqlConfigImpl;

    @Bean
    public WxMaService wxMaService() {
        WxMaService service = new WxMaServiceImpl();
        wxMaMysqlConfigImpl.setAppid(properties.getAppId());
        wxMaMysqlConfigImpl.setSecret(properties.getAppSecret());
        service.setWxMaConfig(wxMaMysqlConfigImpl);
        return service;
    }

}

