import Empty from '@/components/Empty';
import Link from '@/components/Link';
import ProductCard from '@/components/product-card';
import ProductModal from '@/components/product-modal/ProductModal';
import ProductBuilderProvider from '@/contexts/ProductBuilderContext';
import { StoreContext } from '@/contexts/store-context';
import useAddItem from '@/hooks/cart/useAddItem';
import useCombo from '@/hooks/combos/useCombo';
import useComboBuilder from '@/hooks/combos/useComboBuilder';
import useProduct from '@/hooks/product/useProduct';
import { CartItem } from '@/types/cart';
import { ArrowBack, ArrowLeft, ArrowLeftOutlined } from '@mui/icons-material';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  imgStyle?: any;
}

const ComboViewSection = ({ imgStyle }: Props) => {
  const router = useRouter();
  const { comboId } = router.query;
  const context = useContext(StoreContext);
  const { mutateAsync: addItemToCart } = useAddItem();
  const { data: combo, isLoading, error } = useCombo({ id: Number(comboId) });
  const [productDetailid, setProductDetailid] = useState<number | null>(null);

  const {
    currentStep,
    choiceGroups,
    choice,
    hasCompletedChoice,
    reset,
    buildComboCartItem,
    selectedChoices,
    fixedGroups,
  } = useComboBuilder(combo);
  const { isLoading: loadingDetail, data: productDetail } = useProduct({
    id: productDetailid,
  });
  const currentGroup = choiceGroups[currentStep];
  const { pic_url, product_name } = combo || {};

  useEffect(() => {
    if (hasCompletedChoice) {
      const combo = buildComboCartItem();
      addItemToCart({ ...combo, quantity: 1 } as CartItem)
        .then(() => context.setChangeShowReviewCart(true))
        .catch((error) => {
          toast((error as any).message, {
            type: 'error',
          });
        });
    }
  }, [hasCompletedChoice]);

  const renderSelected = () => {
    return (
      <Stack
        direction="row"
        spacing={1}
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        py={2}
      >
        {fixedGroups.map((g) => (
          <AvatarGroup sx={{ justifyContent: 'center' }}>
            {g.products.map((p) => (
              <Avatar
                key={`group-fixed-${p.product_id}`}
                alt={p.product_name}
                src={p.pic_url}
                sx={{ width: 64, height: 64 }}
              >
                {p.product_name}
              </Avatar>
            ))}
          </AvatarGroup>
        ))}
        {Boolean(fixedGroups.length) && (
          <Divider orientation="vertical" flexItem />
        )}
        {selectedChoices.map((g) =>
          g.products.map((p) => (
            <Avatar
              key={`group-${g.groupId}-${p.product_id}`}
              alt={p.product_name}
              src={p.pic_url}
              sx={{ width: 64, height: 64 }}
            >
              {p.product_name}
            </Avatar>
          )),
        )}
      </Stack>
    );
  };

  if (hasCompletedChoice) {
    return (
      <Container sx={{ py: [2, 6] }}>
        <Box textAlign="center" py={4}>
          <Typography variant="h3">Đã hoàn tất combo</Typography>
          {renderSelected()}
          <Stack spacing={2} justifyContent="center" pt={2} alignItems="center">
            <Link href="/combos">
              <Button variant="text" startIcon={<ArrowBack />}>
                Quay về
              </Button>
            </Link>
            <Button onClick={reset} variant="contained">
              Tiếp tục mua
            </Button>
          </Stack>
        </Box>
      </Container>
    );
  }

  const loadingDialog = (
    <Dialog open>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );

  // TODO: Thêm combo vào giỏ hàng

  return (
    <Container maxWidth="xl" sx={{ py: [2, 6] }}>
      <NextSeo
        title={product_name}
        description={product_name}
        openGraph={{
          type: 'website',
          title: product_name,
          description: product_name,
          images: [
            {
              url: pic_url!,
              width: 800,
              height: 600,
              alt: product_name,
            },
          ],
        }}
      />
      {loadingDetail && loadingDialog}
      {productDetail && (
        <ProductBuilderProvider product={productDetail}>
          <ProductModal
            onSubmit={(item) => {
              choice(currentGroup.id!, item);
              setProductDetailid(null);
            }}
            onClose={() => setProductDetailid(null)}
            product={productDetail}
            loading={loadingDetail}
            open={Boolean(productDetailid)}
            showBuyNow={false}
          />
        </ProductBuilderProvider>
      )}

      {isLoading || router.isFallback ? (
        <Container>
          <CircularProgress />
        </Container>
      ) : (
        <>
          {error && (
            <Stack
              maxWidth="md"
              textAlign="center"
              mx="auto"
              alignItems="center"
            >
              <Typography variant="h4">
                {error.message ?? 'Không tìm thấy sản phẩm'}
              </Typography>
              <Empty />
            </Stack>
          )}
          {!error && combo ? (
            <Box>
              {(selectedChoices.length !== 0 || fixedGroups.length !== 0) && (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  py={2}
                >
                  <Box>
                    <Typography variant="h5">Đã chọn</Typography>
                  </Box>
                  <Box>{renderSelected()}</Box>
                </Stack>
              )}
              {/* CURRENT STEP */}
              <Box textAlign="center" py={5}>
                <Typography variant="h4">Bước {currentStep + 1}</Typography>
              </Box>
              {/* <Typography>{currentGroup.}</Typography> */}
              {/* STEP DESCRIPTION */}
              <Grid container spacing={[2, 4]}>
                {currentGroup?.products?.map((p) => (
                  <Grid
                    onClick={() => setProductDetailid(p.product_id)}
                    key={`combo-step-${currentStep}-${p.product_id}`}
                    item
                    xs={6}
                    sm={4}
                    md={3}
                  >
                    <ProductCard product={p} navigate={false} />
                  </Grid>
                ))}
              </Grid>

              {/* COMBO BUIDLER */}
            </Box>
          ) : (
            <Typography>Không tìm thấy sản phẩm</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default ComboViewSection;
