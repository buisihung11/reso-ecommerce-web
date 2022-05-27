import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { TCategory } from '@/types/category';
import { Grid, Link } from '@mui/material';

interface CategoryImageProps {
  category: TCategory;
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  borderRadius: '15px',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    width: '8rem !important', // Overrides inline-style
    height: '7rem !important', // Overrides inline-style
  },
  [theme.breakpoints.down('sm')]: {
    width: '6rem !important', // Overrides inline-style
    height: '5rem !important', // Overrides inline-style
  },
  [theme.breakpoints.down('xs')]: {
    width: '6rem !important', // Overrides inline-style
    height: '4rem !important', // Overrides inline-style
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 1,
    },
    // '& .MuiTypography-root': {
    //   border: '4px solid currentColor',
    // },
  },
}));

const ImageSrc = styled('span')({
  borderRadius: '15px',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  borderRadius: '15px',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  borderRadius: '15px',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function CateImageButton({ category }: CategoryImageProps) {
  return (
    <Box paddingY={'1rem'}>
      <Link
        href={`/categories/${category.cate_id}`}
        aria-label={`Xem danh mục ${category.cate_name}`}
      >
        <Box display="flex" flexWrap="wrap">
          <ImageButton
            focusRipple
            style={{
              width: '8rem',
              height: '8rem',
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${category.pic_url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="body2"
                color="inherit"
                sx={{
                  position: 'relative',

                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {category.cate_name}
                <ImageMarked
                  className="MuiImageMarked-root"
                  sx={{ opacity: 0 }}
                />
              </Typography>
            </Image>
          </ImageButton>
        </Box>
      </Link>
    </Box>
  );
}
