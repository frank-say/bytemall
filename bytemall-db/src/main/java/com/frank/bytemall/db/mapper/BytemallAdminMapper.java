package com.frank.bytemall.db.mapper;

import com.frank.bytemall.db.model.BytemallAdmin;
import com.frank.bytemall.db.model.BytemallAdminExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BytemallAdminMapper {
    long countByExample(BytemallAdminExample example);

    int deleteByExample(BytemallAdminExample example);

    int deleteByPrimaryKey(Long id);

    int insert(BytemallAdmin record);

    int insertSelective(BytemallAdmin record);

    BytemallAdmin selectOneByExample(BytemallAdminExample example);

    BytemallAdmin selectOneByExampleSelective(@Param("example") BytemallAdminExample example, @Param("selective") BytemallAdmin.Column ... selective);

    List<BytemallAdmin> selectByExampleSelective(@Param("example") BytemallAdminExample example, @Param("selective") BytemallAdmin.Column ... selective);

    List<BytemallAdmin> selectByExample(BytemallAdminExample example);

    BytemallAdmin selectByPrimaryKeySelective(@Param("id") Long id, @Param("selective") BytemallAdmin.Column ... selective);

    BytemallAdmin selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") BytemallAdmin record, @Param("example") BytemallAdminExample example);

    int updateByExample(@Param("record") BytemallAdmin record, @Param("example") BytemallAdminExample example);

    int updateByPrimaryKeySelective(BytemallAdmin record);

    int updateByPrimaryKey(BytemallAdmin record);
}