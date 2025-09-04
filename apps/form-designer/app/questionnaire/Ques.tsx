'use client';

import Form from '@/components/form';
import { Box } from '@mui/material';
import { components } from './config';
const Questionnaire = () => {
  return (
    <Box
      sx={{
        background: 'white',
        padding: '20px',
        width: '800px',
        height: '100vh',
        margin: 'auto',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>问卷调查</h1>
      <Form components={components} />
    </Box>
  );
};
export default Questionnaire;
