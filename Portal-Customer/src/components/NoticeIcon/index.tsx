import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';

export interface NoticeIconData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
}
