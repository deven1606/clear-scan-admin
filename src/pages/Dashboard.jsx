import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Fade,
  Slide,
  Grow,
} from '@mui/material';
import {
  TrendingUp,
  People,
  MedicalServices,
  AttachMoney,
  PersonAdd,
  Assignment,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  TrendingDown,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color, trend, index }) => (
  <Grow in timeout={800 + index * 200}>
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2" fontWeight="500">
              {title}
            </Typography>
            <Typography variant="h3" component="h2" fontWeight="bold" color="text.primary">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: `${color}15`,
              borderRadius: 3,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
        
        {trend && (
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              {trend.startsWith('+') ? (
                <ArrowUpward sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
              ) : (
                <ArrowDownward sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
              )}
              <Typography 
                variant="body2" 
                color={trend.startsWith('+') ? 'success.main' : 'error.main'}
                fontWeight="600"
              >
                {trend}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  </Grow>
);

const RecentActivity = () => {
  const activities = [
    { user: 'John Doe', action: 'created a new account', time: '2 minutes ago', type: 'user', progress: 100 },
    { user: 'Jane Smith', action: 'scheduled Brain MRI', time: '5 minutes ago', type: 'service', progress: 85 },
    { user: 'Bob Johnson', action: 'updated profile', time: '10 minutes ago', type: 'user', progress: 60 },
    { user: 'Alice Brown', action: 'added new MRI service', time: '15 minutes ago', type: 'service', progress: 90 },
    { user: 'Charlie Wilson', action: 'completed MRI scan', time: '20 minutes ago', type: 'service', progress: 100 },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return <PersonAdd sx={{ fontSize: 20 }} />;
      case 'service': return <MedicalServices sx={{ fontSize: 20 }} />;
      default: return <PersonAdd sx={{ fontSize: 20 }} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user': return '#6366f1';
      case 'service': return '#10b981';
      default: return '#6366f1';
    }
  };

  return (
    <Slide direction="up" in timeout={1200}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Recent Activity
          </Typography>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <Fade in timeout={1400 + index * 200} key={index}>
              <ListItem 
                sx={{ 
                  px: 0, 
                  py: 2,
                  borderBottom: index < activities.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    sx={{ 
                      bgcolor: `${getActivityColor(activity.type)}15`,
                      color: getActivityColor(activity.type),
                      width: 40,
                      height: 40,
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="body1" fontWeight="500">
                        {activity.user}
                      </Typography>
                      <Chip
                        label={activity.type}
                        size="small"
                        sx={{
                          bgcolor: `${getActivityColor(activity.type)}15`,
                          color: getActivityColor(activity.type),
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {activity.action}
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">
                          {activity.time}
                        </Typography>
                        <Box sx={{ width: 60 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={activity.progress}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              bgcolor: 'rgba(0,0,0,0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getActivityColor(activity.type),
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            </Fade>
          ))}
        </List>
      </Paper>
    </Slide>
  );
};

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <People sx={{ fontSize: 28, color: '#6366f1' }} />,
      color: '#6366f1',
      trend: '+12%',
    },
    {
      title: 'MRI Services',
      value: '15',
      icon: <MedicalServices sx={{ fontSize: 28, color: '#10b981' }} />,
      color: '#10b981',
      trend: '+8%',
    },
    {
      title: 'Revenue',
      value: '$12,345',
      icon: <AttachMoney sx={{ fontSize: 28, color: '#f59e0b' }} />,
      color: '#f59e0b',
      trend: '+15%',
    },
    {
      title: 'Appointments',
      value: '89',
      icon: <Assignment sx={{ fontSize: 28, color: '#ec4899' }} />,
      color: '#ec4899',
      trend: '+5%',
    },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Fade in timeout={600}>
        <Box mb={4}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's what's happening with your business today.
          </Typography>
        </Box>
      </Fade>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} index={index} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Slide direction="right" in timeout={1000}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                height: 400,
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Service Analytics
                </Typography>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100%"
                color="text.secondary"
                sx={{
                  background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                }}
              >
                <Box textAlign="center">
                  <MedicalServices sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    MRI Analytics
                  </Typography>
                  <Typography variant="body2">
                    Service performance charts would be displayed here
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Slide>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
