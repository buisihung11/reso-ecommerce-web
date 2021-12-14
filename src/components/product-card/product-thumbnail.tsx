import { Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, BoxProps } from '@mui/system';
import React from 'react';
import { Img, ImgProps } from 'react-image';
import clsx from 'clsx';

interface Props {
  src: string;
  title?: string;
  LoaderProps?: BoxProps;
  UnloaderProps?: BoxProps;
  ImgProps?: Omit<ImgProps, 'src'>;
  imgStyle?: 'auto' | 'square';
}

const useProductStyles = makeStyles((theme: Theme) => ({
  thumbnail: {
    borderWidth: `1px solid ${theme.palette.grey[400]}`,
    transition: 'all ease-in-out 300ms',
    height: 'auto',
    width: '100%',
  },
  squareImg: {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover',
  },
}));

const ProductThumbnail = ({
  src,
  title,
  ImgProps,
  LoaderProps = {},
  UnloaderProps,
  imgStyle = 'auto',
}: Props) => {
  const classes = useProductStyles();

  return (
    <Img
      className={clsx({
        [classes.thumbnail]: imgStyle === 'auto',
        [classes.squareImg]: imgStyle === 'square',
      })}
      {...ImgProps}
      src={src}
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
            maxHeight: '400px',
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
