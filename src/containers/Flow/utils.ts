import { Node } from 'reactflow';
import { ServiceDS } from '../types';
import ReaderNode from '../../components/Node/ReaderNode';
import DetectionYolo from '../../components/Node/DetectionYoloNode';
import TrackingNode from '../../components/Node/TrackingNode';
import OutputNode from '../../components/Node/OutputNode';
import DebugNode from '../../components/Node/DebugNode';
import ResizerNode from '../../components/Node/ResizerNode';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RadarIcon from '@mui/icons-material/Radar';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import OutputIcon from '@mui/icons-material/Output';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

import { v4 as uuidv4 } from 'uuid';

export const nodeTypes = {
  reader: ReaderNode,
  detectionYolo: DetectionYolo,
  trackingBotsort: TrackingNode,
  debug: DebugNode,
  outputVideo: OutputNode,
  resizer: ResizerNode,
};

export const nodeConstraints = {
  reader: {
    outputs: ['frame'],
  },
  detectionYolo: {
    inputs: ['frame'],
    outputs: ['detection'],
  },
  trackingBotsort: {
    inputs: ['detection'],
    outputs: ['tracking'],
  },
  debug: {
    inputs: ['frame', 'detection', 'tracking'],
  },
  outputVideo: {
    inputs: ['frame', 'detection', 'tracking'],
  },
  resizer: {
    inputs: ['frame'],
    outputs: ['frame'],
  },
};

export const nodeHandleMultipleConnections = {
  reader: { inputs: false, outputs: true },
  detectionYolo: { inputs: true, outputs: false },
  trackingBotsort: { inputs: false, outputs: false },
  outputVideo: { inputs: true, output: false },
  debug: { inputs: true, output: false },
  resizer: { inputs: true, output: true },
};

export const nodeHasHandle: any = {
  reader: { inputs: false, outputs: true },
  detectionYolo: { inputs: true, outputs: true },
  trackingBotsort: { inputs: true, outputs: true },
  outputVideo: { inputs: true, outputs: false },
  debug: { inputs: true, outputs: false },
  resizer: { inputs: true, outputs: true },
};

export const getId = () => uuidv4();

export const parseServiceInNode = (service: ServiceDS): Node => {
  const { data, type, id } = service;
  return {
    id: getId(),
    data: { ...data, serviceId: id },
    position: { x: 5, y: 5 },
    type: type,
    deletable: true,
  };
};

export const renderNodeType = (type: string) => {
  switch (type) {
    case 'reader':
      return { label: 'Reader', type: 'reader', icon: FileDownloadIcon };
    case 'detectionYolo':
      return {
        type: 'detectionYolo',
        label: 'DetectionYolo',
        icon: RadarIcon,
      };
    case 'trackingBotsort':
      return {
        type: 'trackingBotsort',
        label: 'Tracking',
        icon: GpsFixedIcon,
      };
    case 'resizer':
      return { type: 'resizer', label: 'Resizer', icon: CropRotateIcon };
    case 'output':
      return { type: 'outputVideo', label: 'Output', icon: OutputIcon };

    case 'debug':
      return { type: 'debug', label: 'Debug', icon: VideoSettingsIcon };
    default:
      return { type: 'reader', label: 'Reader', icon: FileDownloadIcon };
  }
};

export default nodeTypes;
