import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, MiniMap } from 'reactflow';
import nodeTypes, { getId, parseServiceInNode, PipelineStatus } from './utils';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { backendUrl } from '../../config';
import CustomControls from './CustomControls';
import { Box, Button } from '@mui/material';
import useStore from './store';

export const Flow = () => {
  const [servicesDS, setServicesDS] = useState([]); // services from DS backend

  const {
    nodes,
    edges,
    services,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    addFirstNode,
  } = useStore();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleSubmit = async () => {
    const results = await axios.post(`${backendUrl}/pipelines`, {
      edges,
      nodes,
      pipeline_name: 'test',
      services,
      status: PipelineStatus.Start,
    });

    console.log(results);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const results = await axios.get(`${backendUrl}/services`, {
          params: { limit: 100, page: 0 },
        });

        if (results.data.length > 0) {
          setServicesDS(results.data);
          const firstNode = parseServiceInNode(results.data[0]);
          addFirstNode(firstNode);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box
        sx={{
          width: '100%',
          height: '700px',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          // onDrop={onDrop}
          onDragOver={onDragOver}
          // onInit={setReactFlowInstance}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
        >
          <MiniMap style={{ height: 120 }} zoomable pannable />
          <CustomControls
            servicesDS={servicesDS}
            nodes={nodes}
            addNode={addNode}
            getId={getId}
          />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </Box>
      <Button
        variant="contained"
        sx={{
          width: '50%',
          textAlign: 'center',
          margin: '20px auto',
          padding: '10px',
          fontSize: '20px',
        }}
        onClick={handleSubmit}
      >
        Create Pipeline
      </Button>
    </Box>
  );
};
