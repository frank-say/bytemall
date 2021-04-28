import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

/**
 * @description: Request list interface parameters
 */
export type GetGoodsListParams = BasicPageParams;

export interface goodsListItem {
  product_id: number;
  title: string;
  head_img: string[];
  min_price: number;
}

/**
 * @description: Request list return value
 */
export type ListResultModel = BasicFetchResult<goodsListItem>;
