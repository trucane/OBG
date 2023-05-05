import * as React from 'react';
import Typography from '@mui/material/Typography';

interface TitleProps {
  children?: React.ReactNode;
}

export const Title = ({children}: TitleProps) => {
  return (
    <Typography component="h2" variant="h6" sx={{color: "#E4B337"}} gutterBottom>
      {children}
    </Typography>
  );
}