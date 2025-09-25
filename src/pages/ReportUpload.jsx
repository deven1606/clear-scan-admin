import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  CloudUpload,
  AttachFile,
  Email,
  Download,
  Delete,
  Visibility,
  Send,
  CheckCircle,
  Schedule,
  Person,
  MedicalServices,
  Lock,
} from '@mui/icons-material';

const ReportUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      fileName: 'brain_mri_john_doe_20240115.pdf',
      patientName: 'John Doe',
      bookingId: 'BK001',
      uploadDate: '2024-01-15',
      fileSize: '2.4 MB',
      status: 'uploaded',
      emailSent: false,
      password: 'MRI2024',
    },
    {
      id: 2,
      fileName: 'spine_mri_jane_smith_20240116.pdf',
      patientName: 'Jane Smith',
      bookingId: 'BK002',
      uploadDate: '2024-01-16',
      fileSize: '3.1 MB',
      status: 'sent',
      emailSent: true,
      password: 'SPINE2024',
    },
  ]);

  const [uploadDialog, setUploadDialog] = useState({ open: false });
  const [emailDialog, setEmailDialog] = useState({ open: false, file: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploadProgress, setUploadProgress] = useState(0);

  const patients = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', bookingId: 'BK001' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@email.com', bookingId: 'BK002' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@email.com', bookingId: 'BK003' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploaded': return 'warning';
      case 'sent': return 'success';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSnackbar({
            open: true,
            message: 'Files uploaded successfully',
            severity: 'success',
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSendEmail = (file) => {
    setEmailDialog({ open: true, file });
  };

  const handleEmailSend = () => {
    setSnackbar({
      open: true,
      message: 'Report sent successfully via email',
      severity: 'success',
    });
    setEmailDialog({ open: false, file: null });
  };

  const handleDeleteFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
    setSnackbar({
      open: true,
      message: 'File deleted successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 0 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Report Upload & Delivery
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload MRI reports and securely deliver them to patients via password-protected email
        </Typography>
      </Box>

      {/* Upload Section */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload New Reports
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Patient</InputLabel>
                <Select label="Select Patient">
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.name} ({patient.bookingId})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Report Password"
                placeholder="Enter password for PDF protection"
                defaultValue="MRI2024"
              />
            </Grid>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                  },
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Drop files here or click to upload
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Supported formats: PDF (Max 10MB per file)
                </Typography>
                <Button variant="contained" component="span">
                  Choose Files
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".pdf"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </Paper>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <Box sx={{ mt: 2 }}>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Uploading... {uploadProgress}%
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.05)' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Uploaded Reports
          </Typography>
          <List>
            {uploadedFiles.map((file, index) => (
              <React.Fragment key={file.id}>
                <ListItem sx={{ py: 2 }}>
                  <ListItemIcon>
                    <AttachFile sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="body1" fontWeight="500">
                          {file.fileName}
                        </Typography>
                        <Chip
                          label={file.status}
                          color={getStatusColor(file.status)}
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                        {file.emailSent && (
                          <Chip
                            icon={<Email />}
                            label="Email Sent"
                            color="success"
                            size="small"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Patient: {file.patientName} | Booking: {file.bookingId} | 
                          Size: {file.fileSize} | Uploaded: {file.uploadDate}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
                          <Lock sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            Password: {file.password}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleSendEmail(file)}
                        disabled={file.emailSent}
                      >
                        <Email />
                      </IconButton>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < uploadedFiles.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Email Dialog */}
      <Dialog open={emailDialog.open} onClose={() => setEmailDialog({ open: false, file: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Send Report via Email</DialogTitle>
        <DialogContent>
          {emailDialog.file && (
            <Box>
              <Alert severity="info" sx={{ mb: 2 }}>
                This will send the password-protected PDF report to the patient's email address.
              </Alert>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Patient Email"
                    defaultValue={emailDialog.file.patientName.toLowerCase().replace(' ', '.') + '@email.com'}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Subject"
                    defaultValue="Your MRI Report is Ready"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Message"
                    multiline
                    rows={4}
                    defaultValue={`Dear ${emailDialog.file.patientName},

Your MRI report is ready and has been attached to this email. The PDF is password-protected for your privacy and security.

Password: ${emailDialog.file.password}

Please keep this password safe and do not share it with unauthorized persons.

If you have any questions, please contact our office.

Best regards,
Clear Scan Medical Center`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Report Password"
                    defaultValue={emailDialog.file.password}
                    disabled
                    helperText="This password will be included in the email for the patient to open the PDF"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialog({ open: false, file: null })}>
            Cancel
          </Button>
          <Button onClick={handleEmailSend} variant="contained" startIcon={<Send />}>
            Send Email
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

export default ReportUpload;
