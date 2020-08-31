import { Effect, Reducer } from 'umi';
import { getListReferral } from '@/services/referral';
import { CampaignItem } from './campaign';

export interface InviterItem {
  id: string;
  name: string;
  clientCustomerId: string;
  email: string;
  phone: string;
  note: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InviteeItem {
  id: string;
  name: string;
  clientCustomerId: string;
  email: string;
  phone: string;
  note: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ReferralItem {
  id: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  inviter: InviterItem;
  invitee: InviteeItem;
  campaign: CampaignItem;
}

export interface ReferralModelState {
  listReferral?: ReferralItem[];
  total:0;
}

export interface ReferralType {
  namespace: string;
  state: ReferralModelState;
  effects: {
    getListReferral: Effect;
  };
  reducers: {
    setListReferral: Reducer<ReferralModelState>;
    setTotal: Reducer<ReferralModelState>;
  };
}

const ReferralModel: ReferralType = {
  namespace: 'referral',
  state: {
    listReferral: [],
    total:0,
  },
  effects: {
    *getListReferral({ payload }, { call, put }) {
      const { success, ...data } = yield call(getListReferral, payload);
      if (success) {
        yield put({
          type: 'setListReferral',
          payload: data.items || [],
        });
        yield put({
          type: 'setTotal',
          payload: data.total || [],
        });
      }
    },
  },
  reducers: {
    setListReferral(state, { payload }): ReferralModelState {
      return {
        total: 0,
        ...state,
        listReferral: payload,
      };
    },
    setTotal(state, { payload }): ReferralModelState {
      return {
        ...state,
        total: payload,
      };
    },
  },
};

export default ReferralModel;
