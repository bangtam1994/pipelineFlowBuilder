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
}

export enum ServiceType {
  Reader = 'reader',
  DetectionYoloV8 = 'detectionYolov8',
  Tracking = 'tracking-botsort',
}

export interface Service {
  type: ServiceType;
  id: string;
  [x: string | number | symbol]: unknown;
}
export interface ReaderPayload extends Service {
  file: File;
}
