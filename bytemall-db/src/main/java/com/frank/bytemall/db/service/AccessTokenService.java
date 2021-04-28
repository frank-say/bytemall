package com.frank.bytemall.db.service;

import com.frank.bytemall.db.mapper.BytemallAccessTokenMapper;
import com.frank.bytemall.db.model.BytemallAccessToken;
import com.frank.bytemall.db.model.BytemallAccessToken.Column;
import com.frank.bytemall.db.model.BytemallAccessTokenExample;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AccessTokenService {
    @Resource
    private BytemallAccessTokenMapper accessTokenMapper;

    Column[] columns = new Column[]{Column.id, Column.key, Column.value, Column.expireAt, Column.expireAtTime};

    public BytemallAccessToken findOneByKey(String key) {
        BytemallAccessTokenExample example = new BytemallAccessTokenExample();
        example.or().andKeyEqualTo(key);
        return accessTokenMapper.selectOneByExampleSelective(example, columns);
    }

    public int upsertSelective(BytemallAccessToken accessToken) {
        return accessTokenMapper.upsertSelective(accessToken);
    }

    public int deleteBykey(String key) {
        BytemallAccessTokenExample example = new BytemallAccessTokenExample();
        example.or().andKeyEqualTo(key);
        return accessTokenMapper.deleteByExample(example);
    }
}
