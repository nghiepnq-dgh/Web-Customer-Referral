import React from 'react';

interface SecurityProps {
  src?: string;
}

const Security: React.FC<SecurityProps> = props => {
  const { src } = props;

  return <img height="100px" width="100px" src={src} />;
};

export default Security;
