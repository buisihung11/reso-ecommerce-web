import { ArrowRightAlt } from '@mui/icons-material';
import { Box, Container, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {}

const CallToActionSection = (props: Props) => {
  return (
    <Box py={[6, 12]} textAlign="center">
      <Container maxWidth="md" sx={{ margin: '0 auto' }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5">Liên hệ với chúng tôi</Typography>
            <Typography variant="body1">
              Luôn sẵn sáng hỗ trợ và tư vấn cho bạn để có sản phẩm tốt nhất.
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="center">
            <TextField placeholder="Nhập email của bạn" />
            <Button variant="outlined" endIcon={<ArrowRightAlt />}>
              Gửi
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
