import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
// material
import { styled } from '@mui/material/styles';
import RouterLink from '@/components/Link';
import { Link as ScrollLink } from 'react-scroll';

import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
//
import Logo from '@/components/logo';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------
const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill },
  { name: 'Google', icon: googleFill },
  { name: 'Linkedin', icon: linkedinFill },
  { name: 'Twitter', icon: twitterFill },
];

const LINKS = [
  {
    headline: 'Dịch vụ',
    children: [
      { name: 'Dich vu 1', href: '#' },
      { name: 'Dich vu 1Academy', href: '#' },
    ],
  },
  {
    headline: 'Về chúng tôi',
    children: [
      { name: 'Thong tin 1', href: '#' },
      { name: 'Thong tin 2', href: '#' },
      { name: 'Thong tin 3', href: '#' },
    ],
  },
  {
    headline: 'Thông tin',
    children: [
      { name: 'Blog', href: '#' },
      { name: 'Tuyển dụng', href: '#' },
      { name: 'Partner ship', href: '#' },
    ],
  },
  {
    headline: 'Liên hệ',
    children: [
      { name: 'Email', href: '#' },
      { name: 'Địa chỉ', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  const theme = useTheme();

  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ py: [5, 10] }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
          spacing={[2, 1]}
        >
          <Grid item xs={12} md={2} sx={{ mb: 3 }}>
            <Stack justifyContent="space-between">
              <ScrollLink to="move_top" spy smooth>
                <Box
                  sx={{
                    mx: { xs: '0', md: 'inherit' },
                    width: '100%',
                    height: 'auto',
                  }}
                >
                  <Logo />
                </Box>
              </ScrollLink>
            </Stack>
          </Grid>
          <Grid item xs={12} md={10}>
            <Stack
              spacing={[0, 1]}
              direction={{ xs: 'row', md: 'row' }}
              justifyContent={{
                xs: 'center',
                md: 'space-between',
              }}
              flexWrap="wrap"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack
                    key={headline}
                    spacing={[2, 2]}
                    width={{ xs: '100%', md: 'auto' }}
                    pt={[2, 1]}
                  >
                    <Typography
                      sx={{ textTransform: 'uppercase' }}
                      component="p"
                      variant="h6"
                    >
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        href={link.href}
                        key={link.name}
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'block' }}
                      >
                        <Typography
                          sx={{
                            textDecoration: 'none',
                          }}
                        >
                          {link.name}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                );
              })}
              <Stack direction={['row', 'row', 'column']} pt={4} spacing={2}>
                {SOCIALS.map((social) => (
                  <IconButton key={social.name} color="primary" sx={{ p: 1 }}>
                    <Icon icon={social.icon} width={16} height={16} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
