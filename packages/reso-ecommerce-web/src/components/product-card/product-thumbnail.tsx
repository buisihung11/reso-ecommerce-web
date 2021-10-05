import { Typography } from '@mui/material';
import { Box, BoxProps } from '@mui/system';
import React from 'react';
import { Img } from 'react-image';

interface Props {
  src: string;
  title: string;
  LoaderProps?: BoxProps;
  UnloaderProps?: BoxProps;
}

const ProductThumbnail = ({
  src,
  title,
  LoaderProps = {},
  UnloaderProps,
}: Props) => {
  return (
    <Img
      src={src!}
      loader={
        <Box
          p={2}
          bgcolor="grey.100"
          width="100%"
          sx={{
            aspectRatio: '1 / 1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...LoaderProps}
        >
          {title}
        </Box>
      }
      unloader={
        <Box
          p={2}
          textAlign="center"
          bgcolor="grey.100"
          width="100%"
          position="relative"
          sx={{
            aspectRatio: '1 / 1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          {...UnloaderProps}
        >
          <Typography noWrap>{title}</Typography>
        </Box>
      }
    />
  );
};

export default ProductThumbnail;
