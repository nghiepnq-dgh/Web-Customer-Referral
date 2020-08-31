import { Privilege } from './utils/constants';
import store from 'store'

export default function() {
  
  const currentUser = store.get('currentCustomer');
  const hasPermission = (userPermissions: string[], permissionNeedCheck: string): boolean => {
    return userPermissions.includes(permissionNeedCheck);
  }

  return {

    // Payment
    READ_ANY_PAYMENT: currentUser && hasPermission(currentUser.permissions, Privilege.READ_ANY_PAYMENT) || false,
    READ_OWN_PAYMENT: currentUser && hasPermission(currentUser.permissions, Privilege.READ_OWN_PAYMENT) || false,
    CREATE_ANY_PAYMENT: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_ANY_PAYMENT) || false,
    UPDATE_ANY_PAYMENT: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_ANY_PAYMENT) || false,
    DELETE_ANY_PAYMENT: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_ANY_PAYMENT) || false,

    // Referral 
    READ_ANY_REFERRAL: currentUser && hasPermission(currentUser.permissions, Privilege.READ_ANY_REFERRAL) || false,
    CREATE_REFERRAL: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_REFERRAL) || false,
    DELETE_REFERRAL: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_REFERRAL) || false,
    READ_OWN_REFERRAL: currentUser && hasPermission(currentUser.permissions, Privilege.READ_OWN_REFERRAL) || false,

    // Reward
    READ_ANY_REWARD: currentUser && hasPermission(currentUser.permissions, Privilege.READ_ANY_REWARD) || false,
    READ_OWN_REWARD: currentUser && hasPermission(currentUser.permissions, Privilege.READ_OWN_REWARD) || false,
    UPDATE_ANY_REWARD: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_ANY_REWARD) || false,
    DELETE_ANY_REWARD: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_ANY_REWARD) || false,

    // Report
    READ_ANY_REPORT: currentUser && hasPermission(currentUser.permissions, Privilege.READ_ANY_REPORT) || false,

    // Campaign
    READ_CAMPAIGN: currentUser && hasPermission(currentUser.permissions, Privilege.READ_CAMPAIGN) || false,
    CREATE_CAMPAIGN: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_CAMPAIGN) || false,
    UPDATE_CAMPAIGN: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_CAMPAIGN) || false,
    DELETE_CAMPAIGN: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_CAMPAIGN) || false,

    // Client setting
    READ_CLIENT_SETTING: currentUser && hasPermission(currentUser.permissions, Privilege.READ_CLIENT_SETTING) || false,
    UPDATE_CLIENT_SETTING: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_CLIENT_SETTING) || false,
    CREATE_CLIENT: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_CLIENT) || false,
    UPDATE_CLIENT: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_CLIENT) || false,
    DELETE_CLIENT: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_CLIENT) || false,
    READ_CLIENT: currentUser && hasPermission(currentUser.permissions, Privilege.READ_CLIENT) || false,

    
    // Customer
    CREATE_CUSTOMER: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_CUSTOMER) || false,
    READ_CUSTOMER: currentUser && hasPermission(currentUser.permissions, Privilege.READ_CUSTOMER) || false,
    DELETE_CUSTOMER: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_CUSTOMER) || false,
    UPDATE_CUSTOMER: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_CUSTOMER) || false,
    
    // Account
    READ_OWN_ACCOUNT: currentUser && hasPermission(currentUser.permissions, Privilege.READ_OWN_ACCOUNT) || false,
    READ_ANY_ACCOUNT: currentUser && hasPermission(currentUser.permissions, Privilege.READ_ANY_ACCOUNT) || false,
    CREATE_ACCOUNT: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_ACCOUNT) || false,
    UPDATE_ANY_ACCOUNT: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_ANY_ACCOUNT) || false,
    DELETE_ANY_ACCOUNT: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_ANY_ACCOUNT) || false,
    UPDATE_OWN_ACCOUNT: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_ANY_ACCOUNT) || false,

    // API key
    CREATE_API_KEY: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_API_KEY) || false,
    UPDATE_API_KEY: currentUser && hasPermission(currentUser.permissions, Privilege.UPDATE_API_KEY) || false,
    DELETE_API_KEY: currentUser && hasPermission(currentUser.permissions, Privilege.DELETE_API_KEY) || false,
    READ_API_KEY: currentUser && hasPermission(currentUser.permissions, Privilege.READ_API_KEY) || false,
    CREATE_SSO_LOGIN: currentUser && hasPermission(currentUser.permissions, Privilege.CREATE_SSO_LOGIN) || false,

    // Invitation
    VIEW_SENT_INVITATION: currentUser && hasPermission(currentUser.permissions, Privilege.VIEW_SENT_INVITATION) || false,
    SEND_INVITATION: currentUser && hasPermission(currentUser.permissions, Privilege.SEND_INVITATION) || false,
    
  };
}