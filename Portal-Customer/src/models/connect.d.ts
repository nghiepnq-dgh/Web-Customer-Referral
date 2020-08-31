import { MenuDataItem } from '@ant-design/pro-layout';
import { ReferralModelState } from './referral';
import { RewardsModelState } from './reward';

import { Settings } from '@ant-design/pro-layout';
import { CustomerModelState, ClientSettingItem } from './customer';
import { InviationModelState } from './invitation';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    customer?: boolean;
    setting?: boolean;
    reward?:boolean;
    referral?:boolean;
    invitation?:boolean;
    // reportReward?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  settings: Settings;
  customer: CustomerModelState;
  referral:ReferralModelState;
  reward:RewardsModelState;
  invitation:InviationModelState;
  logoClient: ClientSettingItem;
  // reportReward: RewardReportState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}
