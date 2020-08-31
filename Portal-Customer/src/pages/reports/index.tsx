import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tabs } from 'antd';
const { TabPane } = Tabs;
import Balance from './referral/index';
import Reward from './reward/index';
import { formatMessage } from 'umi';

const Report = props => {
  return (
    <PageHeaderWrapper>
      <Card>
        <Tabs>
          <TabPane tab={formatMessage({ id:'report.referral' })} key="1">
            <Balance />
          </TabPane>
          <TabPane tab={formatMessage({ id:'report.reward' })} key="2">
            <Reward />
          </TabPane>
        </Tabs>
      </Card>
    </PageHeaderWrapper>
  )
}

export default Report;