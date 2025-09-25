import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  LocalOffer,
  Visibility,
  ContentCopy,
  MoreVert,
  Refresh,
  TrendingUp,
  People,
  AttachMoney,
  Schedule,
} from '@mui/icons-material';

const PromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState([
    {
      id: 1,
      code: 'WELCOME20',
      description: 'Welcome discount for new customers',
      type: 'percentage',
      value: 20,
      minOrderAmount: 100,
      maxDiscount: 50,
      usageLimit: 100,
      usedCount: 45,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      applicableServices: ['Brain MRI', 'Spine MRI'],
    },
    {
      id: 2,
      code: 'FLAT50',
      description: 'Flat discount for any service',
      type: 'fixed',
      value: 50,
      minOrderAmount: 200,
      maxDiscount: 50,
      usageLimit: 50,
      usedCount: 23,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'active',
      applicableServices: ['All Services'],
    },
    {
      id: 3,
      code: 'EXPIRED10',
      description: 'Expired promo code',
      type: 'percentage',
      value: 10,
      minOrderAmount: 0,
      maxDiscount: 25,
      usageLimit: 100,
      usedCount: 100,
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      status: 'expired',
      applicableServices: ['Knee MRI'],
    },
  ]);

  const [dialog, setDialog] = useState({ open: false, type: '', promoCode: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPromoCode, setSelectedPromoCode] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const services = ['All Services', 'Brain MRI', 'Spine MRI', 'Knee MRI', 'Shoulder MRI', 'Hip MRI'];
  const statusOptions = ['active', 'inactive', 'expired'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const handleOpenDialog = (type, promoCode = null) => {
    setDialog({ open: true, type, promoCode });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, type: '', promoCode: null });
  };

  const handleMenuClick = (event, promoCode) => {
    setAnchorEl(event.currentTarget);
    setSelectedPromoCode(promoCode);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPromoCode(null);
  };

  const handleAction = (action) => {
    handleMenuClose();
    if (action === 'edit') {
      handleOpenDialog('edit', selectedPromoCode);
    } else if (action === 'copy') {
      navigator.clipboard.writeText(selectedPromoCode.code);
      setSnackbar({
        open: true,
        message: 'Promo code copied to clipboard',
        severity: 'success',
      });
    } else if (action === 'toggle') {
      // Toggle status logic
      setSnackbar({
        open: true,
        message: 'Promo code status updated',
        severity: 'success',
      });
    }
  };

  const handleSavePromoCode = () => {
    setSnackbar({
      open: true,
      message: 'Promo code saved successfully',
      severity: 'success',
    });
    handleCloseDialog();
  };

  const handleDeletePromoCode = (id) => {
    setPromoCodes(promoCodes.filter(promo => promo.id !== id));
    setSnackbar({
      open: true,
      message: 'Promo code deleted successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getUsagePercentage = (used, limit) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Promo Codes Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create and manage promotional codes with usage limits and discount controls
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box mb={3} display="flex" gap={2} flexWrap="wrap">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog('add')}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Create Promo Code
        </Button>
        <Button
          variant="outlined"
          startIcon={<TrendingUp />}
          onClick={() => handleOpenDialog('analytics')}
        >
          View Analytics
        </Button>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
        >
          Refresh
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {promoCodes.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Codes
                  </Typography>
                </Box>
                <LocalOffer sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {promoCodes.filter(p => p.status === 'active').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Codes
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, color: 'success.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="warning.main">
                    {promoCodes.reduce((sum, promo) => sum + promo.usedCount, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Usage
                  </Typography>
                </Box>
                <People sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="info.main">
                    $2,450
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Discounts
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Promo Codes Table */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Usage</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Validity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promoCodes.map((promoCode) => (
                  <TableRow key={promoCode.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500" sx={{ fontFamily: 'monospace' }}>
                        {promoCode.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{promoCode.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={promoCode.type}
                        color={promoCode.type === 'percentage' ? 'primary' : 'secondary'}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {promoCode.type === 'percentage' 
                          ? `${promoCode.value}%` 
                          : `$${promoCode.value}`
                        }
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {promoCode.usedCount}/{promoCode.usageLimit}
                        </Typography>
                        <Box sx={{ width: 100, mt: 0.5 }}>
                          <Box
                            sx={{
                              height: 4,
                              bgcolor: 'grey.200',
                              borderRadius: 2,
                              overflow: 'hidden',
                            }}
                          >
                            <Box
                              sx={{
                                height: '100%',
                                bgcolor: getUsagePercentage(promoCode.usedCount, promoCode.usageLimit) > 80 
                                  ? 'error.main' 
                                  : getUsagePercentage(promoCode.usedCount, promoCode.usageLimit) > 60 
                                    ? 'warning.main' 
                                    : 'success.main',
                                width: `${getUsagePercentage(promoCode.usedCount, promoCode.usageLimit)}%`,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(promoCode.startDate).toLocaleDateString()} - {new Date(promoCode.endDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={promoCode.status}
                        color={getStatusColor(promoCode.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, promoCode)}
                        size="small"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('copy')}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>ContentCopy Code</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleAction('toggle')}>
          <ListItemIcon>
            <Switch fontSize="small" />
          </ListItemIcon>
          <ListItemText>Toggle Status</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDeletePromoCode(selectedPromoCode?.id)}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Add/Edit Promo Code Dialog */}
      <Dialog open={dialog.open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialog.type === 'add' && 'Create New Promo Code'}
          {dialog.type === 'edit' && 'Edit Promo Code'}
          {dialog.type === 'analytics' && 'Promo Code Analytics'}
        </DialogTitle>
        <DialogContent>
          {dialog.type === 'analytics' ? (
            <Box>
              <Typography variant="h6" gutterBottom>Usage Analytics</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Most Used Codes</Typography>
                      {/* Analytics content would go here */}
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Revenue Impact</Typography>
                      {/* Analytics content would go here */}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Promo Code"
                  placeholder="e.g., WELCOME20"
                  defaultValue={dialog.promoCode?.code || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Description"
                  placeholder="Brief description of the promo code"
                  defaultValue={dialog.promoCode?.description || ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Discount Type</InputLabel>
                  <Select
                    label="Discount Type"
                    defaultValue={dialog.promoCode?.type || 'percentage'}
                  >
                    <MenuItem value="percentage">Percentage</MenuItem>
                    <MenuItem value="fixed">Fixed Amount</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Discount Value"
                  type="number"
                  defaultValue={dialog.promoCode?.value || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minimum Order Amount"
                  type="number"
                  defaultValue={dialog.promoCode?.minOrderAmount || ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Maximum Discount"
                  type="number"
                  defaultValue={dialog.promoCode?.maxDiscount || ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Usage Limit"
                  type="number"
                  defaultValue={dialog.promoCode?.usageLimit || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={dialog.promoCode?.status || 'active'}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  defaultValue={dialog.promoCode?.startDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  defaultValue={dialog.promoCode?.endDate || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Applicable Services</InputLabel>
                  <Select
                    label="Applicable Services"
                    multiple
                    defaultValue={dialog.promoCode?.applicableServices || []}
                  >
                    {services.map((service) => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialog.type !== 'analytics' && (
            <Button onClick={handleSavePromoCode} variant="contained">
              {dialog.type === 'add' && 'Create Code'}
              {dialog.type === 'edit' && 'Update Code'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PromoCodes;
