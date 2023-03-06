import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import FileInput from '../FileInput';
import NodeLayout from './NodeLayout';

const ReaderNode = ({ id, data }: NodeProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleSubmitFile = (file: File) => {
    updateNodeData({ id, type: ServiceType.Reader, file });
  };
  return (
    <NodeLayout node_type="reader" node_id={id} node_name="Reader">
      <FileInput
        node_id={id}
        handleNodeDataUpdate={data.handleNodeDataUpdate}
        handleSubmitFile={handleSubmitFile}
      />
    </NodeLayout>
  );
};

export default memo(ReaderNode);
