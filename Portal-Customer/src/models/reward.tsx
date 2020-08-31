import { Effect, Reducer } from 'umi';
import { getListReward } from '@/services/reward';

export interface RewardsItem {
  referralId:number;
  status:string;
  amount:number;
  currency:string;
  description:string;
  orderPaymentId:number;
}

export interface RewardsModelState {
  listRewards?: RewardsItem[];
  total: number;
}

export interface RewardsModelType {
  namespace: string;
  state: RewardsModelState;
  effects: {
    getListRewards: Effect;
  };
  reducers: {
    setListRewards: Reducer<RewardsModelState>;
    setTotal: Reducer<RewardsModelState>;
  };
}

const RewardsModel: RewardsModelType = {
  namespace: 'reward',
  state: {
    listRewards: [],
    total: 0
  },
  effects: {
    *getListRewards({ payload }, { call, put }) {
      const { success, ...data } = yield call(getListReward, payload);
      if (success) {
        yield put({
          type: 'setListRewards',
          payload: data.items || [],
        });
        yield put({
          type: 'setTotal',
          payload: data.total || 0,
        });
      }
    },
  },
  reducers: {
    setListRewards(state, { payload }) {
      return {
        total:0,
        ...state,
        listRewards: payload,
      };
    },
    setTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
  },
};

export default RewardsModel;
