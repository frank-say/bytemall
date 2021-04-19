package com.frank.bytemall.admin.web;


import com.frank.bytemall.admin.vo.AdminLoginResultVO;
import com.frank.bytemall.admin.vo.AdminLoginParamVO;
import com.frank.bytemall.core.constant.ErrorCodeEnum;
import com.frank.bytemall.core.exception.BizException;
import com.frank.bytemall.core.util.JwtUtil;
import com.frank.bytemall.core.util.Md5Util;
import com.frank.bytemall.core.util.ResponseUtil;
import com.frank.bytemall.db.model.BytemallAdmin;
import com.frank.bytemall.db.service.AdminService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/admin")
public class AdminLoginController {

    @Resource
    private AdminService adminService;

    @Resource
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public Object login(@RequestBody AdminLoginParamVO adminLoginParamVO) {
        String username = adminLoginParamVO.getUsername();
        String password = adminLoginParamVO.getPassword();

        BytemallAdmin admin = adminService.findByUsernameAndPwd(username, Md5Util.md5Hash(password));
        if (admin == null) {
            throw new BizException(ErrorCodeEnum.FAILED.getErrCode(), "账号或密码错误");
        }

        AdminLoginResultVO respInfo = new AdminLoginResultVO();
        respInfo.setUsername(admin.getUsername());
        respInfo.setToken(jwtUtil.createToken(admin.getId(), 24));
        return ResponseUtil.ok(respInfo);
    }
}
