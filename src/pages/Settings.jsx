import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Alert,
  Snackbar,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Admin Panel',
    siteDescription: 'A modern admin panel built with React and Material-UI',
    siteUrl: 'https://admin-panel.example.com',
    timezone: 'UTC',
    language: 'en',
    
    // Security Settings
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireStrongPasswords: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    weeklyReports: true,
    
    // Theme Settings
    darkMode: false,
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // Save settings logic would go here
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const SettingCard = ({ title, icon, children }) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <SettingCard
            title="General Settings"
            icon={<PaletteIcon color="primary" />}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Site Name"
                  value={settings.siteName}
                  onChange={handleChange('siteName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Site URL"
                  value={settings.siteUrl}
                  onChange={handleChange('siteUrl')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Site Description"
                  multiline
                  rows={3}
                  value={settings.siteDescription}
                  onChange={handleChange('siteDescription')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={settings.timezone}
                    label="Timezone"
                    onChange={handleChange('timezone')}
                  >
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">Eastern Time</MenuItem>
                    <MenuItem value="PST">Pacific Time</MenuItem>
                    <MenuItem value="GMT">Greenwich Mean Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.language}
                    label="Language"
                    onChange={handleChange('language')}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </SettingCard>

          <SettingCard
            title="Security Settings"
            icon={<SecurityIcon color="primary" />}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={handleChange('twoFactorAuth')}
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Session Timeout (minutes)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={handleChange('sessionTimeout')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Password Length"
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={handleChange('passwordMinLength')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.requireStrongPasswords}
                      onChange={handleChange('requireStrongPasswords')}
                    />
                  }
                  label="Require Strong Passwords"
                />
              </Grid>
            </Grid>
          </SettingCard>

          <SettingCard
            title="Notification Settings"
            icon={<NotificationsIcon color="primary" />}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={handleChange('emailNotifications')}
                    />
                  }
                  label="Email Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.pushNotifications}
                      onChange={handleChange('pushNotifications')}
                    />
                  }
                  label="Push Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={handleChange('smsNotifications')}
                    />
                  }
                  label="SMS Notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.weeklyReports}
                      onChange={handleChange('weeklyReports')}
                    />
                  }
                  label="Weekly Reports"
                />
              </Grid>
            </Grid>
          </SettingCard>

          <SettingCard
            title="Theme Settings"
            icon={<PaletteIcon color="primary" />}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.darkMode}
                      onChange={handleChange('darkMode')}
                    />
                  }
                  label="Dark Mode"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primary Color"
                  type="color"
                  value={settings.primaryColor}
                  onChange={handleChange('primaryColor')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Secondary Color"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={handleChange('secondaryColor')}
                />
              </Grid>
            </Grid>
          </SettingCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Picture
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  src="/api/placeholder/100/100"
                >
                  Admin
                </Avatar>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  component="label"
                >
                  Upload Photo
                  <input hidden accept="image/*" type="file" />
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Button variant="outlined" fullWidth>
                  Export Settings
                </Button>
                <Button variant="outlined" fullWidth>
                  Import Settings
                </Button>
                <Button variant="outlined" fullWidth color="error">
                  Reset to Default
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          size="large"
        >
          Save Settings
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
