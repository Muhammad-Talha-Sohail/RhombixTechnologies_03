import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { Backdrop, colors } from '@mui/material';
// #347020
const navItems =['Home', 'About', 'Contact']; 

const NavBar = () => {
    return (
        <AppBar component="nav"  position="static" sx={{ backgroundColor: '#347020' }}>
         <CssBaseline />
          <Toolbar>
             <Typography
              variant="h6"
              component="div"
              
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Leaf Disease Detection
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                  <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        
      );
}



export default NavBar