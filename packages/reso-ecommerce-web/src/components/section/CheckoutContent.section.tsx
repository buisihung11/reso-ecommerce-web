import {
  ArrowBack,
  Shop2Outlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Breadcrumbs,
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useState } from 'react';
import { MHidden } from '../@material-extend';
import Logo from '../logo';
import CartSummarySeciton from './CartSummary.section';
import { fCurrency } from '@/utils/formatNumber';

interface Props {}

const useCheckoutStyles = makeStyles((theme: Theme) => ({
  breadcrumbItem: {
    ...theme.typography.caption,
    color: theme.palette.grey[500],
    cursor: 'pointer',
  },
  activeBreadcrumb: {
    color: theme.palette.text.primary,
    fontWeght: 400,
  },
  previousBreadcrumb: {
    color: theme.palette.text.primary,
  },
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CheckoutContentSection = (props: Props) => {
  const classes = useCheckoutStyles();

  const [currentStep, setCurrentStep] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const breadCrumbs = ['Giỏ hàng', 'Thông tin', 'Vận chuyển', 'Thanh toán'];

  return (
    <Box>
      <Grid minHeight="100vh" container>
        <Grid item xs={12} md={8} py={4}>
          <Stack spacing={4} alignItems="center">
            <Logo />

            <MHidden width="mdUp">
              <Box
                width="100%"
                borderTop="1px"
                borderBottom="1px"
                bgcolor="grey.200"
                onClick={handleExpandClick}
                py={2}
              >
                <Container maxWidth="sm">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Button
                      color="inherit"
                      startIcon={<ShoppingCartOutlined />}
                      endIcon={
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      }
                    >
                      Hiện chi tiết đơn hàng
                    </Button>
                    <Typography variant="h4">{fCurrency(1000000)}</Typography>
                  </Stack>
                  <Collapse
                    sx={{ py: 2 }}
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CartSummarySeciton />
                  </Collapse>
                </Container>
              </Box>
            </MHidden>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{
                '& .MuiBreadcrumbs-separator': {
                  margin: 0.5,
                },
              }}
            >
              {breadCrumbs.map((title, idx) => (
                <Typography
                  onClick={() => setCurrentStep(idx + 1)}
                  className={classNames(classes.breadcrumbItem, {
                    [classes.activeBreadcrumb]: idx + 1 === currentStep,
                    [classes.previousBreadcrumb]: idx + 1 < currentStep,
                  })}
                >
                  {title}
                </Typography>
              ))}
            </Breadcrumbs>
            <Container maxWidth="sm">
              <Stack spacing={4}>
                <Box width="100%">
                  <Stack
                    pb={2}
                    direction={['column', 'row']}
                    justifyContent="space-between"
                  >
                    <Typography fontWeight={700}>Thông tin liên hệ</Typography>
                    <Typography fontWeight={200}>
                      Đã có tài khoản?{' '}
                      <Typography sx={{ cursor: 'pointer' }} component="span">
                        Đăng nhập
                      </Typography>
                    </Typography>
                  </Stack>

                  <TextField label="Email" placeholder="Email" fullWidth />
                </Box>

                <Box width="100%">
                  <Typography fontWeight={700} mb={2}>
                    Thông tin giao hàng
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField label="Tên" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Họ" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        helperText="Số điện thoại để liên lạc khi giao hàng"
                        label="Số điện thoại"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Địa chỉ" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Chung cư, căn hộ" fullWidth />
                    </Grid>
                  </Grid>
                </Box>

                <Box width="100%">
                  <Stack
                    direction={['column-reverse', 'row']}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Link passHref href="/cart">
                        <Button
                          fullWidth
                          color="inherit"
                          variant="text"
                          startIcon={<ArrowBack />}
                        >
                          Giỏ hàng
                        </Button>
                      </Link>
                    </Box>
                    <Button variant="contained" size="large" disableElevation>
                      TIẾP TỤC BƯỚC TIẾP THEO
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Container>
          </Stack>
        </Grid>
        <MHidden width="mdDown">
          <Grid item md={4} py={4} bgcolor="grey.200">
            <Container maxWidth="md">
              <CartSummarySeciton />
            </Container>
          </Grid>
        </MHidden>
      </Grid>
    </Box>
  );
};

export default CheckoutContentSection;
