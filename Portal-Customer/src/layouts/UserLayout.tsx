import React from 'react';
import {
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from '@ant-design/pro-layout';
import { Link, formatMessage, ConnectProps, connect, useIntl } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styles from './UserLayout.less';
import SelectLang from '@/components/SelectLang';
import { ConnectState } from '@/models/connect';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = props => {
  const {
    route = {
      routes: [],
    },
    children,
    location = {
      pathname: '',
    },
  } = props;

  const { routes = [] } = route;
  const { breadcrumb } = getMenuData(routes);
  const { formatMessage } = useIntl();
  const customizeTitle = formatMessage({ id: 'login.loginPage' });

  const titlePage = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    title: customizeTitle,
    ...props,
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={titlePage} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" height="100px" src="/digitech-smart.png" />
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

// export default connect(({ settings }: ConnectState) => ({ ...settings }))(
//   UserLayout,
// );

export default UserLayout;
