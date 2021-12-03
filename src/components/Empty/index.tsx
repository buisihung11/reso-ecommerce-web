import React from 'react';
import { Box } from '@mui/material';

const emtpySvg = '/static/illustrations/empty-store.svg';

interface Props {}

const Empty = (props: Props) => {
  return (
    <Box component="img" alt="Empty store" src={emtpySvg} maxWidth="600px" />
  );
};

export default Empty;
