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
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  MoreVert,
  CheckCircle,
  Cancel,
  Visibility,
  Email,
  Download,
  FilterList,
  Search,
  Refresh,
  CalendarToday,
  Person,
  MedicalServices,
  AttachMoney,
} from '@mui/icons-material';

const BookingsManagement = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionDialog, setActionDialog] = useState({ open: false, type: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      patientName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-234-567-8900',
      service: 'Brain MRI',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'pending',
      amount: '$450',
      formData: {
        age: 35,
        gender: 'Male',
        medicalHistory: 'No significant history',
        symptoms: 'Headaches and dizziness',
        allergies: 'None',
        medications: 'None',
      },
      reportStatus: 'pending',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+1-234-567-8901',
      service: 'Spine MRI',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'approved',
      amount: '$650',
      formData: {
        age: 28,
        gender: 'Female',
        medicalHistory: 'Previous back injury',
        symptoms: 'Lower back pain',
        allergies: 'Contrast dye',
        medications: 'Pain relievers',
      },
      reportStatus: 'completed',
    },
    {
      id: 3,
      patientName: 'Bob Johnson',
      email: 'bob.johnson@email.com',
      phone: '+1-234-567-8902',
      service: 'Knee MRI',
      date: '2024-01-17',
      time: '9:00 AM',
      status: 'cancelled',
      amount: '$350',
      formData: {
        age: 45,
        gender: 'Male',
        medicalHistory: 'Sports injury',
        symptoms: 'Knee pain and swelling',
        allergies: 'None',
        medications: 'Anti-inflammatory',
      },
      reportStatus: 'cancelled',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getReportStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const handleMenuClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleAction = (action) => {
    handleMenuClose();
    setActionDialog({ open: true, type: action });
  };

  const handleActionConfirm = () => {
    // Handle the action (approve, reject, etc.)
    setSnackbar({
      open: true,
      message: `Booking ${actionDialog.type} successfully`,
      severity: 'success',
    });
    setActionDialog({ open: false, type: '' });
  };

  const handleActionCancel = () => {
    setActionDialog({ open: false, type: '' });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bookings Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage scan requests, approve/reject bookings, and handle report delivery
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box mb={3} display="flex" gap={2} flexWrap="wrap">
        <Button
          variant="contained"
          startIcon={<FilterList />}
          sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Filter Bookings
        </Button>
        <Button
          variant="outlined"
          startIcon={<Search />}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
        >
          Refresh
        </Button>
      </Box>

      {/* Bookings Table */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Report</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                          {booking.patientName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="500">
                            {booking.patientName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MedicalServices sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant="body2">{booking.service}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Box>
                          <Typography variant="body2">{booking.date}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.time}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AttachMoney sx={{ fontSize: 16, color: 'success.main' }} />
                        <Typography variant="body2" fontWeight="500">
                          {booking.amount}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.reportStatus}
                        color={getReportStatusColor(booking.reportStatus)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, booking)}
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
        <MenuItem onClick={() => handleAction('approve')}>
          <ListItemIcon>
            <CheckCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Approve</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('reject')}>
          <ListItemIcon>
            <Cancel fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reject</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleAction('email')}>
          <ListItemIcon>
            <Email fontSize="small" />
          </ListItemIcon>
          <ListItemText>Send Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('download')}>
          <ListItemIcon>
            <Download fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download Form</ListItemText>
        </MenuItem>
      </Menu>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onClose={handleActionCancel} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionDialog.type === 'view' && 'Booking Details'}
          {actionDialog.type === 'approve' && 'Approve Booking'}
          {actionDialog.type === 'reject' && 'Reject Booking'}
          {actionDialog.type === 'email' && 'Send Email'}
          {actionDialog.type === 'download' && 'Download Form'}
        </DialogTitle>
        <DialogContent>
          {actionDialog.type === 'view' && selectedBooking && (
            <Box>
              <Typography variant="h6" gutterBottom>Patient Information</Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body1">{selectedBooking.patientName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{selectedBooking.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">{selectedBooking.phone}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Age</Typography>
                  <Typography variant="body1">{selectedBooking.formData.age}</Typography>
                </Grid>
              </Grid>
              
              <Typography variant="h6" gutterBottom>Medical Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Symptoms</Typography>
                  <Typography variant="body1">{selectedBooking.formData.symptoms}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Medical History</Typography>
                  <Typography variant="body1">{selectedBooking.formData.medicalHistory}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Allergies</Typography>
                  <Typography variant="body1">{selectedBooking.formData.allergies}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Medications</Typography>
                  <Typography variant="body1">{selectedBooking.formData.medications}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {actionDialog.type === 'approve' && (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                This will approve the booking and send confirmation email to the patient.
              </Alert>
              <TextField
                fullWidth
                label="Admin Notes (Optional)"
                multiline
                rows={3}
                placeholder="Add any notes for the patient..."
              />
            </Box>
          )}
          
          {actionDialog.type === 'reject' && (
            <Box>
              <Alert severity="warning" sx={{ mb: 2 }}>
                This will reject the booking and notify the patient with reason.
              </Alert>
              <TextField
                fullWidth
                label="Rejection Reason"
                multiline
                rows={3}
                placeholder="Please provide reason for rejection..."
                required
              />
            </Box>
          )}
          
          {actionDialog.type === 'email' && (
            <Box>
              <TextField
                fullWidth
                label="Email Subject"
                defaultValue="MRI Scan Booking Update"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email Message"
                multiline
                rows={4}
                placeholder="Type your message here..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionCancel}>Cancel</Button>
          <Button onClick={handleActionConfirm} variant="contained">
            {actionDialog.type === 'view' && 'Close'}
            {actionDialog.type === 'approve' && 'Approve'}
            {actionDialog.type === 'reject' && 'Reject'}
            {actionDialog.type === 'email' && 'Send Email'}
            {actionDialog.type === 'download' && 'Download'}
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

export default BookingsManagement;
