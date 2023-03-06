import React, { memo, useState } from 'react';
import {
  Box,
  Checkbox,
  Chip,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface SelectInputProps {
  title?: string;
  choices: any[];
  handleSubmit: (value: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const SelectInput = ({ title, choices, handleSubmit }: SelectInputProps) => {
  const [config, setConfig] = useState<string[]>([]);
  const handleSelectConfiguration = (
    event: SelectChangeEvent<typeof config>
  ) => {
    const {
      target: { value },
    } = event;
    setConfig(typeof value === 'string' ? value.split(',') : value);
    handleSubmit(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Box sx={{ minHeight: '80px' }} className="nodrag">
      {title && (
        <InputLabel id="config-detection" sx={{ fontSize: 12 }}>
          {title}
        </InputLabel>
      )}
      <Select
        labelId="config-detection"
        id="select"
        multiple
        displayEmpty
        value={config}
        onChange={handleSelectConfiguration}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Select a config</em>;
          } else {
            return (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} sx={{ fontSize: '8px' }} />
                ))}
              </Box>
            );
          }
        }}
        sx={{
          width: '180px',

          fontSize: '8px',
          marginTop: '8px',
        }}
        MenuProps={MenuProps}
      >
        {choices.map((choice: string) => (
          <MenuItem key={choice} value={choice}>
            <Checkbox checked={config.indexOf(choice) > -1} />
            <ListItemText primary={choice} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default memo(SelectInput);
