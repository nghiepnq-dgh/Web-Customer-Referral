import { Effect, Reducer, history, formatMessage } from 'umi';
import { notification } from 'antd';
import { getStateFromStore, getPageQuery, resetDataWhenLogout } from '@/utils/utils';
import store from 'store';
import { stringify } from 'querystring';
import { login, getMe, viewRewardReport, getCampaignService } from '@/services/customer.service';
import { getClientSetting } from '@/services/clientSetting';
import { setCookie } from '@/utils/cookie';

export interface LoginParams {
    userid: string;
    password: string;
    grantType: string;
}

export interface CustomerItem {
    id: number,
    name: string;
    clientCustomerId: string;
    email: string;
    phone: string;
    note: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CampaignItem {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    rewardInviteeType: string;
    rewardInviterType: string;
    rewardInviterAmount: number;
    rewardInviteeAmount: number;
    active: string;
    description: string;
  }
  

export interface ClientSettingItem {
    id: string;
    siteTitle: string;
    sologan:string;
    logo: string;
    logoCompact: string;
    primaryColor: string;
    secondColor: string;
    secretKeySSO: string;
    registerUrl: string;
    logoutUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CustomerModelState {
    accessToken?: string;
    currentCustomer?: CustomerItem;
    clientSetting?:ClientSettingItem;
    reportReward?: RewardReport;
    campaign?: CampaignItem; 
}

export interface RewardReport {
    totalBalanceNew: number;
    totalBalancePaid: number;
    total: number;
}

// export interface RewardReportState {
//     reportReward?: RewardReport;
// }

interface CustomerModelType {
    namespace: string,
    state: CustomerModelState,
    effects: {
        login: Effect;
        logout: Effect;
        getMe: Effect;
        getClientSetting: Effect;
        getRewardReport: Effect;
        getCampaign: Effect;
    },
    reducers: {
        setAccessToken: Reducer<CustomerModelState>;
        saveCurrentCustomer: Reducer<CustomerModelState>;
        saveClientSetting: Reducer<CustomerModelState>;
        saveRewardReport: Reducer<CustomerModelState>;
        saveCampaign: Reducer<CustomerModelState>
    }
}

const CustomerModel: CustomerModelType = {
    namespace: 'customer',
    state: {
        accessToken: getStateFromStore('accessToken'),
        currentCustomer: getStateFromStore('currentCustomer')
    },
    effects: {
        *login({ payload }, { call, put }) {
            const { success, ...result } = yield call(login, payload);
            if (success) {
                yield put({
                    type: 'setAccessToken',
                    payload: result.accessToken,
                });

                notification.success({
                    message: formatMessage({ id: 'login.success' }),
                });

                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params as { redirect: string };
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = '/';
                        return;
                    }
                }
                history.replace(redirect || '/');
            }
        },
        *getMe({ payload }, { call, put }) {
            const { success, ...userInfo } = yield call(getMe);
            if (success) {
                yield put({
                    type: 'saveCurrentCustomer',
                    payload: userInfo,
                });
            }
        },
        logout() {
            const { redirect } = getPageQuery();
            if (window.location.pathname !== '/login') {
                resetDataWhenLogout();
                history.replace({
                    pathname: '/login',
                    search: stringify({
                        redirect: redirect || window.location.href,
                    }),
                });
            }
        },
        *getClientSetting({ },{ call, put }) {
            const { success, ...data } = yield call(getClientSetting);
            if (success) {
                yield put({
                    type:'saveClientSetting',
                    payload: data
                })
            }
        },
        *getRewardReport({payload}, {call, put}) {
            const {success, ...data} = yield call(viewRewardReport);
            if (success) {
                yield put({
                    type: 'saveRewardReport',
                    payload: data
                });
            }
        },
        *getCampaign({payload}, {call, put}) {
            const {success, ...data} = yield call(getCampaignService);
            if (success) {
                yield put({
                    type: 'saveCampaign',
                    payload: data
                });
            }
        }
    },
    reducers: {
        setAccessToken(state, { payload }): CustomerModelState {
            store.set('accessToken', payload);
            return {
                ...state,
                accessToken: payload
            }
        },
        saveCurrentCustomer(state, { payload }): CustomerModelState {
            store.set('currentCustomer', payload);
            return {
                ...state,
                currentCustomer: payload
            }
        },
        saveClientSetting(state, { payload }): CustomerModelState {
            return {
                ...state,
                clientSetting: payload
            }
        },
        saveRewardReport(state, {payload}): CustomerModelState {
            return {
                ...state,
                reportReward: payload
            }
        },
        saveCampaign(state, {payload}): CustomerModelState {
            return {
                ...state,
                campaign: payload
            }
        }
    }
}

export default CustomerModel;