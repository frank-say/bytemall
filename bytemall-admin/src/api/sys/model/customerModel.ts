import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

/**
 * @description: Request list interface parameters
 */
export type GetCustomerListParams = BasicPageParams;

export interface customerListItem {
  avatar: string;
  openid: string;
  unionid: string;
  nickname: string;
  mobile: string;
  id: number;
}

/**
 * @description: Request list return value
 */
export type ListResultModel = BasicFetchResult<customerListItem>;
