import { Box, Typography } from '@mui/material';

interface DemoProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const Demo = ({ title, children }: DemoProps) => {
  return (
    <Box>
      {title && (
        <Typography
          sx={{
            mb: 1,
          }}
          variant="h5"
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};
export default Demo;
