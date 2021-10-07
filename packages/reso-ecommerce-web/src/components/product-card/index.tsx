import { TProduct } from '@/types/product';
import { Theme } from '@mui/material/styles';
import { Stack, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from '@/components/Link';
import * as React from 'react';
import { FC } from 'react';
import { Img } from 'react-image';
import clsx from 'clsx';
import ProductThumbnail from './product-thumbnail';

export type ProductCardProps = {
  product: Partial<TProduct>;
  imgStyle?: 'auto' | 'square';
};

const useProductStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    cursor: 'pointer',
    overflow: 'hidden',
    '&:hover': {
      '& $thumbnail': {
        transform: 'scale(1.03)',
      },
      '& $productTitle': {
        textDecoration: 'underline',
        'text-underline-offset': '0.03rem',
      },
    },
  },
  thumbnail: {
    borderWidth: `1px solid ${theme.palette.grey[400]}`,
    transition: 'all ease-in-out 300ms',
    height: 'auto',
  },
  squareImg: {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover',
  },
  productTitle: {
    ...theme.typography.caption,
    fontWeight: 400,
  },
}));

const ProductCard: FC<ProductCardProps> = ({
  product,
  imgStyle = 'square',
}) => {
  const { product_name, pic_url, product_id } = product;
  const classes = useProductStyles();

  const price = 100;

  const defaultImageHeight = 200;
  const defaultImageWidth = 200;

  const hasImage = pic_url && pic_url?.length !== 0;

  return (
    <Link
      href={`/products/${product_id}` || '#'}
      aria-label={`View ${product_name} product page`}
    >
      <Box className={classes.wrapper}>
        <Stack spacing={2}>
          <ProductThumbnail
            ImgProps={{
              className: clsx({
                [classes.thumbnail]: imgStyle === 'auto',
                [classes.squareImg]: imgStyle === 'square',
              }),
            }}
            src={pic_url!}
            title={product_name!}
          />

          {hasImage && (
            <Typography className={classes.productTitle} noWrap>
              {product_name}
            </Typography>
          )}

          <Typography variant="body1" noWrap>
            Từ 20.000 VND
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};

export default ProductCard;
