package com.frank.bytemall.api.web;


import cn.binarywang.wx.miniapp.api.WxMaService;
import cn.binarywang.wx.miniapp.bean.WxMaJscode2SessionResult;
import cn.binarywang.wx.miniapp.bean.WxMaPhoneNumberInfo;
import com.frank.bytemall.api.vo.*;
import com.frank.bytemall.core.annotation.LoginRequire;
import com.frank.bytemall.core.constant.ErrorCodeEnum;
import com.frank.bytemall.core.exception.BizException;
import com.frank.bytemall.core.util.JwtUtil;
import com.frank.bytemall.core.util.ResponseUtil;
import com.frank.bytemall.db.model.BytemallUser;
import com.frank.bytemall.db.service.UserService;
import me.chanjar.weixin.common.error.WxErrorException;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/user")
public class ApiUserController {

    @Resource
    private WxMaService wxmaService;

    @Resource
    private UserService userService;

    @Resource
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Object login(@RequestBody UserLoginParamVO userLoginParamVO) {
        String code = userLoginParamVO.getCode();
        WxMaJscode2SessionResult result;
        try {
            result = wxmaService.getUserService().getSessionInfo(code);
        } catch (WxErrorException e) {
            throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "登录失败，请重试");
        }

        String openid = result.getOpenid();
        String unionid = result.getUnionid();
        String sessionKey = result.getSessionKey();

        BytemallUser user = userService.findByOpenid(openid);
        if (user == null) {
            user = new BytemallUser();
            user.setOpenid(openid);
            user.setUnionid(unionid);
            user.setSessionKey(sessionKey);
            userService.insert(user);
        } else {
            // 更新sessionKey
            user.setSessionKey(sessionKey);
            user.setUnionid(unionid);
            userService.updateById(user.getId(), user);
        }

        String token = jwtUtil.createToken(user.getId(), 2);
        UserLoginResultVO respVo = new UserLoginResultVO();
        respVo.setToken(token);
        BeanUtils.copyProperties(user, respVo);
        return ResponseUtil.ok(respVo);
    }

    @PutMapping("/updateProfile")
    public Object updateProfile(@LoginRequire Long userId, @RequestBody UserUpdateProfileParamVO userUpdateProfileParamVO) {
        BytemallUser user = new BytemallUser();
        user.setAvatar(userUpdateProfileParamVO.getAvatar());
        user.setCity(userUpdateProfileParamVO.getCity());
        user.setCountry(userUpdateProfileParamVO.getCountry());
        user.setProvince(userUpdateProfileParamVO.getProvince());
        user.setGender(userUpdateProfileParamVO.getGender());

        userService.updateById(userId, user);
        return ResponseUtil.ok();
    }

    @PutMapping("/updateMobile")
    public Object updateMobile(@LoginRequire Long userId, @RequestBody UserUpdateMobileParamVO userUpdateMobileParamVO) {
        BytemallUser user = userService.findById(userId);
        if (user == null) {
            throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "用户不存在");
        }

        WxMaPhoneNumberInfo phoneInfo = wxmaService.getUserService().getPhoneNoInfo(
                user.getSessionKey(),
                userUpdateMobileParamVO.getEncryptedData(),
                userUpdateMobileParamVO.getIv());

        user.setMobile(phoneInfo.getPhoneNumber());
        userService.updateById(userId, user);

        UserUpdateMobileResultVO respInfo = new UserUpdateMobileResultVO();
        respInfo.setMobile(phoneInfo.getPhoneNumber());
        return ResponseUtil.ok(respInfo);
    }
}
