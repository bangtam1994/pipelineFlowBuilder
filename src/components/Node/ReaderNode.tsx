import { TextField } from '@mui/material';
import React, { memo, useState } from 'react';
import { NodeProps } from 'reactflow';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import FileInput from '../FileInput';
import NodeLayout from './NodeLayout';

const ReaderNode = ({ id, data }: NodeProps) => {
  const [cameraName, setCameraName] = useState('');

  const { updateNodeData } = useStore();
  const handleSubmitFile = (file: FormData) => {
    updateNodeData({ id, type: ServiceType.Reader, file });
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCameraName(e.target.value);
    updateNodeData({
      id,
      type: ServiceType.Reader,
      camera_name: e.target.value,
    });
  };
  return (
    <NodeLayout node_type="reader" node_id={id} node_name="Reader">
      <FileInput
        node_id={id}
        handleNodeDataUpdate={data.handleNodeDataUpdate}
        handleSubmitFile={handleSubmitFile}
      />
      <TextField
        onChange={handleSubmit}
        value={cameraName}
        className="nodrag"
        placeholder="Enter the camera name"
        InputProps={{ inputProps: { min: 0, max: 1, step: 0.1 } }}
      />
    </NodeLayout>
  );
};

export default memo(ReaderNode);
