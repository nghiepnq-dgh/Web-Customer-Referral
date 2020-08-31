export enum STATUS_REFERRAL {
  DEACTIVE = 'deactive',
  ACTIVE = 'active',
}

export const ROLE_CLIENTS = {
  0: 'DEVELOPER',
  1: 'CUSTOMER',
  2: 'MANAGER',
  3: 'ADMIN',
};

export enum AccountRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  DEVELOPER = 'developer',
  CUSTOM = 'custom',
}

export enum StatusReward {
  NEW = 'new',
  PAID = 'paid',
  LOCK = 'lock',
}

export enum StatusAccountOfClient {
  NEW = 'new',
  ACTIVE = 'active',
  LOCK = 'lock',
  DELETED = 'deleted',
}

export enum SystemRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}

export enum TYPE_REWARD {
  PERCENT_ORDER = 'PERCENT_ORDER',
  VND = 'VND',
}

export enum Privilege {
  // Campaign
  CREATE_CAMPAIGN = 'CREATE_CAMPAIGN',
  READ_CAMPAIGN = 'READ_CAMPAIGN',
  UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN',
  DELETE_CAMPAIGN = 'DELETE_CAMPAIGN',

  // Account
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  READ_ANY_ACCOUNT = 'READ_ANY_ACCOUNT',
  READ_OWN_ACCOUNT = 'READ_OWN_ACCOUNT', // Dùng cho xem thông tin profile
  UPDATE_OWN_ACCOUNT = 'UPDATE_OWN_ACCOUNT',
  UPDATE_ANY_ACCOUNT = 'UPDATE_ANY_ACCOUNT', // Dùng cho cộng nhật thông tin profile
  DELETE_ANY_ACCOUNT = 'DELETE_ANY_ACCOUNT',

  // Customer
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  READ_CUSTOMER = 'READ_CUSTOMER',
  UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',

  // Report
  READ_ANY_REPORT = 'READ_ANY_REPORT',

  // Referral
  CREATE_REFERRAL = 'CREATE_REFERRAL',
  DELETE_REFERRAL = 'DELETE_REFERRAL',
  READ_ANY_REFERRAL = 'READ_ANY_REFERRAL',
  READ_OWN_REFERRAL = 'READ_OWN_REFERRAL',

  // Client
  CREATE_CLIENT = 'CREATE_CLIENT',
  UPDATE_CLIENT = 'UPDATE_CLIENT',
  DELETE_CLIENT = 'DELETE_CLIENT',
  READ_CLIENT = 'READ_CLIENT',

  // CLient Setting
  UPDATE_CLIENT_SETTING = 'UPDATE_CLIENT_SETTING',
  READ_CLIENT_SETTING = 'READ_CLIENT_SETTING',

  // Invitation
  SEND_INVITATION = 'SEND_INVITATION',
  VIEW_SENT_INVITATION = 'VIEW_SENT_INVITATION',

  // Create payment order transaction
  CREATE_ANY_PAYMENT = 'CREATE_ANY_PAYMENT',
  READ_ANY_PAYMENT = 'READ_ANY_PAYMENT',
  UPDATE_ANY_PAYMENT = 'UPDATE_ANY_PAYMENT',
  DELETE_ANY_PAYMENT = 'DELETE_ANY_PAYMENT',
  READ_OWN_PAYMENT = 'READ_OWN_PAYMENT', // Cho customer - xem thông tin payment của nó

  // Reward
  READ_ANY_REWARD = 'READ_ANY_REWARD',
  READ_OWN_REWARD = 'READ_OWN_REWARD',
  DELETE_ANY_REWARD = 'DELETE_ANY_REWARD',
  UPDATE_ANY_REWARD = 'UPDATE_ANY_REWARD',
  CREATE_API_KEY = 'CREATE_API_KEY',
  DELETE_API_KEY = 'DELETE_API_KEY',
  UPDATE_API_KEY = 'UPDATE_API_KEY',
  READ_API_KEY = 'READ_API_KEY',
  CREATE_SSO_LOGIN = 'CREATE_SSO_LOGIN',
}

export const PrivilegeDescription = {

  // Campaign
  [Privilege.CREATE_CAMPAIGN]: {
    vi: 'Tạo chiến dịch',
    en: 'Create campaign'
  },
  [Privilege.READ_CAMPAIGN]: {
    vi: 'Đọc danh sách chiến dịch',
    en: 'Read all campaigns'
  },
  [Privilege.UPDATE_CAMPAIGN]: {
    vi: 'Cập nhật chiến dịch',
    en: 'Update campaign'
  },
  [Privilege.DELETE_CAMPAIGN]: {
    vi: 'Xóa chiến dịch',
    en: 'Delete campaign'
  },

  // Account
  [Privilege.CREATE_ACCOUNT]: {
    vi: 'Tạo tài khoản',
    en: 'Create account'
  },
  [Privilege.READ_ANY_ACCOUNT]: {
    vi: 'Xem tất cả tài khoản',
    en: 'Read any account'
  },
  [Privilege.READ_OWN_ACCOUNT]: {
    vi: 'Xem tài khoản sở hữu',
    en: 'Read own account'
  },
  [Privilege.UPDATE_OWN_ACCOUNT]: {
    vi: 'Cập nhật tài khoản sở hữu',
    en: 'Update own account'
  },
  [Privilege.UPDATE_ANY_ACCOUNT]: {
    vi: 'Cập nhật tất cả tài khoản',
    en: 'Update any account'
  },
  [Privilege.DELETE_ANY_ACCOUNT]: {
    vi: 'Xóa tất cả tài khoản',
    en: 'Delete any account'
  },

  // Customer
  [Privilege.CREATE_CUSTOMER]: {
    vi: 'Tạo khách hàng',
    en: 'Create customer'
  },
  [Privilege.READ_CUSTOMER]: {
    vi: 'Xem khách hàng',
    en: 'Read customer'
  },
  [Privilege.UPDATE_CUSTOMER]: {
    vi: 'Cập nhật khách hàng',
    en: 'Update customer'
  },
  [Privilege.DELETE_CUSTOMER]: {
    vi: 'Xóa khách hàng',
    en: 'Delete customer'
  },

  // Report
  [Privilege.READ_ANY_REPORT]: {
    vi: 'Đọc tất cả báo cáo',
    en: 'Read all report'
  },

  // Referral
  [Privilege.CREATE_REFERRAL]: {
    vi: 'Tạo giới thiệu',
    en: 'Create referral'
  },
  [Privilege.DELETE_REFERRAL]: {
    vi: 'Xóa giới thiệu',
    en: 'Delete referral'
  },
  [Privilege.READ_ANY_REFERRAL]: {
    vi: 'Đọc tất cả giới thiệu',
    en: 'Read all referral'
  },
  [Privilege.READ_OWN_REFERRAL]: {
    vi: 'Đọc giới thiệu sở hữu',
    en: 'Read own referral'
  },

  // Client
  [Privilege.CREATE_CLIENT]: {
    vi: 'Tạo khách hàng',
    en: 'Create client'
  },
  [Privilege.UPDATE_CLIENT]: {
    vi: 'Cập nhật khách hàng',
    en: 'Update client'
  },
  [Privilege.DELETE_CLIENT]: {
    vi: 'Xóa khách hàng',
    en: 'Delete client'
  },
  [Privilege.READ_CLIENT]: {
    vi: 'Xem khách hàng',
    en: 'Read client'
  },

  // CLient Setting
  [Privilege.UPDATE_CLIENT_SETTING]: {
    vi: 'Cập nhật cài đặt khách hàng',
    en: 'Update client setting'
  },
  [Privilege.READ_CLIENT_SETTING]: {
    vi: 'Xem cài đặt khách hàng',
    en: 'Read client setting'
  },

  // Invitation
  [Privilege.SEND_INVITATION]: {
    vi: 'Gửi lời mời',
    en: 'Send innovation'
  },
  [Privilege.VIEW_SENT_INVITATION]: {
    vi: 'Xem lời mời đã gửi',
    en: 'View sent innovation'
  },

  // Create payment order transaction
  [Privilege.CREATE_ANY_PAYMENT]: {
    vi: 'Tạo thanh toán bất kì',
    en: 'Create all payment'
  },
  [Privilege.READ_ANY_PAYMENT]: {
    vi: 'Xem tất cả thanh toán',
    en: 'Read all payment'
  },
  [Privilege.UPDATE_ANY_PAYMENT]: {
    vi: 'Cập nhật tất cả thanh toán',
    en: 'Update all payment'
  },
  [Privilege.DELETE_ANY_PAYMENT]: {
    vi: 'Xóa tất cả thanh toán',
    en: 'Delete all payment'
  },
  [Privilege.READ_OWN_PAYMENT]: {
    vi: 'Xem thanh toán sở hữu',
    en: 'Read own payment'
  },

  // Reward
  [Privilege.READ_ANY_REWARD]: {
    vi: 'Xem tất cả phần thưởng',
    en: 'Read all reward'
  },
  [Privilege.READ_OWN_REWARD]: {
    vi: 'Xem phần thưởng sở hữu',
    en: 'Read own reward'
  },
  [Privilege.DELETE_ANY_REWARD]: {
    vi: 'Xóa tất cả phần thưởng',
    en: 'Delete all reward'
  },
  [Privilege.UPDATE_ANY_REWARD]: {
    vi: 'Cập nhật tất cả phần thưởng',
    en: 'Update all reward'
  },
  [Privilege.CREATE_API_KEY]: {
    vi: 'Tạo API Key',
    en: 'Create API Key'
  },
  [Privilege.DELETE_API_KEY]: {
    vi: 'Xóa API Key',
    en: 'Delete API Key'
  },
  [Privilege.UPDATE_API_KEY]: {
    vi: 'Cập nhật API Key',
    en: 'Update API Key'
  },
  [Privilege.READ_API_KEY]: {
    vi: 'Xem API Key',
    en: 'Read API Key'
  },
  [Privilege.CREATE_SSO_LOGIN]: {
    vi: 'Tạo đăng nhập SSO',
    en: 'Create SSO login'
  },
  
}

