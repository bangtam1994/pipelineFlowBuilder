import React from 'react';
import { Typography } from '@mui/material';
import Layout from './Layout';
import { Flow } from '../containers/Flow/ReactFlow';
import PipelineCreateContainer from '../containers/PipelineCreateContainer';

const PipelineBuilderDashboard = () => {
  return (
    <Layout>
      <Typography variant="h3" marginBottom="30px">
        Pipeline Builder
      </Typography>
      <PipelineCreateContainer />
      <Flow />
    </Layout>
  );
};

export default PipelineBuilderDashboard;
