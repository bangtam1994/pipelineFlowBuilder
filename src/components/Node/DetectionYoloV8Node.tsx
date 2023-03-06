import { Box, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { memo, useState } from 'react';
import CustomHandles from '../../containers/Flow/CustomHandles';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import SelectInput from '../SelectInput';
import { SliderInput } from '../SliderInput';
import NodeLayout from './NodeLayout';

interface DetectionYolov8NodeProps {
  data: any;
  id: string;
}

const DetectionYolov8Node = ({ id, data }: DetectionYolov8NodeProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleSubmitThreshold = (value: number | number[]) => {
    updateNodeData({ id, type: ServiceType.DetectionYoloV8, threshold: value });
  };
  const handleSubmitConfig = (conf: string[]) => {
    updateNodeData({ id, type: ServiceType.DetectionYoloV8, names: conf });
  };
  return (
    <NodeLayout
      node_id={id}
      node_name="Detection Yolo V8"
      node_type="detectionYolov8"
    >
      <SliderInput
        title="Threshold"
        step={0.1}
        handleSubmit={handleSubmitThreshold}
      />
      <SelectInput
        title="Detection Configuration"
        choices={['config1', 'config2', 'config3', 'config4']} // TODO: GET list
        handleSubmit={handleSubmitConfig}
      />
    </NodeLayout>
  );
};

export default memo(DetectionYolov8Node);
