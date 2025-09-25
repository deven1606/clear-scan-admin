import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Chip,
  Card,
  CardContent,
  Grid,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MedicalServices as MedicalIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Brain MRI Scan',
      description: 'Comprehensive brain imaging for neurological assessment',
      price: 450.00,
      status: 'Available',
      image: '/api/placeholder/150/150',
      category: 'Neurological',
    },
    {
      id: 2,
      title: 'Spine MRI Scan',
      description: 'Detailed spinal cord and vertebrae imaging',
      price: 550.00,
      status: 'Available',
      image: '/api/placeholder/150/150',
      category: 'Orthopedic',
    },
    {
      id: 3,
      title: 'Knee MRI Scan',
      description: 'High-resolution knee joint imaging for sports injuries',
      price: 400.00,
      status: 'Maintenance',
      image: '/api/placeholder/150/150',
      category: 'Orthopedic',
    },
    {
      id: 4,
      title: 'Cardiac MRI Scan',
      description: 'Advanced heart imaging for cardiovascular assessment',
      price: 750.00,
      status: 'Available',
      image: '/api/placeholder/150/150',
      category: 'Cardiovascular',
    },
    {
      id: 5,
      title: 'Abdominal MRI Scan',
      description: 'Complete abdominal organ imaging',
      price: 500.00,
      status: 'Available',
      image: '/api/placeholder/150/150',
      category: 'Gastroenterology',
    },
  ]);

  const handleDelete = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleEdit = (id) => {
    navigate(`/mri-services/edit/${id}`);
  };

  const handleAddService = () => {
    navigate('/mri-services/add');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Maintenance': return 'warning';
      case 'Unavailable': return 'error';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Neurological': return 'primary';
      case 'Orthopedic': return 'secondary';
      case 'Cardiovascular': return 'error';
      case 'Gastroenterology': return 'warning';
      default: return 'default';
    }
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <Avatar
          variant="rounded"
          sx={{ width: 50, height: 50 }}
          src={params.value}
        >
          <MedicalIcon />
        </Avatar>
      ),
    },
    {
      field: 'title',
      headerName: 'Service Title',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getCategoryColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      renderCell: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.row.id)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          MRI Scan Services
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddService}
        >
          Add MRI Service
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Services
              </Typography>
              <Typography variant="h4">
                {services.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Available
              </Typography>
              <Typography variant="h4">
                {services.filter(service => service.status === 'Available').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Under Maintenance
              </Typography>
              <Typography variant="h4">
                {services.filter(service => service.status === 'Maintenance').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Price
              </Typography>
              <Typography variant="h4">
                ${(services.reduce((sum, service) => sum + service.price, 0) / services.length).toFixed(0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search MRI services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <Paper sx={{ p: 4, textAlign: 'center', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
          <MedicalIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" color="primary" gutterBottom>
            Products Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Products table will be implemented here
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Products;
