import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Ideas from './components/Ideas';
import StoreProvider from './containers/StoreProvider';
import indigo from '@material-ui/core/colors/indigo';
import CreateIdea from './components/CreateIdea';
import { SnackbarProvider } from 'notistack';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: indigo
  },
  spacing: 10
})

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    paddingTop: 64
  },
  content: {
    padding: 30
  },
  title: {
    flexGrow: 1
  }
})

function App() {
  const {
    content,
    root,
    title
  } = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} maxSnack={4}>
        <StoreProvider>
          <div className={root}>
            <CssBaseline />
            <AppBar position="absolute">
              <Toolbar>
                <Typography className={title} variant="h6">Coolidea</Typography>
                <CreateIdea />
              </Toolbar>
            </AppBar>
            <main className={content}>
              <Ideas />
            </main>
          </div>
        </StoreProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
