import React, { useEffect } from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Profile = props => {
  
  return (
    <PageHeaderWrapper>
      <Card>
        <h1> This profile of customer ! </h1>     
      </Card>
    </PageHeaderWrapper>
  )
}

export default Profile;