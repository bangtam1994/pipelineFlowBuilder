import React, { memo, useState } from 'react';
import { TextField } from '@mui/material';

import { NodeProps } from 'reactflow';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import NodeLayout from './NodeLayout';

const DebugNode = ({ id, data }: NodeProps) => {
  const [factor, setFactor] = useState<number>(0.2);

  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.focus();

    setFactor(e.target.valueAsNumber);
    updateNodeData({ id, type: ServiceType.Debug, factor: e.target.value });
  };
  return (
    <NodeLayout node_type="debug" node_id={id} node_name="Debug">
      <TextField
        type="number"
        onChange={handleSubmit}
        value={factor}
        className="nodrag"
        InputProps={{ inputProps: { min: 0, max: 1, step: 0.1 } }}
      />
    </NodeLayout>
  );
};

export default memo(DebugNode);
