import { ArrowRightAlt } from '@mui/icons-material';
import {
  alpha,
  Box,
  Container,
  Input,
  InputBase,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {}

const CallToActionSection = (props: Props) => {
  const theme = useTheme();
  return (
    <Box
      py={[6, 12]}
      textAlign="center"
      bgcolor={alpha(theme.palette.primary.main, 0.3)}
    >
      <Container maxWidth="md" sx={{ margin: '0 auto' }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h3" color="warning.dark" pb={1}>
              Liên hệ với chúng tôi
            </Typography>
            <Typography variant="body1">
              Luôn sẵn sáng hỗ trợ và tư vấn cho bạn để có sản phẩm tốt nhất.
            </Typography>
          </Box>
          <Stack direction="row" justifyContent="center">
            <Stack spacing={2} direction="row" sx={{ bgcolor: 'white' }} p={2}>
              <InputBase
                size="medium"
                sx={{
                  bgcolor: 'transparent',
                  width: ['150px', '300px'],
                  '&.Mui-focused': {
                    borderColor: 'grey',
                    border: '1px solid',
                  },
                }}
                placeholder="Email của bạn"
              />
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowRightAlt />}
              >
                Gửi
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToActionSection;
