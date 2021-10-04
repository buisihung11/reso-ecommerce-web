import { Typography } from '@mui/material';
import Link from 'next/link';

const Logo = () => (
  <Link href="/" passHref>
    <a>
      <Typography color="grey" variant="h6">
        BeanOi Store
      </Typography>
    </a>
  </Link>
);

export default Logo;
