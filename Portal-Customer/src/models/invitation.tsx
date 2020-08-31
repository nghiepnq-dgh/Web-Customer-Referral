import { Effect, Reducer, history, formatMessage, CustomerItem } from 'umi';
import { listInvitaionService } from '@/services/invitation.service';

export interface InvitationItem {
    id: number,
    emailInvitee: string;
    createdAt: Date;
    updatedAt: Date;
    customer: CustomerItem;
}

export interface InviationModelState {
    listInvitations?: InvitationItem[];
    totalListInvitations?: number;
}

interface InviationModelType {
    namespace: string,
    state: InviationModelState,
    effects: {
        listInvitation: Effect;
    },
    reducers: {
        setListInvitations: Reducer<InviationModelState>;
    }
}

const InvitationModel: InviationModelType = {
    namespace: 'invitation',
    state: {
        listInvitations:[],
        totalListInvitations: 0
    },
    effects: {
        *listInvitation({ payload }, { call, put }) {
            const { success, ...result } = yield listInvitaionService(payload);
            if (success) {
                yield put({
                    type: 'setListInvitations',
                    payload: result || [],
                });
            }
        },
    },
    reducers: {
        setListInvitations(state, { payload }): InviationModelState {
            return {
                ...state,
                listInvitations: payload.items,
                totalListInvitations: payload.total
            }
        },
    }
}

export default InvitationModel;