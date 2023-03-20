import React, { memo, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { NodeProps } from 'reactflow';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import NodeLayout from './NodeLayout';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import { TextField } from '@mui/material';

const ResizerNode = ({ id, data }: NodeProps) => {
  const [fx, setFx] = useState<number>(0.2);
  const [fy, setFy] = useState<number>(0.2);

  const updateNodeData = useStore((state) => state.updateNodeData);

  const handleSubmitFx = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.focus();

    setFx(e.target.valueAsNumber);
    updateNodeData({ id, type: ServiceType.Resizer, fx: e.target.value });
  };

  const handleSubmitFy = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.focus();

    setFy(e.target.valueAsNumber);
    updateNodeData({ id, type: ServiceType.Resizer, fx: e.target.value });
  };
  useEffect(() => {
    updateNodeData({
      id,
      type: ServiceType.Resizer,
      output: 'backend',
      fx,
      fy,
    });
  }, []);
  return (
    <NodeLayout node_type="resizer" node_id={id} node_name="Resizer">
      <Box>
        <TextField
          type="number"
          onChange={handleSubmitFx}
          value={fx}
          className="nodrag"
          InputProps={{ inputProps: { min: 0, max: 1, step: 0.1 } }}
        />
        <TextField
          type="number"
          onChange={handleSubmitFy}
          value={fy}
          className="nodrag"
          InputProps={{ inputProps: { min: 0, max: 1, step: 0.1 } }}
        />
        <CropRotateIcon sx={{ fontSize: 32 }} />
      </Box>
    </NodeLayout>
  );
};

export default memo(ResizerNode);
