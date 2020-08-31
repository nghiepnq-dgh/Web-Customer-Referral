import React, { useEffect, useState } from 'react';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch, useIntl } from 'umi';
import { RewardsItem } from '@/models/reward';
import { ColumnProps } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Card, Modal, Table, Tag, Row, Col, Radio } from 'antd';
import {
  ExclamationCircleOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import debounce from 'lodash/debounce';
import { StatusReward } from '../../../utils/constants';

const columns: ColumnProps<RewardsItem>[] = [
  {
    title: formatMessage({ id: 'reward.referralID' }),
    dataIndex: 'referral.id',
    key: 'referral.id',
    render: (value, row) => (
      <Button
        type="link"
        onClick={() => history.push(`/referral/${row.referral.id}`)}
      >
        {' '}
        {(row.referral && row.referral.id) || ''}{' '}
      </Button>
    ),
  },
  {
    title: formatMessage({ id: 'customer.email' }),
    dataIndex: 'customer.email',
    key: 'customer.email',
    align: 'center',
    render: (value, row) => (
      <div>
        <Button
          type="link"
          onClick={() => history.push(`/customers/${row?.customer?.id}`)}
        >
          {row?.customer?.name || ''}
        </Button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            {(row.customer && row.customer.email) || ''}{' '}
            <Tag color="blue">{(row.customer && row.customer.id) || ''}</Tag>
          </p>
        </div>
      </div>
    ),
  },
  {
    title: formatMessage({ id: 'reward.amount' }),
    key: 'amount',
    render: value => {
      const { referral } = value;
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p>
            <MoneyCollectOutlined />{' '}
            {value && value.amount
              ? `${value.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : 0}{' '}
            <Tag color="green">{value.currency || ''}</Tag>
          </p>
          <i>
            <span style={{ fontWeight: 500, color: '#999999' }}>
              {' '}
              {formatMessage({ id: 'reward.description' })}{' '}
            </span>{' '}
            {value ? value.description : ''}
          </i>
        </div>
      );
    },
  },
  {
    title: formatMessage({ id: 'reward.price_order' }),
    dataIndex: 'paymentOrder.amount',
    key: 'paymentOrder.amount',
    render: (value, row) => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          {row.paymentOrder && row.paymentOrder.amount
            ? `${row.paymentOrder.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : 0}{' '}
          <Tag color="green">
            {(row.paymentOrder && row.paymentOrder.currency) || ''}
          </Tag>
        </p>
      </div>
    ),
  },
  {
    title: formatMessage({ id: 'common.status' }),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: value => (
      <>
        {' '}
        {value === 'new' ? (
          <Tag color="green"> {formatMessage({ id: 'common.new' })} </Tag>
        ) : value === 'paid' ? (
          <Tag color="blue"> {formatMessage({ id: 'common.paid' })} </Tag>
        ) : (
          <Tag color="red"> {formatMessage({ id: 'common.lock' })} </Tag>
        )}{' '}
      </>
    ),
  },
  {
    title: formatMessage({ id: 'common.action' }),
    align: 'center',
    key: 'action',
    render: row => {
      return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            onClick={() => handleEdit(row.id)}
            style={{ marginRight: 10 }}
          >
            <EditOutlined /> {formatMessage({ id: 'common.edit' })}
          </Button>
          <Button type="primary" danger onClick={onConfirmDeleteReward}>
            <DeleteOutlined /> {formatMessage({ id: 'common.delete' })}
          </Button>
          {/* <Dropdown overlay={menu(value)}>
    <Button>
    <EllipsisOutlined />
    </Button>
    </Dropdown> */}
        </div>
      );
    },
  },
];
