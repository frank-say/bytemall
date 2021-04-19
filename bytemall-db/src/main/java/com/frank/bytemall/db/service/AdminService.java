package com.frank.bytemall.db.service;


import com.frank.bytemall.db.mapper.BytemallAdminMapper;
import com.frank.bytemall.db.model.BytemallAdmin;
import com.frank.bytemall.db.model.BytemallAdminExample;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AdminService {

    @Resource
    private BytemallAdminMapper bytemallAdminMapper;

    public BytemallAdmin findByUsernameAndPwd(String username, String pwd) {
        BytemallAdminExample example = new BytemallAdminExample();
        example.or()
                .andUsernameEqualTo(username)
                .andPasswordEqualTo(pwd)
                .andDeletedEqualTo(false);
        return bytemallAdminMapper.selectOneByExample(example);
    }
}
