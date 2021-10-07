import useCart from '@/hooks/cart/useCart';
import CartTemplate from '@/templates/cart.template';
import { fCurrency } from '@/utils/formatNumber';
import { sleep } from '@/utils/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShoppingCartOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Breadcrumbs,
  Button,
  Collapse,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled, Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { MHidden } from '../@material-extend';
import Logo from '../logo';
import CartSummarySeciton from './CartSummary.section';
import CheckoutActionStepSection from './checkout/CheckoutActionStep.section';
import CheckoutInfoStepSection from './checkout/CheckoutInfoStep.section';
import CheckoutPaymentStepSection from './checkout/CheckoutPaymentStep.section';
import CheckoutReviewSection from './checkout/CheckoutReview.section';
import CheckoutShippingStepSection from './checkout/CheckoutShippingStep.section';

interface Props {}

const useCheckoutStyles = makeStyles((theme: Theme) => ({
  breadcrumbItem: {
    ...theme.typography.caption,
    color: theme.palette.grey[500],
    cursor: 'pointer',
  },
  activeBreadcrumb: {
    color: theme.palette.text.primary,
    fontWeight: 'bold',
  },
  previousBreadcrumb: {
    color: theme.palette.text.primary,
  },
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const schema = yup.object().shape({
  firstName: yup.string().required('Vui lòng nhập họ'),
  lastName: yup.string().required('Vui lòng nhập tên'),
  email: yup.string().required('Vui lòng nhập email'),
  phone: yup.string().required('Vui lòng nhập số điện thoại'),
  paymentType: yup.string().required('Vui lòng chọn pthuc thanh toán'),
  shippingMethod: yup.string().required('Vui lòng chọn pthuc vận chuyển'),
});

export type CheckoutFormState = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: string;
  apartment?: string;
  shippingMethod: string;
  paymentType: string;
};

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
  const { cart } = useCart();

  const [currentStep, setCurrentStep] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const form = useForm<CheckoutFormState>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      shippingMethod: '',
      paymentType: '',
    },
    resolver: yupResolver(schema),
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const breadCrumbs = ['Giỏ hàng', 'Thông tin', 'Vận chuyển', 'Thanh toán'];

  const steps = [
    {
      btnTitle: 'Nhập thông tin',
      component: <CartTemplate />,
      breadcrumb: 'Giỏ hàng',
    },
    {
      btnTitle: 'Đến bước vận chuyển',
      component: <CheckoutInfoStepSection />,
      breadcrumb: 'Thông tin',
    },
    {
      btnTitle: 'Đến bước thanh toán',
      component: <CheckoutShippingStepSection />,
      breadcrumb: 'Vận chuyển',
    },
    {
      btnTitle: 'Hoàn tất',
      component: <CheckoutPaymentStepSection />,
      breadcrumb: 'Thanh toán',
    },
  ];

  const validationStepFields: {
    [key: string]: any[];
  } = {
    '2': ['email', 'firstName', 'lastName', 'phone'],
    '3': ['shippingMethod'],
    '4': ['paymentType'],
  };

  const handleNextStep = async () => {
    await sleep(1000);
    if (currentStep < 4) {
      const validStep = await form.trigger(validationStepFields[currentStep]);
      if (validStep) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      const submmitPromise = form.handleSubmit((data) => {
        console.log('data 💌', data);
        toast('Thanh toán đơn hàng thành công', {
          type: 'success',
        });
      });

      submmitPromise();
    }
    return true;
  };

  return (
    <FormProvider {...form}>
      <Box>
        <Grid minHeight="100vh" container>
          <Grid item xs={12} md={7} py={4}>
            <Stack spacing={4} alignItems="center">
              <Logo />

              <MHidden width="mdUp">
                <Box
                  width="100%"
                  borderTop="1px solid"
                  borderBottom="1px solid"
                  borderColor="grey.400"
                  bgcolor="grey.200"
                  py={1}
                >
                  <Container maxWidth="sm">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      onClick={handleExpandClick}
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
                      <Typography variant="h4">
                        {fCurrency(cart.finalAmount)}
                      </Typography>
                    </Stack>
                    <Collapse
                      sx={{ py: 2 }}
                      in={expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CartSummarySeciton cart={cart} />
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
                {steps.map(({ breadcrumb }, idx) => (
                  <Typography
                    key={`breadcrumb-${idx}`}
                    onClick={() => setCurrentStep(idx + 1)}
                    className={clsx(classes.breadcrumbItem, {
                      [classes.previousBreadcrumb]: idx < currentStep - 1,
                      [classes.activeBreadcrumb]: idx === currentStep - 1,
                    })}
                  >
                    {breadcrumb}
                  </Typography>
                ))}
              </Breadcrumbs>
              <Container maxWidth="sm">
                <Stack spacing={4}>
                  <CheckoutReviewSection show={currentStep >= 3} />

                  {steps[currentStep - 1].component}

                  <CheckoutActionStepSection
                    onNextStep={handleNextStep}
                    btnTitle={steps[currentStep - 1].btnTitle}
                  />
                </Stack>
              </Container>
            </Stack>
          </Grid>
          <MHidden width="mdDown">
            <Grid
              item
              md={5}
              py={4}
              bgcolor="grey.200"
              borderLeft="1px solid"
              borderColor="grey.400"
            >
              <Container maxWidth="md">
                <CartSummarySeciton cart={cart} />
              </Container>
            </Grid>
          </MHidden>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default CheckoutContentSection;
