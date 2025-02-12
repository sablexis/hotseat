"use client";

import { createTheme, ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode colors
                primary: {
                  main: '#1976d2',
                },
                background: {
                  default: '#ffffff',
                  paper: '#f5f5f5',
                },
              }
            : {
                // Dark mode colors
                primary: {
                  main: '#90caf9',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
