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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Search,
  Visibility,
  Save,
  Refresh,
  CheckCircle,
  Warning,
  Error,
  Link,
  Image,
  Code,
  Speed,
  TrendingUp,
  Analytics,
} from '@mui/icons-material';

const SEOManagement = () => {
  const [activeTab, setActiveTab] = useState('meta');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [metaTags, setMetaTags] = useState({
    home: {
      title: 'Clear Scan Medical Center - Advanced MRI Services',
      description: 'Professional MRI scanning services with experienced radiologists. Book your appointment today for accurate and timely diagnostic imaging.',
      keywords: 'MRI, medical imaging, diagnostic services, radiologist, healthcare',
      ogTitle: 'Clear Scan Medical Center - Advanced MRI Services',
      ogDescription: 'Professional MRI scanning services with experienced radiologists.',
      ogImage: 'https://via.placeholder.com/1200x630',
      twitterCard: 'summary_large_image',
    },
    about: {
      title: 'About Us - Clear Scan Medical Center',
      description: 'Learn about our mission to provide accurate, timely, and affordable diagnostic imaging services.',
      keywords: 'about us, medical center, MRI services, healthcare team',
      ogTitle: 'About Clear Scan Medical Center',
      ogDescription: 'Learn about our mission and team of experienced radiologists.',
      ogImage: 'https://via.placeholder.com/1200x630',
      twitterCard: 'summary_large_image',
    },
    contact: {
      title: 'Contact Us - Clear Scan Medical Center',
      description: 'Get in touch with Clear Scan Medical Center. Find our location, hours, and contact information.',
      keywords: 'contact, location, hours, phone, email, medical center',
      ogTitle: 'Contact Clear Scan Medical Center',
      ogDescription: 'Get in touch with our medical center for appointments and inquiries.',
      ogImage: 'https://via.placeholder.com/1200x630',
      twitterCard: 'summary_large_image',
    },
  });

  const [googleSearchConsole, setGoogleSearchConsole] = useState({
    connected: false,
    propertyUrl: '',
    verificationStatus: 'pending',
    lastCrawl: '2024-01-15',
    indexedPages: 45,
    searchQueries: [
      { query: 'MRI scan near me', clicks: 125, impressions: 1250, ctr: 10.0, position: 2.3 },
      { query: 'medical imaging center', clicks: 89, impressions: 890, ctr: 10.0, position: 3.1 },
      { query: 'brain MRI cost', clicks: 67, impressions: 670, ctr: 10.0, position: 4.2 },
    ],
  });

  const [sitemap, setSitemap] = useState({
    lastGenerated: '2024-01-15',
    totalPages: 12,
    pages: [
      { url: '/', priority: 1.0, lastModified: '2024-01-15', changeFreq: 'daily' },
      { url: '/about', priority: 0.8, lastModified: '2024-01-14', changeFreq: 'monthly' },
      { url: '/contact', priority: 0.8, lastModified: '2024-01-14', changeFreq: 'monthly' },
      { url: '/services', priority: 0.9, lastModified: '2024-01-15', changeFreq: 'weekly' },
      { url: '/book-appointment', priority: 0.9, lastModified: '2024-01-15', changeFreq: 'daily' },
    ],
  });

  const tabs = [
    { id: 'meta', name: 'Meta Tags', icon: <Code /> },
    { id: 'console', name: 'Google Search Console', icon: <Analytics /> },
    { id: 'sitemap', name: 'Sitemap', icon: <Link /> },
  ];

  const handleMetaTagChange = (page, field, value) => {
    setMetaTags(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [field]: value,
      },
    }));
  };

  const handleSaveMetaTags = () => {
    setSnackbar({
      open: true,
      message: 'Meta tags saved successfully',
      severity: 'success',
    });
  };

  const handleGenerateSitemap = () => {
    setSnackbar({
      open: true,
      message: 'Sitemap generated successfully',
      severity: 'success',
    });
  };

  const handleConnectGSC = () => {
    setGoogleSearchConsole(prev => ({
      ...prev,
      connected: true,
      verificationStatus: 'verified',
    }));
    setSnackbar({
      open: true,
      message: 'Google Search Console connected successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderMetaTags = () => (
    <Box>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>Page Meta Tags</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Select Page</InputLabel>
          <Select
            value={Object.keys(metaTags)[0]}
            label="Select Page"
          >
            {Object.keys(metaTags).map((page) => (
              <MenuItem key={page} value={page}>
                {page.charAt(0).toUpperCase() + page.slice(1)} Page
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {Object.entries(metaTags).map(([page, tags]) => (
        <Card key={page} elevation={0} sx={{ mb: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ textTransform: 'capitalize' }}>
              {page} Page
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Page Title"
                  value={tags.title}
                  onChange={(e) => handleMetaTagChange(page, 'title', e.target.value)}
                  helperText="50-60 characters recommended"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meta Description"
                  multiline
                  rows={2}
                  value={tags.description}
                  onChange={(e) => handleMetaTagChange(page, 'description', e.target.value)}
                  helperText="150-160 characters recommended"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Keywords"
                  value={tags.keywords}
                  onChange={(e) => handleMetaTagChange(page, 'keywords', e.target.value)}
                  helperText="Comma-separated keywords"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>Open Graph Tags</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="OG Title"
                  value={tags.ogTitle}
                  onChange={(e) => handleMetaTagChange(page, 'ogTitle', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="OG Image URL"
                  value={tags.ogImage}
                  onChange={(e) => handleMetaTagChange(page, 'ogImage', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="OG Description"
                  multiline
                  rows={2}
                  value={tags.ogDescription}
                  onChange={(e) => handleMetaTagChange(page, 'ogDescription', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Twitter Card Type</InputLabel>
                  <Select
                    value={tags.twitterCard}
                    label="Twitter Card Type"
                    onChange={(e) => handleMetaTagChange(page, 'twitterCard', e.target.value)}
                  >
                    <MenuItem value="summary">Summary</MenuItem>
                    <MenuItem value="summary_large_image">Summary Large Image</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}

      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" onClick={handleSaveMetaTags} startIcon={<Save />}>
          Save Meta Tags
        </Button>
      </Box>
    </Box>
  );

  const renderGoogleSearchConsole = () => (
    <Box>
      <Card elevation={0} sx={{ mb: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Google Search Console</Typography>
            <Chip
              label={googleSearchConsole.connected ? 'Connected' : 'Not Connected'}
              color={googleSearchConsole.connected ? 'success' : 'warning'}
              icon={googleSearchConsole.connected ? <CheckCircle /> : <Warning />}
            />
          </Box>
          
          {!googleSearchConsole.connected ? (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                Connect your Google Search Console account to view search performance data and indexing status.
              </Alert>
              <TextField
                fullWidth
                label="Property URL"
                value={googleSearchConsole.propertyUrl}
                onChange={(e) => setGoogleSearchConsole(prev => ({ ...prev, propertyUrl: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleConnectGSC}>
                Connect Google Search Console
              </Button>
            </Box>
          ) : (
            <Box>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      {googleSearchConsole.indexedPages}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Indexed Pages
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {googleSearchConsole.searchQueries.reduce((sum, q) => sum + q.clicks, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Clicks
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="info.main">
                      {googleSearchConsole.searchQueries.reduce((sum, q) => sum + q.impressions, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Impressions
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {googleSearchConsole.lastCrawl}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last Crawl
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>Top Search Queries</Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Query</TableCell>
                      <TableCell align="right">Clicks</TableCell>
                      <TableCell align="right">Impressions</TableCell>
                      <TableCell align="right">CTR</TableCell>
                      <TableCell align="right">Position</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {googleSearchConsole.searchQueries.map((query, index) => (
                      <TableRow key={index}>
                        <TableCell>{query.query}</TableCell>
                        <TableCell align="right">{query.clicks}</TableCell>
                        <TableCell align="right">{query.impressions}</TableCell>
                        <TableCell align="right">{query.ctr}%</TableCell>
                        <TableCell align="right">{query.position}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );

  const renderSitemap = () => (
    <Box>
      <Card elevation={0} sx={{ mb: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">XML Sitemap</Typography>
            <Button variant="contained" onClick={handleGenerateSitemap} startIcon={<Refresh />}>
              Generate Sitemap
            </Button>
          </Box>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">
                  {sitemap.totalPages}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Pages
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {sitemap.lastGenerated}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Generated
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h4" color="info.main">
                  Active
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>Sitemap URLs</Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>URL</TableCell>
                  <TableCell align="right">Priority</TableCell>
                  <TableCell>Change Frequency</TableCell>
                  <TableCell>Last Modified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sitemap.pages.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell>{page.url}</TableCell>
                    <TableCell align="right">{page.priority}</TableCell>
                    <TableCell>{page.changeFreq}</TableCell>
                    <TableCell>{page.lastModified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2}>
            <Alert severity="info">
              Sitemap URL: <code>https://clearscan.com/sitemap.xml</code>
            </Alert>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          SEO Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Optimize your website for search engines with meta tags, Google Search Console, and sitemap management
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
      {activeTab === 'meta' && renderMetaTags()}
      {activeTab === 'console' && renderGoogleSearchConsole()}
      {activeTab === 'sitemap' && renderSitemap()}

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

export default SEOManagement;
