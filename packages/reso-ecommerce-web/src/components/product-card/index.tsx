import { TProduct } from '@/types/product';
import { Theme } from '@mui/material/styles';
import { Stack, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import * as React from 'react';
import { FC } from 'react';
import { Img } from 'react-image';

type Props = {
  product: Partial<TProduct>;
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
  },
  productTitle: {
    ...theme.typography.caption,
    fontWeight: 400,
  },
}));

const ProductCard: FC<Props> = ({ product }) => {
  const { product_name, pic_url, product_id } = product;
  const classes = useProductStyles();
  // const price = formatPrice(
  //   priceRangeV2.minVariantPrice.currencyCode,
  //   priceRangeV2.minVariantPrice.amount,
  // );
  const price = 100;

  const defaultImageHeight = 200;
  const defaultImageWidth = 200;

  const hasImage = pic_url && pic_url?.length !== 0;

  return (
    <Link
      href={`/products/${product_id}` || '#'}
      aria-label={`View ${product_name} product page`}
      passHref
    >
      <a>
        <Box className={classes.wrapper}>
          <Stack spacing={2}>
            <Img
              className={classes.thumbnail}
              src={pic_url!}
              height="auto"
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
                >
                  {product_name}
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
                >
                  <Typography className={classes.productTitle} noWrap>
                    {product_name}
                  </Typography>
                </Box>
              }
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
      </a>
    </Link>
  );
};

export default ProductCard;
