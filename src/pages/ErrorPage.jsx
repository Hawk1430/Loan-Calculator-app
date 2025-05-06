import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  Alert,
  Collapse,
  Stack
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = () => {
  const [showError, setShowError] = useState(false);
  
  const triggerError = () => {
    setShowError(true);
  };

  const dismissError = () => {
    setShowError(false);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 60 }} />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Error Page Demo
          </Typography>
          
          <Typography variant="body1" paragraph align="center">
            This page demonstrates how the application handles errors gracefully.
            You can use the button below to simulate an error.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <Button 
              variant="contained" 
              color="error" 
              onClick={triggerError}
              sx={{ mr: 2 }}
            >
              Simulate Error
            </Button>
            
            {showError && (
              <Button 
                variant="outlined" 
                onClick={dismissError}
              >
                Dismiss Error
              </Button>
            )}
          </Box>
          
          <Collapse in={showError}>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert 
                severity="error"
                onClose={dismissError}
              >
                <Typography variant="h6">Application Error</Typography>
                <Typography variant="body2">
                  This is a simulated error. In a real application, this would show meaningful 
                  error information to help users understand what went wrong.
                </Typography>
              </Alert>
              
              <Alert severity="info">
                <Typography variant="body2">
                  The application handles errors gracefully and provides user-friendly messages
                  instead of crashing or showing technical error details to end users.
                </Typography>
              </Alert>
            </Stack>
          </Collapse>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Error Handling Strategy
          </Typography>
          
          <Typography variant="body1" paragraph>
            This application implements the following error handling strategies:
          </Typography>
          
          <ul>
            <li>
              <Typography variant="body1" paragraph>
                <strong>API Error Handling:</strong> All API calls are wrapped in try/catch blocks with 
                user-friendly error messages.
              </Typography>
            </li>
            
            <li>
              <Typography variant="body1" paragraph>
                <strong>Form Validation:</strong> Input fields validate data and show appropriate 
                error messages.
              </Typography>
            </li>
            
            <li>
              <Typography variant="body1" paragraph>
                <strong>Fallback Content:</strong> When data can't be loaded, fallback content 
                is displayed.
              </Typography>
            </li>
            
            <li>
              <Typography variant="body1" paragraph>
                <strong>Global Error Boundary:</strong> React error boundaries catch and handle errors 
                that occur during rendering.
              </Typography>
            </li>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorPage;