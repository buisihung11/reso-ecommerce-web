import MainFooter from '@/components/section/MainFooter.section';
import MainNavbarSection from '@/components/section/MainNavbar.section';
import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {}

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Box bgcolor="black" color="#fff" textAlign="center" p={2}>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Typography variant="body1">Miễn phí vận chuyển!</Typography>
        </Stack>
      </Box>
      <Divider />
      <MainNavbarSection />
      <Box sx={{ minHeight: '100vh', padding: 0, marginTop: 0 }}>
        {children}
      </Box>
      <MainFooter />
    </div>
  );
};
