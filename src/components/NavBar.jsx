import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Routes,Route,Link} from "react-router-dom";
import Button from '@mui/material/Button';

function NavBar() {
  return (
	<>
        <AppBar position="static" elevation={0} className="gradient-color">
            <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
                
                <Button size="high" href="/" color="inherit">
                    Pyronix Security Systems
                </Button>
            </Typography>

            <Button href="/" color="inherit" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Home
            </Button>
            </Toolbar>
      </AppBar>
	</>
  );
}

export default NavBar;
