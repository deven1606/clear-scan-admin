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
  IconButton,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  PhotoCamera,
  Save,
  Cancel,
  Delete,
  MedicalServices,
  AttachMoney,
  Description,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const EditMRIService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    status: 'Available',
    duration: '',
    preparation: '',
    contraindications: '',
    createdAt: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const categories = [
    'Neurological',
    'Orthopedic',
    'Cardiovascular',
    'Gastroenterology',
    'Oncology',
    'Pediatric',
    'Musculoskeletal',
    'Gynecological',
  ];

  const statuses = ['Available', 'Maintenance', 'Unavailable'];

  // Simulate fetching service data
  useEffect(() => {
    const fetchService = () => {
      // Mock service data
      const mockService = {
        title: 'Brain MRI Scan',
        description: 'Comprehensive brain imaging for neurological assessment using advanced 3T MRI technology.',
        category: 'Neurological',
        price: '450.00',
        status: 'Available',
        duration: '45',
        preparation: 'No food or drink 4 hours before scan. Remove all metal objects.',
        contraindications: 'Not suitable for patients with pacemakers or metal implants.',
        createdAt: '2023-01-15',
      };

      setFormData(mockService);
      setLoading(false);
    };

    setTimeout(fetchService, 1000);
  }, [id]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Service title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
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
          message: 'MRI Service updated successfully!',
          severity: 'success',
        });
        
        setTimeout(() => {
          navigate('/mri-services');
        }, 1500);
      }, 1000);
    }
  };

  const handleCancel = () => {
    navigate('/mri-services');
  };

  const handleDelete = () => {
    // Simulate delete API call
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'MRI Service deleted successfully!',
        severity: 'success',
      });
      
      setTimeout(() => {
        navigate('/mri-services');
      }, 1500);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Maintenance': return 'warning';
      case 'Unavailable': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading service data...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => navigate('/mri-services')} sx={{ mr: 2 }}>
                <ArrowBack />
              </IconButton>
              <Edit color="primary" sx={{ mr: 1 }} />
              <Typography variant="h4" component="h1">
                Edit MRI Service
              </Typography>
            </Box>
            <Chip
              label={formData.status}
              color={getStatusColor(formData.status)}
              variant="outlined"
            />
          </Box>
          <Typography variant="body1" color="text.secondary">
            Update MRI service information and settings
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* Service Image Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Service Image
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  <Avatar
                    variant="rounded"
                    sx={{ width: 80, height: 80 }}
                    src="/api/placeholder/80/80"
                  >
                    <MedicalServices />
                  </Avatar>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  component="label"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Change Image
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  JPG, PNG or GIF. Max 5MB
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Created on
                </Typography>
                <Typography variant="h6">
                  {new Date(formData.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>

            {/* Service Settings */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Service Settings
                </Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={handleChange('status')}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card sx={{ mt: 2, border: '1px solid', borderColor: 'error.light' }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  Danger Zone
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Once you delete a service, there is no going back. Please be certain.
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  fullWidth
                >
                  Delete Service
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
                    {/* Basic Information */}
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Basic Information
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Service Title"
                        value={formData.title}
                        onChange={handleChange('title')}
                        error={!!errors.title}
                        helperText={errors.title}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Duration (minutes)"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange('duration')}
                        error={!!errors.duration}
                        helperText={errors.duration}
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange('description')}
                        error={!!errors.description}
                        helperText={errors.description}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth required error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={formData.category}
                          label="Category"
                          onChange={handleChange('category')}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Price ($)"
                        type="number"
                        value={formData.price}
                        onChange={handleChange('price')}
                        error={!!errors.price}
                        helperText={errors.price}
                        required
                        InputProps={{
                          startAdornment: <AttachMoney />,
                        }}
                      />
                    </Grid>

                    {/* Additional Information */}
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Additional Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Preparation Instructions"
                        multiline
                        rows={3}
                        value={formData.preparation}
                        onChange={handleChange('preparation')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Contraindications"
                        multiline
                        rows={3}
                        value={formData.contraindications}
                        onChange={handleChange('contraindications')}
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

export default EditMRIService;

