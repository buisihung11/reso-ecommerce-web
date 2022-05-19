import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import listFill from '@iconify/icons-eva/list-fill';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import Link from '@/components/Link';
import { useRouter } from 'next/router';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Box,
  List,
  Stack,
  Drawer,
  Button,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
// @types
import { ParentItemProps, MegaMenuItemProps } from '../../@types/mega-menu';
//
import Logo from '../logo';
import Scrollbar from '../Scrollbar';
import { MenuOutlined } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const PADDING = 2.5;
const DRAWER_WIDTH = 260;

// ----------------------------------------------------------------------

function ParentItem({ icon, title, hasSub, ...other }: ParentItemProps) {
  return (
    <ListItemButton sx={{ textTransform: 'capitalize', height: 44 }} {...other}>
      <ListItemText primaryTypographyProps={{ typography: 'body2' }}>
        {title}
      </ListItemText>
      {hasSub && <Box component={Icon} icon={arrowIosForwardFill} />}
    </ListItemButton>
  );
}

type SubMenuProps = {
  parent: MegaMenuItemProps;
  pathname: string;
};

function SubMenu({ parent, pathname }: SubMenuProps) {
  const [open, setOpen] = useState(false);
  const { title, icon, path, children } = parent;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem
          title={title}
          icon={icon}
          onClick={handleOpen}
          hasSub={children.length > 0}
        />

        <Drawer
          open={open}
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: DRAWER_WIDTH - 12 } }}
        >
          <Stack direction="row" alignItems="center" px={1} py={1.5}>
            <IconButton onClick={handleClose}>
              <Icon icon={arrowIosBackFill} width={20} height={20} />
            </IconButton>
            <Typography
              noWrap
              variant="subtitle1"
              sx={{ ml: 1, textTransform: 'capitalize' }}
            >
              {title}
            </Typography>
          </Stack>
          <Divider />

          <Scrollbar>
            <Stack spacing={5} py={3}>
              {children.map((list) => {
                const { subheader, items } = list;
                return (
                  <List key={subheader} disablePadding>
                    <Typography
                      component="div"
                      variant="overline"
                      sx={{ px: 2.5, mb: 1, color: 'text.secondary' }}
                      noWrap
                    >
                      {subheader}
                    </Typography>

                    {items.map((link) => {
                      if (link.children)
                        return (
                          <SubMenu
                            key={link.title}
                            parent={link}
                            pathname={link.path}
                          />
                        );
                      return (
                        <Link key={link.title} href={link.path} passHref>
                          <ListItemButton sx={{ px: 1.5 }}>
                            <ListItemText
                              primary={link.title}
                              primaryTypographyProps={{
                                typography: 'body2',
                                noWrap: true,
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      );
                    })}
                  </List>
                );
              })}
            </Stack>
          </Scrollbar>
        </Drawer>
      </>
    );
  }

  return (
    <Link href={path} passHref>
      <ParentItem title={title} icon={icon} />
    </Link>
  );
}

type MegaMenuMobileProps = {
  navConfig: MegaMenuItemProps[];
};

export default function MegaMenuMobile({ navConfig }: MegaMenuMobileProps) {
  const { pathname } = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <IconButton onClick={handleDrawerOpen}>
        <MenuOutlined />
      </IconButton>

      <Drawer
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: DRAWER_WIDTH } }}
        // variant="permanent"
        // sx={{
        //   width: DRAWER_WIDTH,
        //   flexShrink: 0,
        //   [`& .MuiDrawer-paper`]: {
        //     width: DRAWER_WIDTH,
        //     boxSizing: 'border-box',
        //   },
        // }}
      >
        <Scrollbar>
          <Box p={2} pb={6}>
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </Box>

          {navConfig.map((parent) => (
            <SubMenu key={parent.title} parent={parent} pathname={pathname} />
          ))}
        </Scrollbar>
      </Drawer>
    </>
  );
}
