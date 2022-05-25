import { Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, BoxProps } from '@mui/system';
import React from 'react';
import { Img, ImgProps } from 'react-image';
import clsx from 'clsx';
import { motion } from 'framer-motion';
interface Props {
  type: string;
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
  type,
  src,
  title,
  ImgProps,
  LoaderProps = {},
  UnloaderProps,
  imgStyle = 'auto',
}: Props) => {
  const classes = useProductStyles();

  return (
    <Box
      component={motion.div}
      position={'relative'}
      top={-60}
      whileHover={
        type == 'list'
          ? {
              // scale: 1.05,
              transition: {
                type: 'ease-out',
                duration: 1,
                bounce: 0.5,
                mass: 0.5,
              },
              //opacity: 0.9,
              top: -80,
            }
          : {
              transition: {
                type: 'spring',
                duration: 1,
                bounce: 0.5,
                mass: 0.5,
              },
              opacity: 0.95,
            }
      }
    >
      <Img
        className={clsx({
          [classes.thumbnail]: imgStyle === 'auto',
          [classes.squareImg]: imgStyle === 'square',
        })}
        {...ImgProps}
        src={src}
        loader={
          <Box
            bgcolor="grey.100"
            width={type == 'list' ? '12rem' : '100%'}
            sx={{
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: type == 'list' ? '50%' : 0,
              boxShadow: '2px 0px 4px 0px',
            }}
            {...LoaderProps}
          >
            <Typography noWrap>{'Chưa có ảnh'}</Typography>
          </Box>
        }
        unloader={
          <Box
            textAlign="center"
            bgcolor="grey.100"
            width={type == 'list' ? '12rem' : '100%'}
            position="relative"
            sx={{
              aspectRatio: '1 / 1',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: type == 'list' ? '50%' : 0,
              boxShadow: '2px 0px 4px 0px',
            }}
            {...UnloaderProps}
          >
            <Typography noWrap>{'Chưa có ảnh'}</Typography>
          </Box>
        }
      />
    </Box>
  );
};

export default ProductThumbnail;
