import { TProduct } from '@/types/product';
import { Box, Button, Stack, Typography } from '@mui/material';
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
    borderWidth: `1px solid ${theme.palette.grey[100]}`,
    transition: 'all ease-in-out 300ms',
    height: 'auto',
  },
  squareImg: {
    width: '12rem',
    aspectRatio: '1/1',
    objectFit: 'cover',
    borderRadius: '50%',
    boxShadow: '1px 1px 1px 1px',
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
    // <Box
    //   sx={{
    //     minHeight: { xs: '16rem', sm: '18rem', lg: '20rem' },
    //     ':hover': { borderWidth: 1 },
    //     borderWidth: 0.5,
    //   }}
    // >
    //   <Box className={classes.wrapper}>
    //     <Stack spacing={2} justifyContent="center" alignItems={'center'}>
    //       <ProductThumbnail
    //         ImgProps={{
    //           className: clsx({
    //             [classes.thumbnail]: imgStyle === 'auto',
    //             [classes.squareImg]: imgStyle === 'square',
    //           }),
    //         }}
    //         src={pic_url!}
    //         title={product_name!}
    //       />

    //       {/* {hasImage && <Typography variant="h6">{product_name}</Typography>} */}
    //       <Box paddingLeft={1} textAlign="center">
    //         <Typography variant="h6">{product_name}</Typography>
    //         <Typography variant="body1" noWrap>
    //           {price} vnđ
    //         </Typography>
    //       </Box>
    //     </Stack>
    //   </Box>
    // </Box>
    <Box
      sx={{
        minHeight: { xs: '15rem', md: '18rem', lg: '22rem' },
        ':hover': { borderWidth: 1 },
        borderWidth: 0.5,
        borderRadius: 5,
        bgcolor: '#FFFFFF',
        // boxShadow: '1px -1px 2px 0px',
      }}
    >
      <Stack
        paddingY={'1rem'}
        marginBottom="2rem"
        justifyContent="center"
        alignItems={'center'}
      >
        <ProductThumbnail
          type="list"
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

        <Box paddingX={'2rem'} height="2rem" textAlign={'center'}>
          <Typography variant="h4">{product_name}</Typography>
        </Box>
      </Stack>
      <Box className={classes.wrapper}>
        <Box
          marginX={'2rem'}
          textAlign="center"
          justifyContent={'space-between'}
          sx={{ borderTopStyle: 'dashed', borderTopWidth: 1 }}
          paddingY="1rem"
          display={'flex'}
        >
          <Typography variant="h6" noWrap>
            {price} vnđ
          </Typography>
          <Button variant="outlined" sx={{ borderRadius: 2 }}>
            Thêm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
