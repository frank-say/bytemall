package com.frank.bytemall.db.mapper;

import com.frank.bytemall.db.model.BytemallAccessToken;
import com.frank.bytemall.db.model.BytemallAccessTokenExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BytemallAccessTokenMapper {
    long countByExample(BytemallAccessTokenExample example);

    int deleteByExample(BytemallAccessTokenExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(BytemallAccessToken record);

    int insertSelective(BytemallAccessToken record);

    BytemallAccessToken selectOneByExample(BytemallAccessTokenExample example);

    BytemallAccessToken selectOneByExampleSelective(@Param("example") BytemallAccessTokenExample example, @Param("selective") BytemallAccessToken.Column ... selective);

    List<BytemallAccessToken> selectByExampleSelective(@Param("example") BytemallAccessTokenExample example, @Param("selective") BytemallAccessToken.Column ... selective);

    List<BytemallAccessToken> selectByExample(BytemallAccessTokenExample example);

    BytemallAccessToken selectByPrimaryKeySelective(@Param("id") Integer id, @Param("selective") BytemallAccessToken.Column ... selective);

    BytemallAccessToken selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") BytemallAccessToken record, @Param("example") BytemallAccessTokenExample example);

    int updateByExample(@Param("record") BytemallAccessToken record, @Param("example") BytemallAccessTokenExample example);

    int updateByPrimaryKeySelective(BytemallAccessToken record);

    int updateByPrimaryKey(BytemallAccessToken record);

    int batchInsert(@Param("list") List<BytemallAccessToken> list);

    int batchInsertSelective(@Param("list") List<BytemallAccessToken> list, @Param("selective") BytemallAccessToken.Column ... selective);

    int upsert(BytemallAccessToken record);

    int upsertSelective(BytemallAccessToken record);
}