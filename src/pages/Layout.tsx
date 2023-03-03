import React, { useEffect, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';

const Layout = ({ children }: PropsWithChildren) => {
  useEffect(() => {}, []);

  return (
    <Box
      sx={{
        maxWidth: '1800px',
        margin: 'auto',
      }}
    >
      <Header />
      <Box sx={{ width: '100%', margin: '200px 20px' }}>{children}</Box>
    </Box>
  );
};

export default Layout;
