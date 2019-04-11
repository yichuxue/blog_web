import { queryArticleList } from '@/services/apis';

export default {
  namespace: 'home',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      let response = yield call(queryArticleList, payload);
      yield put({
        type: 'queryList',
        // payload: Array.isArray(response) ? response : [],
        payload: response,
      });
    }
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}
