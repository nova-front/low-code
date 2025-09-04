'use client';

import { Box, Grid2 as Grid } from '@mui/material';
import Demo from '@/components/demo';
import { TextField, TextArea } from '@/components';

const Docs = () => {
  return (
    <Box
      sx={{
        padding: '20px',
      }}
    >
      <h1 style={{ marginBottom: '16px' }}>基础组件</h1>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Demo title="单行文本">
            <TextField label="姓名" fullWidth />
          </Demo>
        </Grid>
        <Grid size={4}>
          <Demo title="单行文本(error)">
            <TextField label="姓名" fullWidth error helperText="error" />
          </Demo>
        </Grid>
        <Grid size={4}>
          <Demo title="单行文本(disabled)">
            <TextField label="姓名" fullWidth disabled />
          </Demo>
        </Grid>
        <Grid size={4}>
          <Demo title="多行文本">
            <TextArea label="备注" fullWidth />
          </Demo>
        </Grid>
        <Grid size={4}>
          <Demo title="多行文本(error)">
            <TextArea label="备注" fullWidth error helperText="error" />
          </Demo>
        </Grid>
        <Grid size={4}>
          <Demo title="多行文本(disabled)">
            <TextArea label="备注" fullWidth disabled />
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Docs;
