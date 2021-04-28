import { defHttp } from '/@/utils/http/axios';
import { GetCustomerListParams, ListResultModel } from './model/customerModel';

import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  CustomerList = '/user/list',
}

/**
 * @description: customer list api
 */
export function listApi(params: GetCustomerListParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<ListResultModel>(
    {
      url: Api.CustomerList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}
