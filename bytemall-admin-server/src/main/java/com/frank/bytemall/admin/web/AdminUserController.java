package com.frank.bytemall.admin.web;


import com.frank.bytemall.core.util.ResponseUtil;
import com.frank.bytemall.db.service.UserService;
import com.frank.bytemall.core.annotation.LoginRequire;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/admin/user")
public class AdminUserController {

    @Resource
    private UserService userService;

    @GetMapping("/list")
    public Object userList(@LoginRequire Long userId,
                           @RequestParam(required = false) String nickname,
                           @RequestParam(required = false) String mobile,
                           @RequestParam(required = false) String openid,
                           @RequestParam(required = false) String unionid,
                           @RequestParam(defaultValue = "1") Integer page,
                           @RequestParam(defaultValue = "10") Integer pageSize) {
        return ResponseUtil.okList(userService.list(openid, unionid, nickname, mobile, page, pageSize));
    }
}
