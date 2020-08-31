import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Tag, Row, Col, Descriptions, Button, Divider, Statistic, PageHeader } from 'antd';
import { useParams, formatMessage, history } from 'umi';
import { getDetailReferral } from '@/services/referral';
import { STATUS_REFERRAL } from '@/utils/constants';
import { PhoneOutlined, MailOutlined, ArrowUpOutlined, ArrowDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';


const DetailReferral = props => {

  const { id } = useParams();
  const [ detailReferral, setDetailReferral ] = useState({});
  const { inviter, invitee, campaign } = detailReferral;

  const fetch = async (id) => {
    const { success, ...data } = await getDetailReferral(id);
    setDetailReferral({ ...data });
  }

  useEffect(() => {
    fetch(id);
  },[id]);

  const checkStatus = status => {
    switch (status) {
      case STATUS_REFERRAL.ACTIVE:
        return <Tag color="green">{formatMessage({ id:`common.${status}` })}</Tag>;
      case STATUS_REFERRAL.DEACTIVE:
        return <Tag color="red">{formatMessage({ id:`common.${status}` })}</Tag>;
      default:
        return '';
    }
  };

  const dateTimeCampaign = (
    <Row gutter={[16,16]} style={{ width: 350 }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} span={12}>
        <p> {formatMessage({ id:'referral.startDate' })} {campaign && dayjs(campaign.startDate).format('DD-MM-YYYY') || '' } </p>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12} span={12}>
        <p> {formatMessage({ id:'referral.endDate' })} {campaign && dayjs(campaign.endDate).format('DD-MM-YYYY') || '' } </p>
      </Col>
    </Row>
  )

  const renderRewardType = (rewardType) => {
    switch(rewardType) {
      case 'PERCENT_ORDER':
        return <p>%</p>
      case 'VND':
        return <p>VND</p>
      default: 
        return ''
    }
  }

  const onFormatInviterReward = () => {
    return (
      <div>{ campaign && campaign.rewardInviterAmount || '' }</div>
    )
  }

  const onFormatInviteeReward = () => {
    return (
      <div>{ campaign && campaign.rewardInviteeAmount || '' }</div>
    )
  }

  const renderTitleReferral = (
    <PageHeader
      className="site-page-header"
      onBack={() => history.goBack()}
      title={formatMessage({ id:'referral.referralDetail' })}
    />
  )

  return (
    <PageHeaderWrapper>
      <Card title={renderTitleReferral} extra={checkStatus(detailReferral.status)}>
        <Row gutter={[16,16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12} >
            <Card bordered>
              <Descriptions column={4} colon={false}>
                <Descriptions.Item span={4}>
                  <h1>{campaign && campaign.name || ''}</h1>
                  {dateTimeCampaign}
                </Descriptions.Item>
              </Descriptions>
              <Row gutter={[16,16]}>
                <Col span={24}>
                  <div className="site-statistic-demo-card">
                    <Row gutter={[16,16]}>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Card>
                          <Statistic
                            title={formatMessage({ id:'referral.inviterReward' })}
                            formatter={onFormatInviterReward}
                            valueStyle={{ color: '#3f8600', fontSize: 38 }}
                            suffix={ campaign ? renderRewardType(campaign.rewardInviterType) : ''}
                          />
                        </Card>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        <Card>
                          <Statistic
                            title={formatMessage({ id:'referral.inviteeReward' })}
                            formatter={onFormatInviteeReward}
                            valueStyle={{ color: '#cf1322', fontSize: 38 }}
                            suffix={campaign ? renderRewardType(campaign.rewardInviteeType) : ''}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={24}>
                  <p><i style={{ color:'#737373', fontWeight:  500 }}>{formatMessage({ id:'referral.description' })}:</i> { campaign ? campaign.description : <Tag><ExclamationCircleOutlined /> No description</Tag> }</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12} >
            <Row gutter={[16,16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Card title={formatMessage({ id:'referral.inviter' })}>
                  <Descriptions colon={false} column={2}>
                    <Descriptions.Item>
                      <h2><Button type='link' onClick={() => history.push(`/customers/${inviter.id}`)}>{inviter && inviter.name || ''}</Button></h2>
                    </Descriptions.Item>
                    <Descriptions.Item label="Code">
                      <Tag color='blue'>{inviter && inviter.id || ''}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider orientation='left'>{formatMessage({ id:'referral.contact' })}</Divider>
                  <Descriptions column={2}>
                    <Descriptions.Item span={2}>
                      <Button shape='circle'><PhoneOutlined /></Button> {inviter && inviter.phone || ''}
                    </Descriptions.Item>
                    <Descriptions.Item span={2}>
                      <Button shape='circle'><MailOutlined /></Button> {inviter && inviter.email || ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Card title={formatMessage({ id:'referral.invitee' })}>
                  <Descriptions colon={false} column={2}>
                    <Descriptions.Item>
                      <h2><Button type='link' onClick={() => history.push(`/customers/${invitee.id}`)}>{invitee && invitee.name || ''}</Button></h2>
                    </Descriptions.Item>
                    <Descriptions.Item label="Code">
                      <Tag color='blue'>{invitee && invitee.id || ''}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                  <Divider orientation='left'>{formatMessage({ id:'referral.contact' })}</Divider>
                  <Descriptions column={2}>
                    <Descriptions.Item span={2}>
                      <Button shape='circle'><PhoneOutlined /></Button> {invitee && invitee.phone || ''}
                    </Descriptions.Item>
                    <Descriptions.Item span={2}>
                      <Button shape='circle'><MailOutlined /></Button> {invitee && invitee.email || ''}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>       
      </Card>
    </PageHeaderWrapper>
  );
};

export default DetailReferral;