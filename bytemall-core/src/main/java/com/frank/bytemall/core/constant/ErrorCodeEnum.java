package com.frank.bytemall.core.constant;

/**
 * 错误响应对应的code和msg
 */
public enum ErrorCodeEnum {
    FAILED(4000, "错误"),
    UNLOGIN(4002, "未登录")
    ;

    ErrorCodeEnum(int code, String msg) {
        this.errCode = code;
        this.errMsg = msg;
    }

    private Integer errCode;
    private String errMsg;



    public Integer getErrCode() {
        return errCode;
    }

    public void setErrCode(Integer errCode) {
        this.errCode = errCode;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }
}
