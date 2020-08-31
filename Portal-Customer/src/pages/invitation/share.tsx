// import emotion
import { css } from 'emotion';
import React, { useEffect, useState } from 'react';
import { ShareButtonRoundSquare, ShareBlockStandard } from 'react-custom-share';
import {
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from '@ant-design/icons';

export const ShareComponent = props => {
  const shareBlockProps = {
    url: props?.url || "empty url",
    button: ShareButtonRoundSquare,
    buttons: [
      { network: 'Twitter', icon: TwitterOutlined },
      { network: 'Facebook', icon: FacebookOutlined },
      { network: 'Email', icon: MailOutlined },
      { network: 'Linkedin', icon: LinkedinOutlined },
    ],
    text: `Referral`,
    longtext: `Invite friends with exciting events and gifts`,
  };

  return <ShareBlockStandard {...shareBlockProps} />;
};
