import React from 'react';
import { ConnectProps } from 'umi';
import styles from './index.less';
import Avatar from './AvatarDropdown';

import SelectLang from '../SelectLang';
import RewardReportDropdown from './RewardReportDropdown';
export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  theme?: SiderTheme;
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme } = props;

  let className = styles.right;

  if (theme === 'dark') {
    className = `${styles.dark}`;
  }

  return (
    <div className={className}>
      <Avatar />
      <RewardReportDropdown />
      <SelectLang className={styles.action} />
    </div>
  );
};

export default GlobalHeaderRight;
