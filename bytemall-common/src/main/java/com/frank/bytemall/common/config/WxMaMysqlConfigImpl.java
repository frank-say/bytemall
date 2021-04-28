package com.frank.bytemall.common.config;

import cn.binarywang.wx.miniapp.config.impl.WxMaDefaultConfigImpl;
import com.frank.bytemall.core.util.LocalDateTimeUtil;
import com.frank.bytemall.db.model.BytemallAccessToken;
import com.frank.bytemall.db.service.AccessTokenService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDateTime;

@Component
public class WxMaMysqlConfigImpl extends WxMaDefaultConfigImpl {
    private static final String ACCESS_TOKEN_KEY_TPL = "%s:access_token";
    private volatile String accessTokenKey;

    @Resource
    private AccessTokenService accessTokenService;

    @Override
    public void setAppid(String appId) {
        super.setAppid(appId);
        this.accessTokenKey = String.format(ACCESS_TOKEN_KEY_TPL, appId);
    }

    @Override
    public String getAccessToken() {
        BytemallAccessToken accessToken = accessTokenService.findOneByKey(this.accessTokenKey);
        if (accessToken != null) {
            return accessToken.getValue();
        }
        return null;
    }

    @Override
    public boolean isAccessTokenExpired() {
        BytemallAccessToken accessToken = accessTokenService.findOneByKey(this.accessTokenKey);
        return accessToken == null || System.currentTimeMillis() > accessToken.getExpireAt();
    }

    @Override
    public synchronized void updateAccessToken(String accessToken, int expiresInSeconds) {
        long expireAt = System.currentTimeMillis() + (expiresInSeconds - 200) * 1000L;
        LocalDateTime expireAtTime = LocalDateTimeUtil.epochMilliToDateTime(expireAt);

        BytemallAccessToken bytemallAccessToken = new BytemallAccessToken();
        bytemallAccessToken.setKey(this.accessTokenKey);
        bytemallAccessToken.setValue(accessToken);
        bytemallAccessToken.setExpireAt(expireAt);
        bytemallAccessToken.setExpireAtTime(expireAtTime);
        accessTokenService.upsertSelective(bytemallAccessToken);
    }

    @Override
    public void expireAccessToken() {
        accessTokenService.deleteBykey(this.accessTokenKey);
    }

}
