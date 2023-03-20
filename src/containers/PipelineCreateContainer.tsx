import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { backendUrl } from '../config';
import useStore from './Flow/store';
import { Location } from './types';

const PipelineCreateContainer = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<
    Pick<Location, 'id'>
  >({
    id: '',
  });
  const [pipelineName, setPipelineName] = useState('');

  const onPipelineCreateForm = useStore((state) => state.onPipelineCreateForm);

  const fetchLocation = async () => {
    try {
      const results = await axios.get(`${backendUrl}/locations/`, {
        params: { limit: 100, page: 0 },
      });

      if (results.data) setLocations(results.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  return locations.length === 0 ? (
    <Box>Loading...</Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        width: '500px',
        margin: 'auto',
      }}
    >
      <TextField
        label="Pipeline Name"
        fullWidth
        value={pipelineName}
        onChange={(e) => {
          setPipelineName(e.target.value);
          onPipelineCreateForm({ pipeline_name: e.target.value });
        }}
      />
      <FormControl fullWidth>
        <InputLabel>Select a location</InputLabel>
        <Select
          labelId="location-select"
          id="location-select"
          label="Cameras"
          variant="outlined"
          fullWidth
          value={selectedLocation.id}
          onChange={(e: SelectChangeEvent<any>) => {
            setSelectedLocation((prev) => ({
              ...prev,
              id: e.target.value,
            }));
            onPipelineCreateForm({ location_id: e.target.value });
          }}
        >
          {locations.map((location: Location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.location_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PipelineCreateContainer;
