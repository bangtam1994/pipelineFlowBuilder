import React, { FC, useState } from 'react';
import { Box, InputLabel, Slider } from '@mui/material';

interface Mark {
  value: number;
  label?: React.ReactNode;
}

interface SliderProps {
  title?: string;
  marks?: Mark[] | boolean;
  step: number | null;
  min?: number;
  max?: number;
  handleSubmit: (value: number | number[]) => void;
}

export const SliderInput: FC<SliderProps> = ({
  title,
  marks = false,
  step,
  min = 0,
  max = 1,
  handleSubmit,
}: SliderProps) => {
  const [slider, setSlider] = useState<number | number[]>(0);
  const handleChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setSlider(value);
    handleSubmit(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        fontSize: '8px',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '12px 0px',
      }}
      className="nodrag"
    >
      {title && <InputLabel sx={{ fontSize: 12 }}>{title}</InputLabel>}

      <Slider
        value={slider}
        onChange={handleChange}
        defaultValue={0}
        min={min}
        max={max}
        valueLabelDisplay="on"
        step={step}
        size="small"
        marks={marks}
        sx={{
          '& .MuiSlider-valueLabelLabel': {
            fontSize: '8px',
          },
          '& .MuiSlider-markLabel': { fontSize: '8px' },
        }}
      />
    </Box>
  );
};
