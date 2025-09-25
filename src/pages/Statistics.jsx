import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  TrendingDown,
  Download,
  Refresh,
  CalendarToday,
  People,
  MedicalServices,
  AttachMoney,
  Schedule,
  Email,
  LocalOffer,
  Visibility,
  FileDownload,
} from '@mui/icons-material';

const Statistics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <Assessment /> },
    { id: 'monthly', name: 'Monthly Reports', icon: <CalendarToday /> },
    { id: 'export', name: 'Export Data', icon: <Download /> },
    { id: 'analytics', name: 'Analytics', icon: <TrendingUp /> },
  ];

  const monthlyData = [
    {
      month: 'January 2024',
      bookings: 156,
      revenue: 45600,
      newPatients: 89,
      completedScans: 142,
      avgBookingValue: 292,
      growth: '+12%',
    },
    {
      month: 'December 2023',
      bookings: 139,
      revenue: 40100,
      newPatients: 76,
      completedScans: 128,
      avgBookingValue: 288,
      growth: '+8%',
    },
    {
      month: 'November 2023',
      bookings: 128,
      revenue: 37200,
      newPatients: 71,
      completedScans: 119,
      avgBookingValue: 290,
      growth: '+5%',
    },
  ];

  const serviceStats = [
    { service: 'Brain MRI', bookings: 45, revenue: 20250, avgPrice: 450 },
    { service: 'Spine MRI', bookings: 38, revenue: 24700, avgPrice: 650 },
    { service: 'Knee MRI', bookings: 32, revenue: 11200, avgPrice: 350 },
    { service: 'Shoulder MRI', bookings: 25, revenue: 8750, avgPrice: 350 },
    { service: 'Hip MRI', bookings: 16, revenue: 7200, avgPrice: 450 },
  ];

  const handleExport = (format) => {
    setSnackbar({
      open: true,
      message: `Data exported as ${format} successfully`,
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderOverview = () => (
    <Box>
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary.main">
                    1,234
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bookings
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +12% vs last month
                    </Typography>
                  </Box>
                </Box>
                <Schedule sx={{ fontSize: 40, color: 'primary.main' }} />
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
                    $45,678
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +18% vs last month
                    </Typography>
                  </Box>
                </Box>
                <AttachMoney sx={{ fontSize: 40, color: 'success.main' }} />
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
                    892
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Patients
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +7% vs last month
                    </Typography>
                  </Box>
                </Box>
                <People sx={{ fontSize: 40, color: 'info.main' }} />
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
                    1,156
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed Scans
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="caption" color="success.main">
                      +15% vs last month
                    </Typography>
                  </Box>
                </Box>
                <MedicalServices sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Service Performance */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Service Performance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell align="right">Bookings</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">Avg Price</TableCell>
                  <TableCell align="right">Growth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceStats.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <MedicalServices sx={{ fontSize: 20, color: 'primary.main', mr: 1 }} />
                        {service.service}
                      </Box>
                    </TableCell>
                    <TableCell align="right">{service.bookings}</TableCell>
                    <TableCell align="right">${service.revenue.toLocaleString()}</TableCell>
                    <TableCell align="right">${service.avgPrice}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label="+8%"
                        color="success"
                        size="small"
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Schedule sx={{ color: 'primary.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="New booking received from John Doe"
                secondary="2 minutes ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Email sx={{ color: 'success.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Report sent to Jane Smith"
                secondary="15 minutes ago"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <LocalOffer sx={{ color: 'info.main' }} />
              </ListItemIcon>
              <ListItemText
                primary="Promo code WELCOME20 used"
                secondary="1 hour ago"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );

  const renderMonthlyReports = () => (
    <Box>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Monthly Reports</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Date Range</InputLabel>
          <Select
            value={dateRange}
            label="Date Range"
            onChange={(e) => setDateRange(e.target.value)}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
            <MenuItem value="365">Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Bookings</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">New Patients</TableCell>
                  <TableCell align="right">Completed Scans</TableCell>
                  <TableCell align="right">Avg Booking Value</TableCell>
                  <TableCell align="right">Growth</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monthlyData.map((month, index) => (
                  <TableRow key={index}>
                    <TableCell>{month.month}</TableCell>
                    <TableCell align="right">{month.bookings}</TableCell>
                    <TableCell align="right">${month.revenue.toLocaleString()}</TableCell>
                    <TableCell align="right">{month.newPatients}</TableCell>
                    <TableCell align="right">{month.completedScans}</TableCell>
                    <TableCell align="right">${month.avgBookingValue}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={month.growth}
                        color="success"
                        size="small"
                        icon={<TrendingUp sx={{ fontSize: 16 }} />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );

  const renderExportData = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Export Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Data
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Export all booking information including patient details, services, and payment data.
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('CSV')}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('Excel')}
                >
                  Export Excel
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Data
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Export patient information and medical history data.
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('CSV')}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('Excel')}
                >
                  Export Excel
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Financial Reports
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Export revenue, payment, and financial transaction data.
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('PDF')}
                >
                  Export PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('Excel')}
                >
                  Export Excel
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Analytics Data
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Export analytics and performance metrics data.
              </Typography>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('JSON')}
                >
                  Export JSON
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileDownload />}
                  onClick={() => handleExport('CSV')}
                >
                  Export CSV
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderAnalytics = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Advanced Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Trends
              </Typography>
              <Box
                sx={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}
              >
                <Box textAlign="center">
                  <TrendingUp sx={{ fontSize: 48, mb: 2 }} />
                  <Typography>Chart visualization would be displayed here</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Analysis
              </Typography>
              <Box
                sx={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}
              >
                <Box textAlign="center">
                  <AttachMoney sx={{ fontSize: 48, mb: 2 }} />
                  <Typography>Revenue chart would be displayed here</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Statistics & Export
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View comprehensive statistics, generate reports, and export data for analysis
        </Typography>
      </Box>

      {/* Tab Navigation */}
      <Box mb={3}>
        <Box display="flex" gap={1} flexWrap="wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'contained' : 'outlined'}
              startIcon={tab.icon}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                textTransform: 'none',
                fontWeight: activeTab === tab.id ? 600 : 400,
              }}
            >
              {tab.name}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'monthly' && renderMonthlyReports()}
      {activeTab === 'export' && renderExportData()}
      {activeTab === 'analytics' && renderAnalytics()}

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

export default Statistics;
