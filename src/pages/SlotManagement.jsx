import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Schedule,
  CalendarToday,
  AccessTime,
  CheckCircle,
  Cancel,
  MoreVert,
  Refresh,
} from '@mui/icons-material';

const SlotManagement = () => {
  const [slots, setSlots] = useState([
    {
      id: 1,
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '10:00',
      service: 'Brain MRI',
      status: 'available',
      maxBookings: 2,
      currentBookings: 0,
    },
    {
      id: 2,
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '12:00',
      service: 'Spine MRI',
      status: 'booked',
      maxBookings: 1,
      currentBookings: 1,
    },
    {
      id: 3,
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '16:00',
      service: 'Knee MRI',
      status: 'available',
      maxBookings: 2,
      currentBookings: 0,
    },
    {
      id: 4,
      date: '2024-01-16',
      startTime: '09:00',
      endTime: '11:00',
      service: 'Brain MRI',
      status: 'maintenance',
      maxBookings: 0,
      currentBookings: 0,
    },
  ]);

  const [dialog, setDialog] = useState({ open: false, type: '', slot: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const services = ['Brain MRI', 'Spine MRI', 'Knee MRI', 'Shoulder MRI', 'Hip MRI'];
  const statusOptions = ['available', 'booked', 'maintenance', 'holiday'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'booked': return 'warning';
      case 'maintenance': return 'error';
      case 'holiday': return 'info';
      default: return 'default';
    }
  };

  const handleOpenDialog = (type, slot = null) => {
    setDialog({ open: true, type, slot });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, type: '', slot: null });
  };

  const handleSaveSlot = () => {
    // Handle save logic here
    setSnackbar({
      open: true,
      message: 'Slot saved successfully',
      severity: 'success',
    });
    handleCloseDialog();
  };

  const handleDeleteSlot = (slotId) => {
    setSlots(slots.filter(slot => slot.id !== slotId));
    setSnackbar({
      open: true,
      message: 'Slot deleted successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Slot Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage available time slots for MRI services and assign scan appointments
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
          Add New Slot
        </Button>
        <Button
          variant="outlined"
          startIcon={<Schedule />}
          onClick={() => handleOpenDialog('bulk')}
        >
          Bulk Add Slots
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
                  <Typography variant="h4" fontWeight="bold" color="success.main">
                    {slots.filter(s => s.status === 'available').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Slots
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
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
                    {slots.filter(s => s.status === 'booked').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Booked Slots
                  </Typography>
                </Box>
                <CalendarToday sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="error.main">
                    {slots.filter(s => s.status === 'maintenance').length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maintenance
                  </Typography>
                </Box>
                <Cancel sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {slots.reduce((sum, slot) => sum + slot.currentBookings, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Slots Table */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Bookings</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slots.map((slot) => (
                  <TableRow key={slot.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {new Date(slot.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          {slot.startTime} - {slot.endTime}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{slot.service}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={slot.status}
                        color={getStatusColor(slot.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {slot.currentBookings}/{slot.maxBookings}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog('edit', slot)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteSlot(slot.id)}
                        size="small"
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Slot Dialog */}
      <Dialog open={dialog.open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialog.type === 'add' && 'Add New Slot'}
          {dialog.type === 'edit' && 'Edit Slot'}
          {dialog.type === 'bulk' && 'Bulk Add Slots'}
        </DialogTitle>
        <DialogContent>
          {dialog.type === 'bulk' ? (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Create multiple slots for a date range with the same time pattern.
              </Alert>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Time"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Service</InputLabel>
                    <Select label="Service">
                      {services.map((service) => (
                        <MenuItem key={service} value={service}>
                          {service}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Max Bookings per Slot"
                    type="number"
                    defaultValue={1}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Skip Weekends"
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  defaultValue={dialog.slot?.date || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  defaultValue={dialog.slot?.startTime || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  defaultValue={dialog.slot?.endTime || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Service</InputLabel>
                  <Select
                    label="Service"
                    defaultValue={dialog.slot?.service || ''}
                  >
                    {services.map((service) => (
                      <MenuItem key={service} value={service}>
                        {service}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    defaultValue={dialog.slot?.status || 'available'}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Max Bookings"
                  type="number"
                  defaultValue={dialog.slot?.maxBookings || 1}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveSlot} variant="contained">
            {dialog.type === 'add' && 'Add Slot'}
            {dialog.type === 'edit' && 'Update Slot'}
            {dialog.type === 'bulk' && 'Create Slots'}
          </Button>
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

export default SlotManagement;
