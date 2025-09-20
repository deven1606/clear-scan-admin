import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Link,
  Paper,
  Grid,
  Fade,
  Slide,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  AdminPanelSettings,
  TrendingUp,
  People,
  Inventory,
  CheckCircle,
  Security,
  Speed,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Login: Attempting login with:', formData.email);

    // Simulate login API call
    setTimeout(() => {
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        console.log('Login: Credentials valid, calling login function');
        login(); // Use AuthContext login function
        navigate('/dashboard');
      } else {
        console.log('Login: Invalid credentials');
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    { 
      icon: <TrendingUp sx={{ fontSize: 28 }} />, 
      title: 'Analytics Dashboard', 
      description: 'Real-time insights and metrics',
      color: '#6366f1'
    },
    { 
      icon: <People sx={{ fontSize: 28 }} />, 
      title: 'User Management', 
      description: 'Complete user administration',
      color: '#ec4899'
    },
    { 
      icon: <Inventory sx={{ fontSize: 28 }} />, 
      title: 'Product Catalog', 
      description: 'Inventory and product management',
      color: '#10b981'
    },
    { 
      icon: <Security sx={{ fontSize: 28 }} />, 
      title: 'Security First', 
      description: 'Enterprise-grade security',
      color: '#f59e0b'
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Features */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  },
                }}
              >
                <Box display="flex" alignItems="center" mb={3}>
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                      borderRadius: 3,
                      p: 1.5,
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <AdminPanelSettings sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                      Modern Admin
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      Dashboard Platform
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="h5" mb={4} sx={{ opacity: 0.9, fontWeight: 500 }}>
                  Welcome to your modern admin dashboard
                </Typography>
                
                <Grid container spacing={2}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Slide direction="up" in timeout={1200 + index * 200}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.1)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Box display="flex" alignItems="center" mb={1}>
                            <Box
                              sx={{
                                bgcolor: feature.color,
                                borderRadius: 1.5,
                                p: 1,
                                mr: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {feature.icon}
                            </Box>
                            <Typography variant="subtitle2" fontWeight="600">
                              {feature.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </Slide>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Fade>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Slide direction="left" in timeout={1500}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                      Sign In
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Enter your credentials to access the admin panel
                    </Typography>
                  </Box>

                  {error && (
                    <Fade in>
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mb: 3,
                          borderRadius: 2,
                          '& .MuiAlert-icon': {
                            fontSize: '1.2rem',
                          },
                        }}
                      >
                        {error}
                      </Alert>
                    </Fade>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      margin="normal"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      margin="normal"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        mb: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                        boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)',
                          boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
                          transform: 'translateY(-1px)',
                        },
                        '&:disabled': {
                          background: 'rgba(0, 0, 0, 0.12)',
                          color: 'rgba(0, 0, 0, 0.26)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <Divider sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Demo Credentials
                      </Typography>
                    </Divider>

                    <Box
                      sx={{
                        bgcolor: 'grey.50',
                        p: 2,
                        borderRadius: 2,
                        mb: 3,
                        border: '1px solid',
                        borderColor: 'grey.200',
                      }}
                    >
                      <Box display="flex" alignItems="center" mb={1}>
                        <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Email:</strong> admin@example.com
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Password:</strong> admin123
                        </Typography>
                      </Box>
                    </Box>

                    <Box textAlign="center">
                      <Link 
                        href="#" 
                        variant="body2" 
                        color="primary"
                        sx={{
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Forgot your password?
                      </Link>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
