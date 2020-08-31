import React, { useEffect, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Tag, Button, Modal, Row, Col, DatePicker, Input, notification } from 'antd';
import { connect, Dispatch, useIntl, history } from 'umi';
import { ConnectState } from '@/models/connect';
import { STATUS_REFERRAL } from '@/utils/constants';
import debounce from 'lodash/debounce';
import { ReferralItem } from '@/models/referral';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import { deleteReferral } from '@/services/referral';

class Params {
  page: number = 1;
  limit: number = 10;
  startDate?: string;
  endDate?:string;
  campaignIds?:number;
  status?:string;
}

interface ReferralProps {
  dispatch: Dispatch;
  data?: ReferralItem[];
  loading: boolean;
  total:number;
}

const Referral: React.FC<ReferralProps> = props => {
  const { dispatch, loading, data, total } = props;
  const [showConfirmReferral, setShowConfirmReferral] = useState(false);
  const [ params, setParams ] = useState(new Params());
  const { formatMessage } = useIntl();

  const fetch = async () => {
    dispatch({ type: 'referral/getListReferral', payload: params });
  };

  useEffect(() => {
    fetch();
  },[params]);

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

  const onConfirmDeleteReferral = (id) => () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      title: formatMessage({ id:'referral.questionDel' }),
      onOk: onOkDeleteReferral(id),
      onCancel: onCancel,
      okText: formatMessage({ id:'common.delete' }),
      cancelText: formatMessage({ id:'common.cancel' }),
      visible: showConfirmReferral,
    });
  };

  const onCancel = () => {
    setShowConfirmReferral(false);
  }

  const onOkDeleteReferral = (id) => async () => {
    const { success, ...data } = await deleteReferral(id)
    if(success) {
      notification.success({
        message:'Delete referral succecss',
        icon: <CheckCircleOutlined style={{ color:'green' }} />
      })
    } else {
      notification.error({
        message: 'Delete referral failed',
        icon: <CloseCircleOutlined style={{ color:'red' }} />
      })
    }
  };

  const showTotal = (total: number) => {
    return formatMessage({ id: 'referral.totalItem' }, { total: total });
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

  let onChangeStartDate = (startDate) => {
    setParams({
      ...params,
      startDate
    })
  }

  onChangeStartDate = debounce(onChangeStartDate, 600);

  let onChangeEndDate = (endDate) => {
    setParams({
      ...params,
      endDate
    })
  }

  onChangeEndDate = debounce(onChangeEndDate, 600);

  let onChangeCampaignID = (id) => {
     setParams({
      ...params,
      campaignIds: id
    })
  }

  onChangeCampaignID = debounce(onChangeCampaignID, 600);

  let onChangeStatus = (status) => {
    setParams({
      ...params,
      status
    })
  }

  onChangeStatus = debounce(onChangeStatus, 600);

  const columns: ColumnProps<ReferralItem>[] = [
    {
      title: formatMessage({ id:'referral.index' }),
      key: 'stt',
      render: (v, t, i) => i + 1,
    },
    {
      title: formatMessage({ id:'referral.compaign' }),
      key: 'campaign',
      render: value => {
        const { campaign } = value;
        return (
          <>
           <Button type='link' onClick={() => history.push(`/referral/${value.id}`)}>{ campaign ? campaign.name : '' } </Button>
          </>
        )
      }
    },
    {
      title: formatMessage({ id:'referral.inviterCode' }),
      key: 'codeInviter',
      render: value => {
        const { inviter } = value;
        return (
          <>
           <p><MailOutlined /> { inviter ? inviter.email : '' } </p>
           <p>Code: { inviter ? <Tag color='blue'>{inviter.id}</Tag> : <Tag>No code</Tag> } </p> 
          </>
        )
      }
    },
    {
      title: formatMessage({ id:'referral.inviteeCode' }),
      key: 'codeInvitee',
      render: value => {
        const { invitee } = value;
        return (
          <>
           <p><MailOutlined /> { invitee ? invitee.email : '' } </p>
           <p>Code: { invitee ? <Tag color='blue'>{invitee.id}</Tag> : <Tag>No code</Tag> } </p> 
          </>
        )
      }
    },
    {
      title: formatMessage({ id:'common.status' }),
      dataIndex: 'status',
      key: 'status',
      render: value => checkStatus(value),
    },
    {
      title: formatMessage({ id:'referral.datetime' }),
      key: 'createdAt',
      render: value => {
        return (
          <>
            <p>{formatMessage({ id:'referral.createdAt' })} {value ? <p>{dayjs(value.createdAt).format('DD-MM-YYYY')}</p> : ''}</p>
            <p>{formatMessage({ id:'referral.updatedAt' })} {value ? <p>{dayjs(value.updatedAt).format('DD-MM-YYYY')}</p> : ''}</p>
          </>
        )
      }
    },
    // {
    //   title: formatMessage({ id:'common.action' }),
    //   align: 'center',
    //   key: 'action',
    //   render: value => {
    //     return (
    //       <div>
    //         <Button type="primary" danger onClick={onConfirmDeleteReferral(value.id)}>
    //           <DeleteOutlined /> {formatMessage({ id:'common.delete' })}
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div>
      <Card extra={
        <Row gutter={16}>
          <Col span={6}>
            <DatePicker style={{ width: '100%' }} onChange={onChangeStartDate} placeholder={formatMessage({ id:'common.startDate' })} name="startDate" format="DD-MM-YYYY" allowClear />
          </Col>
          <Col span={6}>
            <DatePicker style={{ width: '100%' }} onChange={onChangeEndDate} placeholder={formatMessage({ id:'common.endDate' })} name="endDate" format="DD-MM-YYYY" allowClear />
          </Col>
          <Col span={6}>
            <Input.Search onChange={e => onChangeCampaignID(e.target.value)} placeholder={formatMessage({ id:'referral.campaignID' })} name="campaignIds" allowClear />
          </Col>
          <Col span={6}>
            <Input.Search onChange={e => onChangeStatus(e.target.value)} placeholder={formatMessage({ id:'common.status' })} name="status" allowClear />
          </Col>
        </Row>
      }>
        <Table 
          scroll={{ x: 1024 }}
          columns={columns} 
          dataSource={data} 
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

export default connect(({ referral, loading }: ConnectState) => ({
  data: referral.listReferral,
  loading: loading.effects['referral/getListReferral'],
  total: referral.total
}))(Referral);
