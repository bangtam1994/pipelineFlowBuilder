import React, { memo } from 'react';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import SelectInput from '../SelectInput';
import { SliderInput } from '../SliderInput';
import NodeLayout from './NodeLayout';

interface DetectionYoloNodeProps {
  data: { label: string; config_names: string[] };
  id: string;
}

const DetectionYoloNode = ({ id, data }: DetectionYoloNodeProps) => {
  const { label, config_names } = data;

  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleSubmitThreshold = (value: number | number[]) => {
    updateNodeData({ id, type: ServiceType.DetectionYolo, threshold: value });
  };
  const handleSubmitConfig = (conf: string[]) => {
    updateNodeData({ id, type: ServiceType.DetectionYolo, names: conf });
  };
  return (
    <NodeLayout node_id={id} node_name={label} node_type="detectionYolo">
      <SliderInput
        title="Threshold"
        step={0.1}
        handleSubmit={handleSubmitThreshold}
      />
      <SelectInput
        title="Detection Configuration"
        choices={config_names}
        handleSubmit={handleSubmitConfig}
      />
    </NodeLayout>
  );
};

export default memo(DetectionYoloNode);
