package com.frank.bytemall.core.exception;


/**
 * 业务异常
 */
public class BizException extends RuntimeException {

    private String message;
    private Integer code;

    public BizException(Integer code, String message) {
        super(message);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
