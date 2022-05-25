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
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
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
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
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
      {/* <Grid container spacing={[1, 2]}>
        {categories?.slice(0, 18).map((cate, index) => (
          <Grid key={cate.cate_id} item xs={4} sm={3} md={2}>
            <Link
              href={`/categories/${cate.cate_id}`}
              aria-label={`Xem danh mục ${cate.cate_name}`}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <ImageButton
                  focusRipple
                  key={cate.cate_name}
                  style={{
                    width: '8rem',
                    height: '8rem',
                  }}
                >
                  <ImageSrc
                    style={{ backgroundImage: `url(${cate.pic_url})` }}
                  />
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
                      {cate.cate_name}
                      <ImageMarked
                        className="MuiImageMarked-root"
                        sx={{ opacity: 0 }}
                      />
                    </Typography>
                  </Image>
                </ImageButton>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid> */}

      <Link
        href={`/categories/${category.cate_id}`}
        aria-label={`Xem danh mục ${category.cate_name}`}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
