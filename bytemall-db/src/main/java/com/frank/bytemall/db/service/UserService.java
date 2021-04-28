package com.frank.bytemall.db.service;


import com.frank.bytemall.db.mapper.BytemallUserMapper;
import com.frank.bytemall.db.model.BytemallUser;
import com.frank.bytemall.db.model.BytemallUserExample;
import com.github.pagehelper.PageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Resource
    private BytemallUserMapper userMapper;

    public void insert(BytemallUser user) {
        user.setAddTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());
        userMapper.insertSelective(user);
    }

    public BytemallUser findById(Long id) {
        return userMapper.selectByPrimaryKey(id);
    }

    public BytemallUser findByOpenid(String openid) {
        BytemallUserExample example = new BytemallUserExample();
        example.or().andOpenidEqualTo(openid);
        return userMapper.selectOneByExample(example);
    }

    public List<BytemallUser> list(String openid, String unionid, String nickname,
                                   String mobile, Integer page, Integer pageSize) {
        BytemallUserExample example = new BytemallUserExample();
        BytemallUserExample.Criteria criteria = example.or();

        if (!StringUtils.isEmpty(nickname)) {
            criteria.andNicknameLike("%" + nickname + "%");
        }
        if (!StringUtils.isEmpty(mobile)) {
            criteria.andMobileEqualTo(mobile);
        }
        if (!StringUtils.isEmpty(openid)) {
            criteria.andOpenidEqualTo(openid);
        }
        if (!StringUtils.isEmpty(unionid)) {
            criteria.andOpenidEqualTo(unionid);
        }
        example.setOrderByClause("id desc");

        PageHelper.startPage(page, pageSize);
        return userMapper.selectByExample(example);
    }

    public int updateById(Long id, BytemallUser user) {
        user.setId(id);
        user.setUpdateTime(LocalDateTime.now());
        return userMapper.updateByPrimaryKey(user);

    }


}
