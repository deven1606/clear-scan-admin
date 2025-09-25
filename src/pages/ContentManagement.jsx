import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
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
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from '@mui/material';
import {
  Edit,
  Preview,
  Save,
  Description,
  Home,
  Info,
  ContactMail,
  Policy,
  Search,
  Image,
  Link,
  Code,
} from '@mui/icons-material';

const ContentManagement = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [previewDialog, setPreviewDialog] = useState({ open: false, content: '' });

  const pages = [
    { id: 'home', name: 'Home Page', icon: <Home />, description: 'Main landing page content' },
    { id: 'about', name: 'About Page', icon: <Info />, description: 'About us and company information' },
    { id: 'contact', name: 'Contact Page', icon: <ContactMail />, description: 'Contact information and form' },
    { id: 'policies', name: 'Policies', icon: <Policy />, description: 'Terms, privacy, and other policies' },
  ];

  const [content, setContent] = useState({
    home: {
      title: 'Clear Scan Medical Center',
      subtitle: 'Advanced MRI Services for Better Healthcare',
      description: 'We provide state-of-the-art MRI scanning services with experienced radiologists and cutting-edge technology.',
      heroImage: 'https://via.placeholder.com/800x400',
      features: [
        'High-resolution MRI imaging',
        'Experienced radiologists',
        'Quick turnaround times',
        'Affordable pricing',
      ],
      ctaText: 'Book Your Scan Today',
      ctaLink: '/book-appointment',
    },
    about: {
      title: 'About Clear Scan Medical Center',
      description: 'Founded in 2020, Clear Scan Medical Center has been providing exceptional MRI services to our community.',
      mission: 'To provide accurate, timely, and affordable diagnostic imaging services.',
      vision: 'To be the leading diagnostic imaging center in the region.',
      team: [
        { name: 'Dr. John Smith', role: 'Chief Radiologist', image: 'https://via.placeholder.com/150' },
        { name: 'Dr. Jane Doe', role: 'Senior Radiologist', image: 'https://via.placeholder.com/150' },
      ],
    },
    contact: {
      title: 'Contact Us',
      address: '123 Medical Center Drive, Healthcare City, HC 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@clearscan.com',
      hours: 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed',
      mapEmbed: 'https://maps.google.com/embed?pb=...',
    },
    policies: {
      terms: {
        title: 'Terms of Service',
        content: 'By using our services, you agree to these terms...',
      },
      privacy: {
        title: 'Privacy Policy',
        content: 'We respect your privacy and protect your personal information...',
      },
      refund: {
        title: 'Refund Policy',
        content: 'We offer 100% refunds for cancelled appointments...',
      },
    },
  });

  const handleContentChange = (field, value) => {
    setContent(prev => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    setSnackbar({
      open: true,
      message: 'Content saved successfully',
      severity: 'success',
    });
  };

  const handlePreview = () => {
    setPreviewDialog({
      open: true,
      content: content[selectedPage],
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderHomeContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Page Title"
          value={content.home.title}
          onChange={(e) => handleContentChange('title', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Subtitle"
          value={content.home.subtitle}
          onChange={(e) => handleContentChange('subtitle', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={content.home.description}
          onChange={(e) => handleContentChange('description', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Hero Image URL"
          value={content.home.heroImage}
          onChange={(e) => handleContentChange('heroImage', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Features</Typography>
        {content.home.features.map((feature, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Feature ${index + 1}`}
            value={feature}
            onChange={(e) => {
              const newFeatures = [...content.home.features];
              newFeatures[index] = e.target.value;
              handleContentChange('features', newFeatures);
            }}
            sx={{ mb: 2 }}
          />
        ))}
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="CTA Text"
          value={content.home.ctaText}
          onChange={(e) => handleContentChange('ctaText', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="CTA Link"
          value={content.home.ctaLink}
          onChange={(e) => handleContentChange('ctaLink', e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const renderAboutContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Page Title"
          value={content.about.title}
          onChange={(e) => handleContentChange('title', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={4}
          value={content.about.description}
          onChange={(e) => handleContentChange('description', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Mission Statement"
          multiline
          rows={2}
          value={content.about.mission}
          onChange={(e) => handleContentChange('mission', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Vision Statement"
          multiline
          rows={2}
          value={content.about.vision}
          onChange={(e) => handleContentChange('vision', e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const renderContactContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Page Title"
          value={content.contact.title}
          onChange={(e) => handleContentChange('title', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Address"
          multiline
          rows={2}
          value={content.contact.address}
          onChange={(e) => handleContentChange('address', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Phone"
          value={content.contact.phone}
          onChange={(e) => handleContentChange('phone', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Email"
          value={content.contact.email}
          onChange={(e) => handleContentChange('email', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Business Hours"
          multiline
          rows={3}
          value={content.contact.hours}
          onChange={(e) => handleContentChange('hours', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Google Maps Embed URL"
          value={content.contact.mapEmbed}
          onChange={(e) => handleContentChange('mapEmbed', e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const renderPoliciesContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Terms of Service</Typography>
        <TextField
          fullWidth
          label="Terms Content"
          multiline
          rows={6}
          value={content.policies.terms.content}
          onChange={(e) => handleContentChange('terms', { ...content.policies.terms, content: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Privacy Policy</Typography>
        <TextField
          fullWidth
          label="Privacy Content"
          multiline
          rows={6}
          value={content.policies.privacy.content}
          onChange={(e) => handleContentChange('privacy', { ...content.policies.privacy, content: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Refund Policy</Typography>
        <TextField
          fullWidth
          label="Refund Content"
          multiline
          rows={6}
          value={content.policies.refund.content}
          onChange={(e) => handleContentChange('refund', { ...content.policies.refund, content: e.target.value })}
        />
      </Grid>
    </Grid>
  );

  const renderContent = () => {
    switch (selectedPage) {
      case 'home': return renderHomeContent();
      case 'about': return renderAboutContent();
      case 'contact': return renderContactContent();
      case 'policies': return renderPoliciesContent();
      default: return null;
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Content Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage website content for Home, About, Contact, and Policy pages
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Page Selection */}
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Page
              </Typography>
              <List>
                {pages.map((page) => (
                  <ListItem
                    key={page.id}
                    button
                    selected={selectedPage === page.id}
                    onClick={() => setSelectedPage(page.id)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.50',
                        '&:hover': {
                          bgcolor: 'primary.100',
                        },
                      },
                    }}
                  >
                    <ListItemIcon>{page.icon}</ListItemIcon>
                    <ListItemText
                      primary={page.name}
                      secondary={page.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Editor */}
        <Grid item xs={12} md={9}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  {pages.find(p => p.id === selectedPage)?.name} Content
                </Typography>
                <Box display="flex" gap={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Preview />}
                    onClick={handlePreview}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
              {renderContent()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Preview Dialog */}
      <Dialog open={previewDialog.open} onClose={() => setPreviewDialog({ open: false, content: '' })} maxWidth="lg" fullWidth>
        <DialogTitle>Content Preview</DialogTitle>
        <DialogContent>
          <Paper sx={{ p: 3, minHeight: 400 }}>
            <Typography variant="h4" gutterBottom>
              {previewDialog.content.title}
            </Typography>
            {previewDialog.content.subtitle && (
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {previewDialog.content.subtitle}
              </Typography>
            )}
            {previewDialog.content.description && (
              <Typography variant="body1" paragraph>
                {previewDialog.content.description}
              </Typography>
            )}
            {previewDialog.content.features && (
              <Box>
                <Typography variant="h6" gutterBottom>Features:</Typography>
                <ul>
                  {previewDialog.content.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Box>
            )}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog({ open: false, content: '' })}>
            Close
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

export default ContentManagement;
