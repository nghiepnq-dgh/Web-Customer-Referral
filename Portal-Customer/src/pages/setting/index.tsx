import { Card, Col, Row } from 'antd';
import { ConnectState } from '@/models/connect';
import React from 'react';
import { connect, ClientSettingItem, useIntl } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface SettingProps {
    setting: ClientSettingItem;
  }

const SettingPage: React.FC<SettingProps> = props => {
    const { setting } = props;
    const { formatMessage } = useIntl();

    return (
        <PageHeaderWrapper>
            <Row gutter={16}>
            <Col span={8}>
                <Card title={formatMessage({ id: 'settingpage.siteTitle' })} bordered={false}>
                {setting?.siteTitle || '---'}
                </Card>
            </Col>
            <Col span={8}>
                <Card title={formatMessage({ id: 'settingpage.logoutUrl' })} bordered={false}>
                {setting?.logoutUrl || '---'}
                </Card>
            </Col>
            <Col span={8}>
                <Card title={formatMessage({ id: 'settingpage.registerUrl' })} bordered={false}>
                {setting?.registerUrl || '---'}
                </Card>
            </Col>
            </Row>
        </PageHeaderWrapper>
    );
}

export default connect(({ customer }: ConnectState) => ({
    setting: customer.clientSetting,
  }))(SettingPage);