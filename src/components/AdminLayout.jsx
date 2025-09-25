import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  AccountCircle,
  Logout,
  ExpandLess,
  ExpandMore,
  CalendarToday,
  Assignment,
  LocalOffer,
  Upload,
  Description,
  Schedule,
  Assessment,
  ContentCopy,
  Search,
} from '@mui/icons-material';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { 
    text: 'Bookings Management', 
    icon: <CalendarToday />, 
    path: '/bookings',
    subItems: [
      { text: 'All Bookings', path: '/bookings' },
      { text: 'Pending Requests', path: '/bookings/pending' },
      { text: 'Approved Bookings', path: '/bookings/approved' },
      { text: 'Cancelled Bookings', path: '/bookings/cancelled' },
    ]
  },
  { 
    text: 'User Management', 
    icon: <PeopleIcon />, 
    path: '/users',
    subItems: [
      { text: 'All Users', path: '/users' },
      { text: 'Add User', path: '/users/add' },
      { text: 'Patient Data', path: '/users/patients' },
    ]
  },
  { 
    text: 'Service Management', 
    icon: <InventoryIcon />, 
    path: '/mri-services',
    subItems: [
      { text: 'All Services', path: '/mri-services' },
      { text: 'Add Service', path: '/mri-services/add' },
      { text: 'Service Categories', path: '/mri-services/categories' },
    ]
  },
  { 
    text: 'Slot Management', 
    icon: <Schedule />, 
    path: '/slots',
    subItems: [
      { text: 'Available Slots', path: '/slots' },
      { text: 'Working Hours', path: '/slots/hours' },
      { text: 'Holidays', path: '/slots/holidays' },
    ]
  },
  { 
    text: 'Promo Codes', 
    icon: <LocalOffer />, 
    path: '/promo-codes',
    subItems: [
      { text: 'All Promo Codes', path: '/promo-codes' },
      { text: 'Create Promo Code', path: '/promo-codes/create' },
      { text: 'Usage Analytics', path: '/promo-codes/analytics' },
    ]
  },
  { 
    text: 'Reports & Delivery', 
    icon: <Upload />, 
    path: '/reports',
    subItems: [
      { text: 'Upload Reports', path: '/reports/upload' },
      { text: 'Sent Reports', path: '/reports/sent' },
      { text: 'Email Templates', path: '/reports/templates' },
    ]
  },
  { 
    text: 'Content Management', 
    icon: <Description />, 
    path: '/content',
    subItems: [
      { text: 'Home Page', path: '/content/home' },
      { text: 'About Page', path: '/content/about' },
      { text: 'Contact Page', path: '/content/contact' },
      { text: 'Policies', path: '/content/policies' },
    ]
  },
  { 
    text: 'SEO Management', 
    icon: <Search />, 
    path: '/seo',
    subItems: [
      { text: 'Meta Tags', path: '/seo/meta' },
      { text: 'Google Search Console', path: '/seo/console' },
      { text: 'Sitemap', path: '/seo/sitemap' },
    ]
  },
  { 
    text: 'Statistics & Export', 
    icon: <Assessment />, 
    path: '/statistics',
    subItems: [
      { text: 'Monthly Reports', path: '/statistics/monthly' },
      { text: 'Export Data', path: '/statistics/export' },
      { text: 'Analytics', path: '/statistics/analytics' },
    ]
  },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleExpandClick = (itemText) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemText]: !prev[itemText]
    }));
  };

  const isItemActive = (item) => {
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.path);
    }
    return location.pathname === item.path;
  };

  const renderMenuItem = (item, level = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.text];
    const isActive = isItemActive(item);

    return (
      <React.Fragment key={item.text}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={isActive}
            onClick={() => {
              if (hasSubItems) {
                handleExpandClick(item.text);
              } else {
                navigate(item.path);
              }
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              pl: level * 2 + 2,
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
                },
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
                '& .MuiListItemText-primary': {
                  color: 'primary.main',
                  fontWeight: 600,
                },
              },
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.05)',
                borderRadius: 2,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: isActive ? 600 : 500,
                fontSize: level > 0 ? '0.875rem' : '0.9rem',
              }}
            />
            {hasSubItems && (
              isExpanded ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>
        {hasSubItems && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                <ListItem key={subItem.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={location.pathname === subItem.path}
                    onClick={() => navigate(subItem.path)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.5,
                      pl: level * 2 + 4,
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                        '&:hover': {
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
                        },
                        '& .MuiListItemText-primary': {
                          color: 'primary.main',
                          fontWeight: 600,
                        },
                      },
                      '&:hover': {
                        background: 'rgba(99, 102, 241, 0.05)',
                        borderRadius: 2,
                      },
                    }}
                  >
                    <ListItemText 
                      primary={subItem.text} 
                      primaryTypographyProps={{
                        fontWeight: location.pathname === subItem.path ? 600 : 500,
                        fontSize: '0.875rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              borderRadius: 2,
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Assignment sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            Clear Scan Admin
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }} fontWeight="bold">
            {menuItems.find(item => 
              item.path === location.pathname || 
              (item.subItems && item.subItems.some(subItem => subItem.path === location.pathname))
            )?.text || 'Dashboard'}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
