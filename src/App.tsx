import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import PipelineCreate from './pages/PipelineCreate';
import { ReactFlowProvider } from 'reactflow';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ReactFlowProvider>
          <div>
            <Routes>
              <Route path="*" element={<Home />}></Route>
              <Route
                path="/pipeline_create"
                element={<PipelineCreate />}
              ></Route>
            </Routes>
          </div>
        </ReactFlowProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
