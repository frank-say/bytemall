import { defHttp } from '/@/utils/http/axios';
import { GetGoodsListParams, ListResultModel } from './model/goodsModel';

import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  GoodsList = '/spu/list',
}

/**
 * @description: goods list api
 */
export function listApi(params: GetGoodsListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<ListResultModel>(
    {
      url: Api.GoodsList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}
