import React, { useState,useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import axios from 'axios';
import AddCityModel from '../components/AddModel';
import EditCityModel from '../components/EditModel';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import AlertMessage from '../components/AlertMessage'
import Rating from '@mui/material/Rating';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const URL = process.env.REACT_APP_API_URL;

// Theme Section
const theme = createTheme();

	// For Themes
	theme.typography.h2 = {
	fontSize: '2rem',
	'@media (min-width:600px)': {
		fontSize: '25rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '3rem',
	},
	};

	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		},
	}));
	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
		border: 0,
		},
	}));

function CitiesTable() {
	const [addModelOpen, setAddModelOpen] = useState(false);
	const [editModelOpen, setEditModelOpen] = useState(false);
	const [cities, setCities] = useState([])
	const [selectedCity, setSelectedCity] = useState([])
	const [formData, setformData] = useState([]);
	const [isAddBtnLoading, setIsAddBtnLoading] = useState(false)

	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)

	// Initial api call to get all cities
	useEffect(() => {
		fetchAllCities()
	},[]);


	// Curd Api Call Function Section
	/**  
	*	Function To Fetch All Cities from backend
	*	Store the city in State
	**/
	const fetchAllCities= async ()=>{
		await axios.get(`${URL}/list`)
			  .then(function (response) {
				  setCities(response.data)
			  })
			  .catch(function (error) {
				setIsError(true);
				setErrorMessage({msg:"Something Went Wrong !",severity:"error"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);
			});
	}
	/**  
	*	Function To Create City 
	*	If City Created call the function to fetch all city  
	**/
	const addCity= (formData)=>{
		setIsAddBtnLoading(true);

		axios.post(`${URL}/insert`, formData)
			.then(function (response) {
				setIsAddBtnLoading(false);
				setAddModelOpen(false);
				fetchAllCities()
				setIsError(true);
				setErrorMessage({msg:"City Added Successfully",severity:"success"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
				setAddModelOpen(false);
				setIsError(true);
				setErrorMessage({msg:"Something Went Wrong .!",severity:"error"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);
			});
	}
	/**  
	*	Function To Delete City 
	*	If City Deleted call the function to fetch all  city  
	**/
	const deleteCity= (Id)=>{
		axios.delete(`${URL}/admin/${Id}`)
			.then(function (response) {
				fetchAllCities()
				setIsError(true);
				setErrorMessage({msg:"City Deleted Successfully",severity:"success"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);

				console.log(response);
			})
			.catch(function (error) {
				setIsError(true);
				setErrorMessage({msg:"Something Went Wrong .!",severity:"error"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);
				console.log(error);
			});
	}
	/**  
	*	Function To Get City by id this is for Edit Section 
	*	 Store the City to new State Selected city and pass this state as a props to edit model
	**/
	const getCityByID = (Id)=>{

		axios.get(`${URL}/admin/${Id}`)
			.then(function (response) {
				setSelectedCity(response.data);
				setEditModelOpen(true);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	// Form Handle Functions   
	const handleChange = (e) => {
		setformData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	// For model pop up
	const handleClickAddModelOpen = () => {
		setAddModelOpen(true);
	};

	// Set Close Flag
	const handleClose = () => {
		setAddModelOpen(false);
		setEditModelOpen(false);
	};

	// Handle Delete 
	const handleDelete = (id)=>{
		deleteCity(id)
	}

	// Handle Edit 
	const handleEdit = (id)=>{
		getCityByID(id)
	}
	// Form Submission  
		const handleSubmit = (e) => {
			e.preventDefault()
			addCity(formData)
	    };
		
    return (
		<Container sx={{ py: 8 }} maxWidth="md">    
		{/* Alert Message */}
		<AlertMessage open={isError} message={errorMessage} />
			<ThemeProvider theme={theme}>
				<Typography  variant="h2" align="center" color="white" gutterBottom>
				Pyronix Inventory
				</Typography>
			</ThemeProvider>
	    {/*	<Button color="inherit" className='all-button' variant="outlined" sx={{ my: 1, mx: 0 }} onClick={handleClickAddModelOpen} >Add <AddIcon/></Button>*/}

				{/* Pop up Model For Add City */}
				<AddCityModel open={addModelOpen} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} isAddBtnLoading={isAddBtnLoading}/>

				{/* Pop up Model For Edit City */}

				<EditCityModel open={editModelOpen} handleClose={handleClose} handleChange={handleChange} selectedCity={selectedCity} URL={URL} fetchAllCities={fetchAllCities}/>

			<Paper elevation={3} 
			style={{width: 'auto', overflowX: 'scroll',overflowY: 'scroll',height:'30rem'}}
			>
				<Table sx={{ minWidth: 700 }} stickyHeader>
					<TableHead>
						<TableRow>
							<StyledTableCell>ITEMS</StyledTableCell>
							<StyledTableCell>PRICE</StyledTableCell>
							<StyledTableCell>TYPE</StyledTableCell>
							<StyledTableCell>ID</StyledTableCell>
							{/*<StyledTableCell>Date Established</StyledTableCell>
							{/*<StyledTableCell>Estimated Population</StyledTableCell>
							{/*<StyledTableCell>Currency</StyledTableCell>
							{/* <StyledTableCell>Weather</StyledTableCell> */}
	    {/*<StyledTableCell>Modifiy</StyledTableCell>*/}
						</TableRow>
					</TableHead>
					<TableBody >
						
						{cities.length !== 0 ?  cities.map((row) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">{row.item}</StyledTableCell>
								<StyledTableCell>{row.price ?? "N/A"}</StyledTableCell>
								<StyledTableCell>{row.Type ?? "N/A"}</StyledTableCell>
							{/*<StyledTableCell>
									{
										row.tourist_rating !== null ?  <Rating name="read-only" value={row.tourist_rating} readOnly />:  
										"N/A"
									}
									
								</StyledTableCell>*/}
								<StyledTableCell>{row.productId?? "N/A"}</StyledTableCell>
							{/*<StyledTableCell>{row.estimated_population?? "N/A"}</StyledTableCell>
								<StyledTableCell>{row.currency ?? "N/A"}</StyledTableCell>
								 <StyledTableCell>N/A</StyledTableCell> 
								<StyledTableCell>
									<DeleteIcon className="" onClick={() => handleDelete(row.id)}/>
									<EditIcon className="" onClick={() => handleEdit(row.id)}/>
								</StyledTableCell>*/}
							</StyledTableRow>
						)):
						<TableRow>
						 	<StyledTableCell>--------</StyledTableCell>
							<StyledTableCell>--------</StyledTableCell>
							<StyledTableCell>--------</StyledTableCell>
							<StyledTableCell>No</StyledTableCell>
							<StyledTableCell>Data</StyledTableCell>
							<StyledTableCell>Available</StyledTableCell>
							<StyledTableCell>--------</StyledTableCell>
							{/* <StyledTableCell>Weather</StyledTableCell> */}
							<StyledTableCell>--------</StyledTableCell>
						</TableRow>
						}
						</TableBody>
				</Table>
			</Paper>
		</Container>
  );
}
export default CitiesTable;
