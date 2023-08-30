/* eslint-disable */
import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ header = false, sx }) {
  const theme = useTheme();

  if (header) {
    return (
      <Box component='img' src='https://ucarecdn.com/d35b26dc-28e3-4cef-8b0d-404883a79488/logo_header.png' sx={{ width: 128, height: 'auto', ...sx }} />
    );
  } else {
    return (
      <Box component='img' src='https://ucarecdn.com/9bf15142-8c19-457a-8cf6-d14d77a6f0b1/logo.png' sx={{ width: 64, height: 64, ...sx }} />
    );
  }
}
