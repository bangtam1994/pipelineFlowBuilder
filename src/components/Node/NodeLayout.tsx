import React, { memo } from 'react';
import { Box, IconButton } from '@mui/material';

import { useReactFlow, getConnectedEdges } from 'reactflow';
import CustomHandles from '../../containers/Flow/CustomHandles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface NodeLayoutProps {
  node_id: string;
  node_type: string;
  node_name: string;
  children?: React.ReactNode;
}

const NodeLayout = ({
  node_id,
  node_type,
  node_name,
  children,
}: NodeLayoutProps) => {
  const { getNode, getEdges, deleteElements } = useReactFlow();
  const currentEdges = getEdges();
  const currentNode = getNode(node_id);
  const onDeleteNode = () => {
    const connectedEdges = getConnectedEdges(
      [currentNode] as any,
      currentEdges
    );

    deleteElements({ nodes: [currentNode as any], edges: connectedEdges });
  };
  return (
    <CustomHandles type={node_type}>
      <Box
        sx={{
          padding: '14px',
          borderRadius: '3px',
          minWidth: '150px',
          textAlign: 'center',
          border: '1px solid #1a192b ',
          backgroundColor: 'white',
          position: 'relative',
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton aria-label="delete" onClick={onDeleteNode}>
            <HighlightOffIcon sx={{ height: '20px' }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '25px',
          }}
        >
          <Box>{node_name}</Box>
          {children && children}
        </Box>
      </Box>
    </CustomHandles>
  );
};

export default memo(NodeLayout);
