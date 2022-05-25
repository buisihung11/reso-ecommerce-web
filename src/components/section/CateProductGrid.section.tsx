import { TProduct } from '@/types/product';
import React from 'react';
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
  CardHeader,
} from '@mui/material';
import { TCategory } from '@/types/category';
import { Img } from 'react-image';
import ProductGridSection from './ProductGrid.section';

interface CateProductSectionProps {
  category: TCategory;
  products: TProduct[];
}

const CateProductGridSection = ({
  products,
  category,
}: CateProductSectionProps) => {
  return (
    <>
      {category && (
        <Typography variant="h3" textAlign={'center'}>
          Tất cả sản phẩm {category.cate_name}
        </Typography>
      )}
      {products ? (
        products.map((pro) => (
          // <Box paddingY={'1rem'} paddingX={{ xs: '10vw', md: '20vw' }}>
          //   <Card>
          //     <CardActionArea href={`/products/${pro.product_id}`}>
          //       <Stack
          //         display={'flex'}
          //         flexDirection="row"
          //         sx={{ width: '100vw', height: '25vh' }}
          //       >
          //         {/* <Box
          //           width={'20vw'}
          //           height="100%"
          //           sx={{
          //             backgroundRepeat: 'no-repeat',
          //             backgroundSize: 'cover',
          //             backgroundImage: `url(${pro.pic_url})`,
          //           }}
          //         /> */}
          //         <Img
          //           width={'15%'}
          //           src={pro.pic_url}
          //           loader={
          //             <Box
          //               p={2}
          //               bgcolor="grey.100"
          //               width="15%"
          //               sx={{
          //                 aspectRatio: '1 / 1',
          //                 display: 'flex',
          //                 justifyContent: 'center',
          //                 alignItems: 'center',
          //               }}
          //             >
          //               <Typography noWrap>{'Chưa có ảnh'}</Typography>
          //             </Box>
          //           }
          //           unloader={
          //             <Box
          //               p={2}
          //               textAlign="center"
          //               bgcolor="grey.100"
          //               width="15%"
          //               position="relative"
          //               sx={{
          //                 aspectRatio: '1 / 1',
          //                 display: 'flex',
          //                 justifyContent: 'center',
          //                 alignItems: 'center',
          //                 maxHeight: '400px',
          //               }}
          //             >
          //               <Typography noWrap>{'Chưa có ảnh'}</Typography>
          //             </Box>
          //           }
          //         />

          //         <CardContent>
          //           <Typography gutterBottom variant="h4" component="div">
          //             {pro.product_name}
          //           </Typography>
          //           <Typography variant="h6" color="text.secondary">
          //             {pro.price + 'đ'}
          //           </Typography>
          //           <Typography variant="body2" color="text.secondary">
          //             {pro.description}
          //           </Typography>
          //         </CardContent>
          //       </Stack>
          //     </CardActionArea>
          //   </Card>
          // </Box>
          <Box paddingY="4rem">
            <ProductGridSection products={products} />
          </Box>
        ))
      ) : (
        <Box>Không tìm thấy sản phẩm của danh mục {category.cate_name}</Box>
      )}
    </>
  );
};

export default CateProductGridSection;
