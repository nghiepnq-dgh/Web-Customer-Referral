import React from 'react';
import { history, ConnectProps, connect, useIntl, CustomerItem, Dispatch, Redirect } from 'umi';
import { Avatar, Menu, Spin } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown';
import { ClickParam } from 'antd/es/menu';

import styles from './index.less';
import { ConnectState } from '@/models/connect';
import { ClientSettingItem } from '@/models/customer';
import { resetDataWhenLogout } from '@/utils/utils';
import { stringify } from 'querystring';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentCustomer?: CustomerItem;
  menu?: boolean;
  dispatch: Dispatch;
  clientSetting?: ClientSettingItem;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = props => {
  const { dispatch, clientSetting } = props;
  const urlClient = clientSetting && clientSetting.logoutUrl || undefined;
  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      if (urlClient) {
        resetDataWhenLogout();
        window.location.href= `${urlClient}`
      }
      if (urlClient === undefined) {
        dispatch({ type:'customer/logout' })
      }
    }
    if (key === 'profile') {
      history.push('/account/profile');
    }
  };

  const { currentCustomer, menu } = props;

  const { formatMessage } = useIntl();
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="profile">
        <UserOutlined />
        {formatMessage({ id: 'menu.profile' })}
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        {formatMessage({ id: 'user.logout' })}
      </Menu.Item>
    </Menu>
  );
  return currentCustomer ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          icon={<UserOutlined />}
          size="small"
          className={styles.avatar}
          // src={currentCustomer.avatarUrl}
          alt="avatar"
        />
        <span className={styles.name}>
          {currentCustomer.name || formatMessage({ id: 'user.info.anonymous' })}
        </span>
      </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default connect(({ customer }: ConnectState) => ({
  currentCustomer: customer.currentCustomer,
  clientSetting: customer.clientSetting
}))(AvatarDropdown);
