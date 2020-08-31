import React, { Component } from 'react';
import { Menu, Dropdown } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { connect, formatMessage, RewardReport } from 'umi';
import { ConnectState } from '@/models/connect';

export interface RewardReportProps {
    reportReward: RewardReport;
}

const RewardReportDropdown: React.FC<RewardReportProps> = props => {
  const { reportReward } = props;

  const report = () => {
    return (
      <Menu>
        <Menu.Item key="0" disabled>
          <a>
            {formatMessage({ id: 'rewardreport.totalBalanceNew' })}:
            {` ${props.reportReward.totalBalanceNew}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND
          </a>
        </Menu.Item>
        <Menu.Item key="1" disabled>
          <a>
            {formatMessage({ id: 'rewardreport.totalBalancePaid' })}:
            {` ${props.reportReward.totalBalancePaid}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" disabled>
          <a>
            {formatMessage({ id: 'rewardreport.total' })}:
            {` ${props.reportReward.total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </a>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div className="RewardReportDropdown">
      <Dropdown overlay={report}>
        <GiftOutlined />
      </Dropdown>
    </div>
  );
};

//export default RewardReportDropdown;

export default connect(({ customer }: ConnectState) => ({
    reportReward: customer.reportReward,
}))(RewardReportDropdown);
