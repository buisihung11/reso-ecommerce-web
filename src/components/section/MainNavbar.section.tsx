import Logo from '@/components/logo';
import useCart from '@/hooks/cart/useCart';
import useCollections from '@/hooks/collection/useCollections';
import useOffSetTop from '@/hooks/useOffSetTop';
import SearchIcon from '@mui/icons-material/Search';
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
  TextField,
} from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
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

const useNavBarClasses = makeStyles((theme) =>
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
  const { data: collections } = useCollections();
  const { cart } = useCart();
  const classes = useNavBarClasses();
  const router = useRouter();

  const totalItem = cart.totalItem;

  const triggerHide = useOffSetTop(70);
  const navConfig = [
    {
      title: 'Tất cả',
      path: '/products',
    },
  ].concat(
    collections
      ?.map((col) => ({
        title: col.name,
        path: `/collections/${col.id}`,
      }))
      .slice(0, 10) ?? [],
  );

  return (
    <HideOnScroll {...props}>
      <AppBar
        elevation={0}
        className={triggerHide ? classes.sticky : classes.base}
        sx={{ backgroundColor: '#fff', color: 'black' }}
      >
        <Container maxWidth="xl" sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <Stack spacing={2}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <MHidden width="mdUp">
                  <MegaMenuMobile navConfig={navConfig} />
                </MHidden>

                <MHidden width="mdDown">
                  <TextField
                    placeholder="Tìm kiếm..."
                    variant="outlined"
                    size="small"
                  />
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
