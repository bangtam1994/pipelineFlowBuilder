export interface ServiceDS {
  id: string;
  created_at: Date | string;
  created_by: string;
  updated_at: Date | string;
  update_by: string;
  service_name: string;
  version: string;
  input: string;
  output: string;
  description: string;
  data: any;
  type: ServiceType;
}

export enum PipelineStatus {
  Start = 'started',
  Running = 'running',
  Finished = 'finished',
  Stopped = 'stopped',
  Error = 'error',
}

export enum ServiceType {
  Reader = 'reader',
  DetectionYolo = 'detectionYolo',
  Tracking = 'trackingBotsort',
  Debug = 'debug',
  Output = 'outputVideo',
  Resizer = 'resizer',
}

export interface Service {
  type: ServiceType;
  id: string;
  [x: string | number | symbol]: unknown;
}

export interface Location {
  id: string;
  location_name: string;
}

export interface PipelineForm {
  location_id: string;
  pipeline_name: string;
}
