import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => navigate('pipeline_create'), [navigate]);
  return <Layout>Home</Layout>;
};

export default Home;
