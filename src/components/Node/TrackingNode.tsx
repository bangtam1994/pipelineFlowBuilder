import React, { memo } from 'react';
import useStore from '../../containers/Flow/store';
import { ServiceType } from '../../containers/types';
import { SliderInput } from '../SliderInput';
import SwitchInput from '../SwitchInput';
import NodeLayout from './NodeLayout';

interface TrackingNodeProps {
  data: any;
  id: string;
}

const TrackingNode = ({ id, data }: TrackingNodeProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const handleSubmitBuffer = (value: number | number[]) => {
    updateNodeData({ id, type: ServiceType.Tracking, track_buffer: value });
  };
  const handleSubmitReid = (value: boolean) => {
    updateNodeData({ id, type: ServiceType.Tracking, reid: value });
  };
  return (
    <NodeLayout
      node_id={id}
      node_name="Tracking Botsort"
      node_type="trackingBotsort"
    >
      <SliderInput
        title="Tracking buffer"
        marks={[0, 15, 30, 60, 120].map((el) => ({ value: el, label: el }))}
        step={null}
        min={0}
        max={120}
        handleSubmit={handleSubmitBuffer}
      />
      <SwitchInput title="Reid" handleSubmit={handleSubmitReid} />
    </NodeLayout>
  );
};

export default memo(TrackingNode);
