package com.frank.bytemall.core.exception;


import com.frank.bytemall.core.util.ResponseUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * spring 全局异常处理
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final Log logger = LogFactory.getLog(getClass());


    /**
     * 401 not login
     * @param e
     * @return
     */
    @ExceptionHandler(AuthException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Object authError(AuthException e) {
        return ResponseUtil.fail(e.getCode(), e.getMessage());
    }

    /**
     * 业务异常，返回400状态码及自定义的错误信息
     * @param e
     * @return
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = BizException.class)
    public Object bizHandle(BizException e) {
        return ResponseUtil.fail(e.getCode(), e.getMessage());
    }

    /**
     * 请求方法不允许，返回405状态码及自定义的错误信息
     * @param e
     * @return
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public Object methodNotAllow(HttpRequestMethodNotSupportedException e) {
        return ResponseUtil.fail(405, e.getMethod() + "请求方法不支持");
    }

    /**
     *
     * @param e
     * @return
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Object badArgumentHandler(HttpMessageNotReadableException e) {
        logger.error(e.getMessage(), e);
        return ResponseUtil.fail(400, "请求参数缺失");
    }

    /**
     * 500错误，返回500状态码及系统错误
     * @param e
     * @return
     */
    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = Exception.class)
    public Object internalError(Exception e) {
        logger.error(e.getMessage(), e);
        return ResponseUtil.fail(-1, "系统错误，请稍后重试");
    }
}
