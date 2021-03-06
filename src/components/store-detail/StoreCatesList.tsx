import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import useCategories from '@/hooks/category/useCategories';
import { TStore } from '@/types/store';

interface StoreGCatesListProps {
  store: TStore;
}

export default function StoreCatesList({ store }: StoreGCatesListProps) {
  const { data } = useCategories();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        marginLeft: { xl: '-16px' },
        marginRight: { xs: '16px', xl: 0 },
        fontWeight: '400',
        paddingRight: '1rem',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      //   subheader={
      //     <ListSubheader component="div" id="nested-list-subheader">
      //       Nested List Items
      //     </ListSubheader>
      //   }
    >
      <ListItemButton onClick={handleClick}>
        {/* <ListItemIcon></ListItemIcon> */}
        <ListItemText primary="Danh mục" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {data?.slice(0, 6).map((cate) => (
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary={cate.cate_name} />
            </ListItemButton>
          </List>
        ))}
      </Collapse>
      <ListItemButton>
        <ListItemText primary="Ưu đãi" />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Giờ hoạt động" />
      </ListItemButton>
      <List component="div" disablePadding sx={{ pl: 4 }}>
        <ListItemText primary={store.open_time} />
        <ListItemText primary={store.close_time} />
      </List>
    </List>
  );
}
