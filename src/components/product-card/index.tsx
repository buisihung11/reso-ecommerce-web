import { TProduct } from '@/types/product';
import { Box, Card, Stack, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import * as React from 'react';
import { FC } from 'react';
import ProductThumbnail from './product-thumbnail';

export type ProductCardProps = {
  product: Partial<TProduct>;
  imgStyle?: 'auto' | 'square';
  navigate?: boolean;
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
  navigate = true,
}) => {
  const { product_name, pic_url, product_id, product_in_menu, product_type } =
    product;
  const classes = useProductStyles();
  const hasImage = pic_url && pic_url?.length !== 0;
  const price = product.product_in_menu?.price1 ?? product.price;

  return (
    <Card
      sx={{
        minHeight: { xs: '16rem', sm: '18rem', lg: '20rem' },
        ':hover': { borderWidth: 0.5 },
      }}
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

          {/* {hasImage && <Typography variant="h6">{product_name}</Typography>} */}
          <Box paddingLeft={1}>
            <Typography variant="h6">{product_name}</Typography>
            <Typography variant="body1" noWrap>
              {price} vnđ
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};

export default ProductCard;
