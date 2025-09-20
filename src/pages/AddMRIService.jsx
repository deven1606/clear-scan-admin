import React, { useState } from 'react';
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
} from '@mui/material';
import {
  ArrowBack,
  Add,
  PhotoCamera,
  Save,
  Cancel,
  MedicalServices,
  AttachMoney,
  Description,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddMRIService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    status: 'Available',
    duration: '',
    preparation: '',
    contraindications: '',
  });
  const [errors, setErrors] = useState({});
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
          message: 'MRI Service created successfully!',
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

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={() => navigate('/mri-services')} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Add color="primary" sx={{ mr: 1 }} />
            <Typography variant="h4" component="h1">
              Add New MRI Service
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Create a new MRI scan service with detailed information
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
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    mb: 2,
                  }}
                >
                  <MedicalServices sx={{ fontSize: 48, color: 'grey.400', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Upload MRI service image
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  component="label"
                  fullWidth
                >
                  Upload Image
                  <input hidden accept="image/*" type="file" />
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  JPG, PNG or GIF. Max 5MB
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
                        placeholder="e.g., Brain MRI Scan"
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
                        placeholder="45"
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
                        placeholder="Detailed description of the MRI service..."
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
                        placeholder="450.00"
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
                        placeholder="Patient preparation instructions..."
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
                        placeholder="Any contraindications or warnings..."
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
                      Create Service
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

export default AddMRIService;

