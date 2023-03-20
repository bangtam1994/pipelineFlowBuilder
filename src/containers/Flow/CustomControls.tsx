import React from 'react';
import { Controls, Node } from 'reactflow';
import { MenuItem, Button } from '@mui/material';
import { ServiceDS } from '../types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledMenu from '../../components/StyledMenu';
import { parseServiceInNode, renderNodeType } from './utils';

interface CustomControlsProps {
  servicesDS: ServiceDS[];
  nodes: Node[];
  addNode: (node: Node) => void;
  getId: () => string;
}
const CustomControls = ({
  servicesDS,
  addNode,
  getId,
}: CustomControlsProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Controls>
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ marginTop: '8px' }}
        >
          Add a Service
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {servicesDS.length > 0 &&
            servicesDS.map((service: ServiceDS) => {
              const newNode: Node = {
                ...parseServiceInNode(service),
                id: getId(),
              };

              const handleClick = () => {
                addNode(newNode);
                handleClose();
              };

              const result = renderNodeType(service.type);
              return (
                <MenuItem
                  onClick={handleClick}
                  disableRipple
                  key={service.data.label}
                >
                  <result.icon />
                  {result.label}
                </MenuItem>
              );
            })}
        </StyledMenu>
      </div>
    </Controls>
  );
};

export default CustomControls;
