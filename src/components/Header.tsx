import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const displayDesktop = () => {
    return (
      <Toolbar
        sx={{
          display: 'flex',
          gap: '24px',
          background:
            'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Pipeline Creator
        </Typography>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
