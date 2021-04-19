package com.frank.bytemall.core.argumentresolver;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.frank.bytemall.core.annotation.LoginRequire;
import com.frank.bytemall.core.constant.ErrorCodeEnum;
import com.frank.bytemall.core.exception.AuthException;
import com.frank.bytemall.core.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class LoginArgumentResolver implements HandlerMethodArgumentResolver {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    public static final String LOGIN_TOKEN_KEY = "Bytemall-Token";

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return Long.class.isAssignableFrom(methodParameter.getParameterType()) && methodParameter.hasParameterAnnotation(LoginRequire.class);
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        String token = nativeWebRequest.getHeader(LOGIN_TOKEN_KEY);
        if (token == null || token.isEmpty()) {
            throw new AuthException(ErrorCodeEnum.UNLOGIN.getErrCode(), ErrorCodeEnum.UNLOGIN.getErrMsg());
        }

        try {
            return jwtUtil.verifyTokenAndGetUserId(token);
        } catch (JWTVerificationException e) {
            logger.error("token解码失败" + e.getMessage(), e);
            throw new AuthException(ErrorCodeEnum.UNLOGIN.getErrCode(), ErrorCodeEnum.UNLOGIN.getErrMsg());
        }

    }
}
