import React, { ChangeEvent, memo, useState } from 'react';
import Switch from '@mui/material/Switch';
import { Box, InputLabel } from '@mui/material';

interface SwitchProps {
  title?: string;
  handleSubmit: (value: boolean) => void;
}

const SwitchInput = ({ title, handleSubmit }: SwitchProps) => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleSubmit(event.target.checked);
  };

  return (
    <Box>
      {title && <InputLabel sx={{ fontSize: 12 }}>{title}</InputLabel>}
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        size="small"
      />
    </Box>
  );
};

export default memo(SwitchInput);
