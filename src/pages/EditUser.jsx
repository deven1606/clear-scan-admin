import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  PhotoCamera,
  Save,
  Cancel,
  Delete,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'User',
    department: '',
    status: 'Active',
    bio: '',
    joinDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
  ];

  const roles = ['User', 'Moderator', 'Admin'];

  // Simulate fetching user data
  useEffect(() => {
    const fetchUser = () => {
      // Mock user data
      const mockUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Admin',
        department: 'Engineering',
        status: 'Active',
        bio: 'Experienced software engineer with expertise in React and Node.js. Passionate about creating user-friendly applications.',
        joinDate: '2023-01-15',
      };

      setFormData(mockUser);
      setLoading(false);
    };

    setTimeout(fetchUser, 1000);
  }, [id]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      setTimeout(() => {
        setSnackbar({
          open: true,
          message: 'User updated successfully!',
          severity: 'success',
        });
        
        setTimeout(() => {
          navigate('/users');
        }, 1500);
      }, 1000);
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  const handleDelete = () => {
    // Simulate delete API call
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'User deleted successfully!',
        severity: 'success',
      });
      
      setTimeout(() => {
        navigate('/users');
      }, 1500);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'error';
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading user data...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => navigate('/users')} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Edit color="primary" sx={{ mr: 1 }} />
              <Typography variant="h4" component="h1">
                Edit User
              </Typography>
            </Box>
            <Chip
              label={formData.status}
              color={getStatusColor(formData.status)}
              variant="outlined"
            />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Update user information and settings
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Profile Picture Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Profile Picture
                </Typography>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  {getInitials()}
                </Avatar>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  component="label"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Change Photo
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  JPG, PNG or GIF. Max size 2MB
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Member since
                </Typography>
                <Typography variant="h6">
                  {new Date(formData.joinDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card sx={{ mt: 2, border: '1px solid', borderColor: 'error.light' }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  Danger Zone
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Once you delete a user, there is no going back. Please be certain.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  fullWidth
                >
                  Delete User
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={formData.role}
                          label="Role"
                          onChange={handleChange('role')}
                        >
                          {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required error={!!errors.department}>
                        <InputLabel>Department</InputLabel>
                        <Select
                          value={formData.department}
                          label="Department"
                          onChange={handleChange('department')}
                        >
                          {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>
                              {dept}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange('bio')}
                        placeholder="Tell us about this user..."
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<Save />}
                      sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        },
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
    </Container>
  );
};

export default EditUser;
