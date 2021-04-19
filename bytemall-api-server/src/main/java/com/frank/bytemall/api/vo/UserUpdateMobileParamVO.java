package com.frank.bytemall.api.vo;

/**
 * 用户授权手机号，请求参数
 */
public class UserUpdateMobileParamVO {
    private String iv;
    private String encryptedData;

    public String getIv() {
        return iv;
    }

    public void setIv(String iv) {
        this.iv = iv;
    }

    public String getEncryptedData() {
        return encryptedData;
    }

    public void setEncryptedData(String encryptedData) {
        this.encryptedData = encryptedData;
    }
}
