import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
import { Icon } from '@iconify/react';
// material
import {
  Box,
  Link,
  Paper,
  Popover,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import NextLink from '@/components/Link';
import { useState } from 'react';
// @types
import { MegaMenuItemProps, ParentItemProps } from '../../@types/mega-menu';
import Scrollbar from '../Scrollbar';
//

// ----------------------------------------------------------------------

const CONTENT_HEIGHT = 400;
const ITEM_SPACING = 4;
const ITEM_HEIGHT = 64;
const ITEM_ON_ROW = {
  width: 'calc((100%/3) - 16px)',
  '&:nth-of-type(3n+1)': { order: 1 },
  '&:nth-of-type(3n+2)': { order: 2 },
  '&:nth-of-type(3n)': { order: 3 },
};

// ----------------------------------------------------------------------

function ParentItem({
  title,
  path,
  open,
  hasSub,
  onMouseEnter,
  onMouseLeave,
  ...other
}: ParentItemProps) {
  const activeStyle = {
    color: 'primary.main',
  };

  return (
    <Box onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NextLink href={path ?? '#'}>
        <Link
          noWrap
          underline="none"
          color="inherit"
          variant="subtitle2"
          sx={{
            display: 'flex',
            cursor: 'pointer',
            alignItems: 'center',
            textTransform: 'capitalize',
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': activeStyle,
            ...(open && activeStyle),
          }}
          {...other}
        >
          <>
            {title}
            {hasSub && (
              <Box
                component={Icon}
                icon={chevronDownFill}
                sx={{ ml: 1, width: 20, height: 20 }}
              />
            )}
          </>
        </Link>
      </NextLink>
    </Box>
  );
}

function MegaMenuItem({ parent }: { parent: MegaMenuItemProps }) {
  const { title, path, more, products, tags, children } = parent;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (children) {
    return (
      <>
        <ParentItem
          aria-owns={id}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          path={path}
          title={title}
          open={open}
          hasSub
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Stack
            flexWrap="wrap"
            alignContent="space-between"
            height={CONTENT_HEIGHT}
          >
            {children.map((list) => {
              const { subheader, items } = list;

              return (
                <Stack
                  key={subheader}
                  spacing={1.25}
                  sx={{ mb: 2.5, ...ITEM_ON_ROW }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'fontWeightBold' }}
                    noWrap
                  >
                    {subheader}
                  </Typography>
                  {items.map((link) => (
                    <NextLink key={link.title} href={link.path} passHref>
                      <Link
                        noWrap
                        underline="none"
                        sx={{
                          typography: 'body2',
                          color: 'text.primary',
                          fontSize: 13,
                          transition: (theme) =>
                            theme.transitions.create('all'),
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {link.title}
                      </Link>
                    </NextLink>
                  ))}
                </Stack>
              );
            })}
          </Stack>

          {!!more && !!tags && !!products && (
            <Stack spacing={3}>
              <NextLink href={more?.path} passHref>
                <Link
                  sx={{
                    typography: 'body2',
                    display: 'inline-flex',
                    fontSize: 13,
                  }}
                >
                  {more?.title}
                </Link>
              </NextLink>
            </Stack>
          )}
        </Popover>
      </>
    );
  }

  return <ParentItem path={path} title={title} />;
}

type MegaMenuDesktopHorizonProps = StackProps & {
  navConfig: MegaMenuItemProps[];
};

export default function MegaMenuDesktopHorizon({
  navConfig,
  ...other
}: MegaMenuDesktopHorizonProps) {
  return (
    <Scrollbar>
      <Stack
        direction="row"
        spacing={ITEM_SPACING}
        sx={{ overflow: 'auto' }}
        {...other}
      >
        {navConfig.map((parent) => (
          <MegaMenuItem key={parent.title} parent={parent} />
        ))}
      </Stack>
    </Scrollbar>
  );
}
