import React, { useState,useEffect } from 'react'
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import AlertMessage from '../components/AlertMessage'


function EditCityModel(props) {

	const [formData, setformData] = useState([]);
	const [isLoading, setIsloading] = useState(false)

	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)

	const handleChange = (e) => {
		setformData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Update Function
	const updateCity= (e)=>{
			e.preventDefault()
			setIsloading(true)

			let Id = props.selectedCity.id;
			console.log("selectedCity",formData)
			axios.put(`${props.URL}/admin/${Id}`,formData)
			 .then(function (response) {
			     console.log(response);
				 props.handleClose();
				 props.fetchAllCities();
				 setIsloading(false);
				 setIsError(true);
				setErrorMessage({msg:"City Updated Successfully",severity:"success"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);

			}).catch(function (error) {
				setErrorMessage({msg:"Something Went Wrong .!",severity:"error"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);
			     console.log(error);
			 });
	}
    return (
		<>
			{/* Alert Message */}
			<AlertMessage open={isError} message={errorMessage} />
			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>Edit City</DialogTitle>
				<form onSubmit={updateCity} encType='multipart/form-data'>
					<DialogContent>
							<DialogContentText/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="cityname"
								label="City Name"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}
								defaultValue={ props.selectedCity.city_name}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="state"
								label="State"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}
								defaultValue={props.selectedCity.state}

							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="country"
								label="Country Name"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}
								defaultValue={props.selectedCity.country}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="touristrating"
								label="Tourist Rating"
								fullWidth
								type="number"
								onInput={(e)=>{ 
									e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,1)
								}}
								variant="standard"
								onChange={(e) => handleChange(e)}
								defaultValue={props.selectedCity.tourist_rating}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="estimatedpopulation"
								label="Estimated Population "
								fullWidth
								type="number"
								variant="standard"
								onChange={(e) => handleChange(e)}
								defaultValue={props.selectedCity.estimated_population}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="currency"
								label="Currency "
								fullWidth
								variant="standard"
								onChange={(e) => handleChange(e)}
								defaultValue={props.selectedCity.currency}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="dateestablished"
								label="Date Established "
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
								variant="standard"
								type="date"
								onChange={(e) => handleChange(e)}
								defaultValue={props.selectedCity.date_established}
							/>
					</DialogContent>
					<DialogActions>
						<Button onClick={props.handleClose}>Cancel</Button>
						<Button type='submit' disabled={isLoading}>
						{isLoading ? <CircularProgress color="inherit" size="15px"/>:false} Update
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
  );
}
export default EditCityModel;
