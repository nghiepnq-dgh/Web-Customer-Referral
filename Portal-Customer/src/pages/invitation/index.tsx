import React, { useEffect, useState } from 'react';
import {
  connect,
  Dispatch,
  CustomerItem,
  InvitationItem,
  useIntl,
  ClientSettingItem,
  CampaignItem,
} from 'umi';
import { ConnectState } from '@/models/connect';
import { ShareComponent } from './share';
import debounce from 'lodash/debounce';
import {
  Table,
  Card,
  Button,
  Avatar,
  Row,
  Col,
  Input,
  Tooltip,
  Form,
  notification,
} from 'antd';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  MailOutlined,
  CopyOutlined,
  SendOutlined,
  DollarCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { createInvitaion } from '@/services/invitation.service';
import dayjs from 'dayjs';
import { getClientSetting } from '@/services/clientSetting';
class Params {
  page: number = 1;
  limit: number = 10;
  emailInvitee?: string;
}

interface InvitationProps {
  dispatch: Dispatch;
  data: InvitationItem[];
  loading: boolean;
  customer: CustomerItem;
  total: number;
  setting: ClientSettingItem;
  campaign: CampaignItem;
}

const InvitationPage: React.FC<InvitationProps> = props => {
  const { dispatch, loading, data, customer, total, setting, campaign } = props;
  const [form] = Form.useForm();
  const [params, setParams] = useState(new Params());
  const { formatMessage } = useIntl();
  const zalo = `<div class="zalo-share-button" data-href=${setting?.registerUrl}inviter=${customer.id} data-oaid="579745863508352884" data-layout=4 data-color="blue" data-customize=false>`;
  const fetch = async () => {
    dispatch({ type: 'invitation/listInvitation', payload: { ...params } });
  };

  useEffect(() => {
    fetch();
  }, [params]);

  useEffect(() => {}, [customer]);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sp.zalo.me/plugins/sdk.js';
    script.async = true;
    document.body.appendChild(script);
  });

  const onFinish = async (value: any) => {
    const result = await createInvitaion(value);
    if (result && result.success) {
      notification.success({
        message: 'Send success!',
      });
      form.resetFields();
    }
  };

  let onSearchEmailInvitee = (emailInvitee: string) => {
    setParams({
      ...params,
      emailInvitee,
    });
  };

  onSearchEmailInvitee = debounce(onSearchEmailInvitee, 600);

  const showTotal = (total: number) => {
    return formatMessage({ id: 'invitation.totalItem' }, { total: total });
  };

  const onTableChange = (page: number) => {
    const newParams = { ...params };
    if (params.page !== page) {
      newParams.page = page;
    }

    setParams(newParams);
  };

  const onShowSizeChange = (current: number, size: number) => {
    return setParams({
      ...params,
      limit: size,
    });
  };

  const columns: ColumnProps<InvitationItem>[] = [
    {
      title: formatMessage({ id: 'invitation.index' }),
      key: 'index',
      width: 40,
      render: (v, t, i) => i + 1,
    },
    {
      title: formatMessage({ id: 'invitation.emailInvitee' }),
      dataIndex: 'emailInvitee',
      key: 'emailInvitee',
      width: 200,
      render: value => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Avatar size={50} icon={<MailOutlined />} />
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10,
                margin: 0,
              }}
            >
              {value || ''}
            </p>
          </div>
        );
      },
    },
    {
      title: formatMessage({ id: 'invitation.createdAt' }),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: value => (value && dayjs(value).format('DD-MM-YYYY')) || '',
    },
  ];
  return (
    <PageHeaderWrapper>
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={[16, 24]} justify="center">
          <Col span={24} style={{ textAlign: 'center', padding: 30 }}>
            <h2> {formatMessage({ id: 'invitation.title1' })} </h2>
            <p style={{ fontSize: 15 }}>
              {' '}
              {campaign && campaign.description ? campaign.description : formatMessage({ id: 'invitation.subTitle1' })}{' '}
            </p>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]} justify="center">
              <Col span={12}>
                <Form form={form} onFinish={onFinish}>
                  <Row gutter={[16, 1]} justify="center">
                    <Col span={16}>
                      <Form.Item
                        name="emailInvitee"
                        rules={[
                          {
                            required: true,
                            message: formatMessage({
                              id: 'invitation.reqEmail',
                            }),
                          },
                          {
                            type: 'email',
                            message: formatMessage({
                              id: 'invitation.valEmail',
                            }),
                          },
                        ]}
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Input
                          prefix={
                            <MailOutlined className="site-form-item-icon" />
                          }
                          placeholder={formatMessage({
                            id: 'invitation.enterEmail',
                          })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item shouldUpdate={true}>
                        {() => (
                          <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                              !form.isFieldsTouched(true) ||
                              form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length
                            }
                          >
                            <SendOutlined />{' '}
                            {formatMessage({ id: 'invitation.send' })}
                          </Button>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col span={13}>
                <Row gutter={16} justify="center">
                  <Col
                    span={3}
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: 500,
                      lineHeight: 2,
                      padding: 0,
                    }}
                  >
                    <i> {formatMessage({ id: 'invitation.yourCode' })} </i>
                  </Col>
                  <Col span={5}>
                    <Input
                      value={customer.id || ''}
                      disabled
                      style={{ width: 150, marginRight: 15 }}
                    />
                  </Col>
                  <Col span={2}>
                    <Tooltip title="Copy">
                      <Button shape="circle">
                        <CopyOutlined />
                      </Button>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <h4> {formatMessage({ id: 'invitation.inviteViaSocial' })} </h4>
            </Col>
            <Row gutter={[10, 10]} justify="center">
              <Col span={10}>
                {customer.id ? (
                   <Row  span={24} type="flex" justify="center">
                    <Col span={4}>
                      <div
                        className={styles.btnZalo}
                        dangerouslySetInnerHTML={{ __html: zalo }}
                      />
                    </Col>
                    <Col span={14}>
                      <ShareComponent
                        url={`${setting?.registerUrl}?inviter=${customer.id}`}
                      />
                    </Col>
                  </Row>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: 20 }}>
        <Row gutter={[16, 16]} justify="center">
          <Col
            span={24}
            style={{ textAlign: 'center', padding: 20, fontSize: 20 }}
          >
            <h1> {formatMessage({ id: 'invitation.title2' })} </h1>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <MailOutlined style={{ fontSize: 40, marginBottom: 20 }} />
            <p style={{ fontSize: 16 }}>
              {' '}
              {formatMessage({ id: 'invitation.how1' })}{' '}
            </p>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <DollarCircleOutlined style={{ fontSize: 40, marginBottom: 20 }} />
            <p style={{ fontSize: 16 }}>
              {formatMessage({ id: 'invitation.how2' })}
            </p>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <WalletOutlined style={{ fontSize: 40, marginBottom: 20 }} />
            <p style={{ fontSize: 16 }}>
              {formatMessage({ id: 'invitation.how3' })}
            </p>
          </Col>
        </Row>
      </Card>
      <Card
        title={formatMessage({ id: 'invitation.list' })}
        extra={
          <Row gutter={16} style={{ width: 300 }}>
            <Col span={24}>
              <Input.Search
                name="emailInvitee"
                placeholder={formatMessage({ id: 'invitation.searchBy' })}
                onChange={e => onSearchEmailInvitee(e.target.value)}
                allowClear
              />
            </Col>
          </Row>
        }
      >
        <Table
          scroll={{ x: 1024 }}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            showSizeChanger: true,
            current: params.page,
            pageSize: params.limit,
            total: total,
            showTotal: showTotal,
            onChange: onTableChange,
            onShowSizeChange: onShowSizeChange,
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading, invitation, customer }: ConnectState) => ({
  data: invitation.listInvitations,
  total: invitation.totalListInvitations,
  customer: customer.currentCustomer,
  setting: customer.clientSetting,
  campaign: customer.campaign,
  loading: loading.effects['invitation/listInvitation'],
}))(InvitationPage);
