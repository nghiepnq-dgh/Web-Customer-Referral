import React, { useEffect, useState } from 'react';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch, useIntl } from 'umi';
import { RewardsItem } from '@/models/reward';
import { ColumnProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Card, Modal, Table, Tag, Row, Col, Radio, AutoComplete } from 'antd';
import {
  ExclamationCircleOutlined,
  MoneyCollectOutlined,
  RightCircleFilled,
  RightCircleOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import { StatusReward } from '../../../utils/constants';
import { max } from 'lodash';

class Params {
  page: number = 1;
  limit: number = 10;
  startDate?: string;
  endDate?: string;
  referralIds?: number;
  status?: string;
}

interface RewardProps {
  data: RewardsItem[];
  loading: boolean;
  dispatch: Dispatch;
  total: number;
}

const Reward: React.FC<RewardProps> = props => {
  const { loading, data, dispatch, total } = props;
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [showConfirmReward, setShowConfirmReward] = useState(false);
  const [params, setParams] = useState(new Params());
  const { formatMessage } = useIntl();

  const fetch = async () => {
    dispatch({ type: 'reward/getListRewards', payload: params });
  };

  useEffect(() => {
    fetch();
  }, [params]);

  const onCancel = () => {
    setVisibleAdd(false);
    setVisibleEdit(false);
  };

  const onConfirmDeleteReward = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: formatMessage({ id: 'reward.questionDel' }),
      onOk: onOkDeleteCampaign,
      onCancel: onCancel,
      okText: formatMessage({ id: 'common.delete' }),
      cancelText: formatMessage({ id: 'common.cancel' }),
      visible: showConfirmReward,
    });
  };

  const showTotal = (total: number) => {
    return formatMessage({ id: 'common.totalItem' }, { total: total });
  };

  const onOkDeleteCampaign = () => {
    alert('Delete reward successfuld!');
  };

  let onChangeReferralID = (id: any) => {
    setParams({
      ...params,
      referralIds: id,
    });
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

  onChangeReferralID = debounce(onChangeReferralID, 600);

  let onChangeStatus = (status: string) => {
    setParams({
      ...params,
      status,
    });
  };

  onChangeStatus = debounce(onChangeStatus, 600);

    const showStatus = (value: string) => {
        switch (value) {
            case StatusReward.NEW:
                return (
                    <Tag color="blue">{formatMessage({ id: 'common.status.NEW' })}</Tag>
                );
            case StatusReward.PAID:
                return (
                    <Tag color="yellow">
                        {formatMessage({ id: 'common.status.PAID' })}
                    </Tag>
                );
            case StatusReward.LOCK:
                return (
                    <Tag color="red">{formatMessage({ id: 'common.status.LOCK' })}</Tag>
                );
            default: return '---';
        }
    };

  const columns: ColumnProps<RewardsItem>[] = [
    {
      title: formatMessage({ id: 'reward.index' }),
      key: 'index',
      width: 20,
      align: "center",
      render: (v, t, i) => i + 1,
    },
    {
      title: formatMessage({ id: 'reward.account' }),
      key: 'account',
      align: "center",
      width: 300,
      render: value => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p text-align="Center">
                {value.customer.name}<br/>
                {value.customer.email}
            </p>
          </div>
        );
      },
    },
    {
        title: formatMessage({ id: 'reward.amount' }),
        key: 'amount',
        render: value => {
            return(
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p>
                    {value.amount ? `${value.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}{' '}
                        <Tag color="green">{value.currency || ''}</Tag>
                    </p>
                    <hr />
            <p>{(value.description !== null) ? (<i>{value.description}</i>) : (<i>Description...</i>)}</p>
              </div>
            );
        },
    },
    {
      title: formatMessage({ id: 'reward.paymentOrder' }),
      key: 'paymentOrder',
      //dataIndex: 'paymentOrder',
      width: 150,
      align: "center",
      render: value => {
          return(
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>
                    {value && value.paymentOrder && value.paymentOrder.amount ? `${value.paymentOrder.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}{' '}
                    <Tag color="green">{value.currency || ''}</Tag>
                </p>
            </div>
          );
      },
    },
    {
        title: formatMessage({ id: 'common.status' }),
        key: 'status',
        dataIndex: 'status',
        width: 100,
        align: "center",
        render: value => showStatus(value) ,
    },
    {
      title: formatMessage({ id: 'referral.datetime' }),
      key: 'createdAt',
      align: "right",
      width: 150,
      render: value => {
        return (
          <>
            <p>
              {formatMessage({ id: 'referral.createdAt' })}{' '}
              {value ? (<p>{dayjs(value.createdAt).format('DD/MM/YYYY')}</p>) : ('')}
            </p>
            <p>
              {formatMessage({ id: 'referral.updatedAt' })}{' '}
              {value ? (
                <p>{dayjs(value.updatedAt).format('DD/MM/YYYY')}</p>
              ) : (
                ''
              )}
            </p>
          </>
        );
      },
    },
    // {
    //   title: formatMessage({ id: 'common.action' }),
    //   align: 'center',
    //   key: 'action',
    //   render: () => {
    //     return (
    //       <div style={{ display: 'flex', flexDirection: 'row' }}>
    //         <Button
    //           onClick={() => setVisibleEdit(true)}
    //           style={{ marginRight: 10 }}
    //         >
    //           <EditOutlined /> {formatMessage({ id: 'common.edit' })}
    //         </Button>
    //         <Button type="primary" danger onClick={onConfirmDeleteReward}>
    //           <DeleteOutlined /> {formatMessage({ id: 'common.delete' })}
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <Card
        extra={
          <Row gutter={32}>
              <Col span={32}>
                <Radio.Group
                  defaultValue=""
                  buttonStyle="solid"
                  name="role"
                  onChange={e => onChangeStatus(e.target.value)}
                >
                  <Radio.Button value="">
                    {' '}
                    {formatMessage({ id: 'common.all' })}{' '}
                  </Radio.Button>
                  <Radio.Button value="new">
                    {' '}
                    {formatMessage({ id: 'common.new' })}{' '}
                  </Radio.Button>
                  <Radio.Button value="paid">
                    {' '}
                    {formatMessage({ id: 'common.paid' })}{' '}
                  </Radio.Button>
                  <Radio.Button value="lock">
                    {' '}
                    {formatMessage({ id: 'common.lock' })}{' '}
                  </Radio.Button>
                </Radio.Group>
              </Col>
          </Row>
        }
      >
        <Table
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
    </div>
  );
};

export default connect(({ reward, loading }: ConnectState) => ({
  data: reward.listRewards || [],
  total: reward.total,
  loading: loading.effects['reward/getListRewards'],
}))(Reward);
