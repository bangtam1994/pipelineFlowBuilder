import { Node } from 'reactflow';
import { ServiceDS } from '../types';
import ReaderNode from '../../components/Node/ReaderNode';
import DetectionYoloV8 from '../../components/Node/DetectionYoloV8Node';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RadarIcon from '@mui/icons-material/Radar';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TrackingNode from '../../components/Node/TrackingNode';
import CropRotateIcon from '@mui/icons-material/CropRotate';

import { v4 as uuidv4 } from 'uuid';

export const nodeTypes = {
  reader: ReaderNode,
  detectionYolov8: DetectionYoloV8,
  trackingBotsort: TrackingNode,
};

export const nodeConstraints = {
  reader: {
    outputs: 'frame',
  },
  detectionYolov8: {
    inputs: 'frame',
    outputs: 'detection',
  },
  trackingBotsort: {
    inputs: 'detection',
    outputs: 'tracking',
  },
};

export const nodeHandleMultipleConnections = {
  reader: { inputs: false, outputs: true },
  detectionYolov8: { inputs: true, outputs: false },
  trackingBotsort: { inputs: false, outputs: false },
};

export const nodeHasHandle: any = {
  reader: { inputs: false, outputs: true },
  detectionYolov8: { inputs: true, outputs: true },
  trackingBotsort: { inputs: true, outputs: true },
};

export const getId = () => uuidv4();

export enum PipelineStatus {
  Start = 'start',
  Running = 'runing',
  Finished = 'finish',
  Stopped = 'stop',
  Error = 'error',
}
export const parseServiceInNode = (service: ServiceDS): Node => {
  return {
    id: getId(),
    data: {
      label: renderNodeType(service.service_name).label,
    },
    position: { x: 5, y: 5 },
    type: renderNodeType(service.service_name).type,
    deletable: true,
  };
};

export const renderNodeType = (name: string) => {
  switch (name) {
    case 'reader':
      return { type: 'reader', label: 'Reader', icon: FileDownloadIcon };
    case 'detectionYolov8':
      return {
        type: 'detectionYolov8',
        label: 'DetectionYoloV8',
        icon: RadarIcon,
      };
    case 'tracking-botsort':
      return {
        type: 'trackingBotsort',
        label: 'Tracking',
        icon: GpsFixedIcon,
      };

    default:
      return { type: 'reader', label: 'Reader', icon: FileDownloadIcon };
  }
};

export default nodeTypes;
