import { stringify } from 'qs';
import request from '@/utils/request';

const BaseApi = 'http://localhost:3200'

export async function queryArticleList(params) {
  return request(`${BaseApi}/api/article/list?${stringify(params)}`)
}
