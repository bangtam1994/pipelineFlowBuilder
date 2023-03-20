import React, { useState, useEffect } from 'react';
import ReactFlow, { Background, MiniMap } from 'reactflow';
import nodeTypes, { getId, parseServiceInNode } from './utils';
import 'reactflow/dist/style.css';
import axios, { AxiosResponse } from 'axios';
import { backendUrl } from '../../config';
import CustomControls from './CustomControls';
import { Alert, AlertColor, Box, Button, Snackbar } from '@mui/material';
import useStore from './store';
import { PipelineStatus } from '../types';

interface MessageSubmit {
  open: boolean;
  severity: AlertColor | undefined;
  message: string;
}

export const Flow = () => {
  const [servicesDS, setServicesDS] = useState([]); // services from DS backend
  const [openMessageSubmit, setOpenMessageSubmit] = useState<MessageSubmit>({
    open: false,
    severity: undefined,
    message: '',
  });

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    addFirstNode,
    pipelineCreateForm,
  } = useStore();

  const handleCloseMessageSubmit = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenMessageSubmit((prev) => ({
      ...prev,
      open: false,
      severity: undefined,
      message: '',
    }));
  };

  // const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = 'move';
  // }, []);

  const handleSubmit = async () => {
    // Check if all reader have files
    const nodeReaderList = nodes.filter((node) => node.type === 'reader');
    const isMissingFile = nodeReaderList.find((node) => !node.data.file);

    if (isMissingFile)
      return setOpenMessageSubmit((prev) => ({
        ...prev,
        open: true,
        message: `Missing file on ReaderNode`,
        severity: 'error',
      }));

    if (!pipelineCreateForm.location_id) {
      return setOpenMessageSubmit((prev) => ({
        ...prev,
        open: true,
        message: `Missing location choice`,
        severity: 'error',
      }));
    }
    // Map on all reader nodes
    // Check if edges really exist
    let submitFilesResponse: Array<AxiosResponse<any> & { node_id: string }> =
      [];

    await Promise.all(
      nodeReaderList.map(async (reader) => {
        if (!reader.data.camera_name) {
          return setOpenMessageSubmit((prev) => ({
            ...prev,
            open: true,
            message: `Missing camera name for a reader`,
            severity: 'error',
          }));
        }
        const result = await axios.post(
          `${backendUrl}/videos/create?location_id=${pipelineCreateForm.location_id}&camera_name=${reader.data.camera_name}`,
          reader.data.file,

          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('file number>>>>', reader.id, 'result>>>>>', result);

        if (result.status === 200) {
          submitFilesResponse.push({ ...result, node_id: reader.id });
        } else
          return setOpenMessageSubmit((prev) => ({
            ...prev,
            open: true,
            message: `an error occurred during file submit named : ${reader.data.file}`,
            severity: 'error',
          }));
      })
    );

    const newNodes = nodes.map((node) => {
      const readerNodeWithSnapshot = submitFilesResponse.find(
        (res) => res.node_id === node.id
      );

      if (readerNodeWithSnapshot) {
        const { file, ...rest } = node.data;
        return {
          ...node,
          data: { ...rest, snapshot: readerNodeWithSnapshot.data.snapshot },
        };
      }
      return node;
    });

    try {
      const requestForm = await axios.post(
        `${backendUrl}/pipelines`,

        {
          edges,
          nodes: newNodes,
          pipeline_name: pipelineCreateForm.pipeline_name,
          status: PipelineStatus.Start,
        }
      );

      if (requestForm.status === 200)
        setOpenMessageSubmit((prev) => ({
          ...prev,
          open: true,
          message: `Pipeline successfully created`,
          severity: 'success',
        }));
    } catch (error) {
      setOpenMessageSubmit((prev) => ({
        ...prev,
        open: true,
        message: `An error ocurred during pipeline creation`,
        severity: 'error',
      }));
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const results = await axios.get(`${backendUrl}/services`, {
          params: { limit: 100, page: 0 },
        });
        if (results.data.length > 0) {
          setServicesDS(results.data);
          const firstNode = parseServiceInNode(
            results.data.find((result: any) => result.service_name === 'Reader')
          );

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
          // onDragOver={onDragOver}
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

      {openMessageSubmit.open && (
        <Snackbar
          open={openMessageSubmit.open}
          autoHideDuration={6000}
          onClose={handleCloseMessageSubmit}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseMessageSubmit}
            severity={openMessageSubmit.severity}
            sx={{ width: '100%' }}
            variant="filled"
          >
            {openMessageSubmit.message}
          </Alert>
        </Snackbar>
      )}
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
