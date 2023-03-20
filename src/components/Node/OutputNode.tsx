import { Box } from '@mui/system';
import React, { memo, useEffect } from 'react';
import { NodeProps } from 'reactflow';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import NodeLayout from './NodeLayout';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

const OutputNode = ({ id, data }: NodeProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);

  useEffect(() => {
    updateNodeData({ id, type: ServiceType.Output, output: 'backend' });
  }, []);
  return (
    <NodeLayout node_type="outputVideo" node_id={id} node_name="Output">
      <Box>
        <VideoCameraBackIcon sx={{ fontSize: 40 }} />
      </Box>
    </NodeLayout>
  );
};

export default memo(OutputNode);
