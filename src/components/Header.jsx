import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, useTheme, useMediaQuery,
  Button, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerContent = (
    <Box role="presentation" sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List>
        <ListItem button><ListItemText primary="Meet Saumya" /></ListItem>
        <ListItem button><ListItemText primary="Sign Up" /></ListItem>
        <ListItem button><ListItemText primary="Login" /></ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}
        sx={{ borderBottom: `2px solid ${theme.palette.secondary.main}` }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Title */}
          <Typography variant="h5"
            sx={{
              fontFamily: theme.typography.h1.fontFamily,
              color: theme.palette.primary.main,
            }}>
             Pages of Flavor
          </Typography>

          {isMobile ? (
            <Box display="flex" alignItems="center">
              <Button sx={{ color: theme.palette.primary.main }}>Recipe Book</Button>
              <IconButton><SearchIcon sx={{ color: theme.palette.primary.main }} /></IconButton>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Button sx={{ color: theme.palette.primary.main }}>Recipe Book</Button>
              <IconButton><SearchIcon sx={{ color: theme.palette.primary.main }} /></IconButton>
              <Button sx={{ color: theme.palette.primary.main }}>Meet Saumya</Button>
              <Button sx={{ color: theme.palette.primary.main }}>Sign Up</Button>
              <Button sx={{ color: theme.palette.primary.main }}>Login</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Right-side drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}
