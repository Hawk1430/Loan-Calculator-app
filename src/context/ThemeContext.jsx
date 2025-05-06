import { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create context
export const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {}
});

// Theme provider component
export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
          ...(mode === 'light'
            ? {
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            lineHeight: 1.2,
          },
          h2: {
            fontSize: '2rem',
            fontWeight: 500,
            lineHeight: 1.2,
          },
          h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            lineHeight: 1.2,
          },
          h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            lineHeight: 1.2,
          },
          h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            lineHeight: 1.2,
          },
          h6: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.2,
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 4,
                textTransform: 'none',
                padding: '8px 16px',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                marginBottom: 16,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                boxShadow: mode === 'light' 
                  ? '0 2px 8px rgba(0,0,0,0.1)' 
                  : '0 2px 8px rgba(0,0,0,0.4)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};