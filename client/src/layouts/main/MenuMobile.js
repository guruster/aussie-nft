/* eslint-disable */
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { List, Drawer, Link, ListItemText, ListItemIcon, IconButton, SvgIcon } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import NavSection from '../../components/NavSection';
import Scrollbar from '../../components/Scrollbar';
import { MIconButton } from '../../components/@material-extend';
import { DiscordPath, TwitterPath, InstagramPath } from '../../components/SvgIcon';
//
import menuConfig from './MenuConfig';
import { Stack } from '@material-ui/core';

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const ITEM_SIZE = 48;
const PADDING = 2.5;

const ListItemStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  height: ITEM_SIZE,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(PADDING),
  paddingRight: theme.spacing(2.5),
  color: theme.palette?.text.secondary
}));

// ----------------------------------------------------------------------

MenuMobileItem.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  isActive: PropTypes.bool,
  onOpen: PropTypes.func
};

function MenuMobileItem({ item, isOpen, isActive, onOpen, onClose }) {
  const { title, path, icon, children } = item;

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      spy={true}
      smooth={true}
      sx={{
        ...(isActive && {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette?.primary.main, theme.palette?.action.selectedOpacity)
        })
      }}
      onClick={onClose}
    >
      <Stack direction='row'>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />

      </Stack>
    </ListItemStyle>
  );
}

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool
};

export default function MenuMobile({ isOffset, isHome }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' })
        }}
      >
        <Icon icon={menu2Fill} />
      </MIconButton>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Stack direction='row' alignItems='center'>
            <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
              <Logo sx={{ mx: PADDING, my: 3 }} />
            </Link>
            
          </Stack>

          <List disablePadding sx={{ paddingLeft: '10px' }}>
            {menuConfig.map((link) => (
              <MenuMobileItem
                key={link.title}
                item={link}
                isOpen={open}
                onOpen={handleOpen}
                isActive={pathname === link.path}
                onClose={handleDrawerClose}
              />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
