import Logo from '@/components/logo';
import useCart from '@/hooks/cart/useCart';
import useCategories from '@/hooks/category/useCategories';
import useCollections from '@/hooks/collection/useCollections';
import useOffSetTop from '@/hooks/useOffSetTop';
import {
  PersonOutlined,
  Search,
  SearchRounded,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Container,
  Grid,
  IconButton,
  Stack,
  styled,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { findLastIndex, indexOf, last } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { MHidden } from '../@material-extend';
import HideOnScroll from '../HideOnScroll';
import { MegaMenuMobile } from '../mega-menu';
import MegaMenuDesktopHorizon from '../mega-menu/MegaMenuDesktopHorizon';
import ProductCardReview from '../product-card/product-card-review';

interface Props {}

const HStack = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 20,
    backgroundColor: `${theme.palette.grey[400]}`,
    padding: '0 4px',
  },
}));

const useNavBarClasses = makeStyles(() =>
  //theme
  createStyles({
    base: {
      position: 'relative',
    },
    sticky: {
      position: 'sticky',
      top: 0,
    },
  }),
);

const MainNavbarSection = (props: Props) => {
  const { cart } = useCart();
  const classes = useNavBarClasses();
  const router = useRouter();
  const triggerHide = useOffSetTop(70);
  //States

  //API
  const { data: categories } = useCategories();

  const totalItem = cart.totalItem;
  const parentCates = categories?.filter(
    (cate: any) => cate.parent_cate_id == null,
  );
  function findCates(cateid: number) {
    const result = categories?.find((cate: any) => cate.cate_id == cateid);
    return result;
  }

  const traversingCategories =
    parentCates
      ?.map((cate: any) => ({
        title: cate.cate_name,
        path: `/products?cateid=${cate.cate_id}`,
        children:
          cate.childs.length > 0
            ? cate.childs.map((childcate: any) => ({
                subheader:
                  childcate.cate_name.split(' ', 1) + ' ' + childcate.cate_id,
                items: [
                  {
                    title: childcate.cate_name,
                    path: `/products?cateid=${childcate.cate_id}`,
                    children:
                      findCates(childcate.cate_id)?.childs.length > 0
                        ? findCates(childcate.cate_id)?.childs.map(
                            (child: any) => ({
                              subheader:
                                child.cate_name.split(' ', 1) +
                                ' ' +
                                child.cate_id,
                              items: [
                                {
                                  title: child.cate_name,
                                  path: `/products?cateid=${child.cate_id}`,
                                },
                              ],
                            }),
                          )
                        : null,
                  },
                ],
              }))
            : null,
      }))
      .slice(0, 7) ?? [];

  const navConfig = [
    {
      title: 'Tất cả',
      path: '/products',
    },
    {
      title: 'Khuyến mãi',
      path: '/combos',
    },
  ].concat(traversingCategories);

  return (
    <HideOnScroll {...props}>
      <AppBar
        elevation={0}
        className={triggerHide ? classes.sticky : classes.base}
        sx={{
          backgroundColor: '#fff',
          color: 'black',
        }}
      >
        <Container
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
          }}
          maxWidth={false}
        >
          <Stack spacing={2}>
            <Grid container alignItems="center" alignContent="center">
              <Grid item xs={3}>
                <MHidden width="mdUp">
                  <MegaMenuMobile navConfig={navConfig} />
                </MHidden>

                <MHidden width="mdDown">
                  <IconButton>
                    <SearchRounded />
                  </IconButton>
                </MHidden>
              </Grid>

              <Grid
                item
                xs={6}
                textAlign="center"
                display="flex"
                justifyContent="center"
              >
                <Logo />
              </Grid>

              <Grid item xs={3}>
                <HStack spacing={1} direction="row" justifyContent="end">
                  <MHidden width="mdUp">
                    <IconButton size="medium">
                      <Search />
                    </IconButton>
                  </MHidden>
                  <MHidden width="smDown">
                    <IconButton size="medium">
                      <PersonOutlined />
                    </IconButton>
                  </MHidden>

                  <ProductCardReview />
                </HStack>
              </Grid>
            </Grid>
            <MHidden width="mdDown">
              <MegaMenuDesktopHorizon
                justifyContent="center"
                navConfig={navConfig}
              />
            </MHidden>
          </Stack>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default MainNavbarSection;
