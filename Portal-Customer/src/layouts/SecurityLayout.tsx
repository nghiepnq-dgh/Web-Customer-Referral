import React, { useState, useEffect } from 'react';
import {
  Redirect,
  connect,
  ConnectProps,
  useLocation,
  history,
  Dispatch,
} from 'umi';
import { stringify } from 'querystring';
import { PageLoading } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { CustomerItem } from '@/models/customer';
import { getCookie } from '@/utils/cookie';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentCustomer?: CustomerItem;
  accessToken?: string;
  children: any;
  dispatch: Dispatch;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = props => {

  const { children, loading, accessToken, dispatch } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    dispatch({ type: 'customer/getMe' });  
    dispatch({ type: 'customer/getRewardReport' });  
    dispatch({ type: 'customer/getCampaign' }); 
  }, []);

  useEffect(() => {
    if (props.currentCustomer) {
      setIsReady(true);
    }
    dispatch({ type: 'customer/getClientSetting' });  
  }, [props.currentCustomer])

  const location = useLocation();

  const queryString = stringify({
    redirect: window.location.href,
  });

  const isLogin = !!accessToken;
  const ssoToken = getCookie('ssoToken');

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }

  if (!isLogin && location.pathname !== '/login') {
    return <Redirect to={`/login`} />;
  }

  if (ssoToken && ssoToken !== accessToken) {
    return <Redirect to={`/login`} />;
  }

  return children;
};

export default connect(({ customer, loading }: ConnectState) => ({
  accessToken: customer.accessToken,
  currentCustomer: customer.currentCustomer,
  loading: loading.models.customer,
}))(SecurityLayout);
