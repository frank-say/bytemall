package com.frank.bytemall.db.mapper;

import com.frank.bytemall.db.model.BytemallUser;
import com.frank.bytemall.db.model.BytemallUserExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BytemallUserMapper {
    long countByExample(BytemallUserExample example);

    int deleteByExample(BytemallUserExample example);

    int deleteByPrimaryKey(Long id);

    int insert(BytemallUser record);

    int insertSelective(BytemallUser record);

    BytemallUser selectOneByExample(BytemallUserExample example);

    BytemallUser selectOneByExampleSelective(@Param("example") BytemallUserExample example, @Param("selective") BytemallUser.Column ... selective);

    List<BytemallUser> selectByExampleSelective(@Param("example") BytemallUserExample example, @Param("selective") BytemallUser.Column ... selective);

    List<BytemallUser> selectByExample(BytemallUserExample example);

    BytemallUser selectByPrimaryKeySelective(@Param("id") Long id, @Param("selective") BytemallUser.Column ... selective);

    BytemallUser selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") BytemallUser record, @Param("example") BytemallUserExample example);

    int updateByExample(@Param("record") BytemallUser record, @Param("example") BytemallUserExample example);

    int updateByPrimaryKeySelective(BytemallUser record);

    int updateByPrimaryKey(BytemallUser record);
}