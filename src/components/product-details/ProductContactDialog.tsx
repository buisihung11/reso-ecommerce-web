import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import {
  Business,
  Close,
  Email,
  Image,
  Phone,
  PhoneForwarded,
  PhoneIphone,
} from '@mui/icons-material';
import useIframeMessage from '@/hooks/useIframeMessage';
import { AppBar, Divider, IconButton, Stack } from '@mui/material';

function SimpleDialog(props: any) {
  const { message } = useIframeMessage();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <Typography variant="h5">Thông tin người bán</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
      <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={message?.contact.name} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PhoneIphone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={message?.contact.phone} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Email />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={message?.contact.email} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Business />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={message?.contact.address} />
        </ListItem>
        <Divider />
        <ListItem sx={{ justifyContent: 'center' }}>
          <Button
            startIcon={<PhoneForwarded />}
            variant="contained"
            href={`tel:${message?.contact.phone}`}
          >
            Gọi ngay
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ProductContactDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        fullWidth
        size="large"
        type="button"
        variant="contained"
        startIcon={<Phone />}
        onClick={handleClickOpen}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Vui Lòng Liên hệ
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </>
  );
}
