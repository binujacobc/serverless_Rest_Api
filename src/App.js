import {Routes,Route,Link} from "react-router-dom";
import SearchCity from './screens/SearchCityScreen';
import AdminLandingPage from './screens/AdminScreen';
import AppBar from '@mui/material/AppBar';
import PublicIcon from '@mui/icons-material/Public';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavBar from "./components/NavBar";
import './App.css';

function App() {
  return (
	<>
		<NavBar/>
		<Routes>
	  {/*<Route path="/" element={<SearchCity />} />*/}
			<Route path="/" element={<AdminLandingPage />} />
		</Routes>
	</>
  );
}

export default App;
