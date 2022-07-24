import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';


function AddEditModel(props) {

    return (
			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>Add City</DialogTitle>
				<form onSubmit={props.handleSubmit} encType='multipart/form-data'>
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
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.city_name:''}
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
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.state:''}

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
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.country:''}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="touristrating"
								label="Tourist Rating"
								type="number"
								fullWidth
								variant="standard"
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.tourist_rating:''}
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
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.estimated_population:''}
							/>
							<TextField
								autoFocus
								required
								margin="dense"
								name="currency"
								label="Currency "
								fullWidth
								variant="standard"
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.currency:''}
							/>
							<TextField
								autoFocus
								type="date"
								required
								margin="dense"
								name="dateestablished"
								label="Date Established "
								fullWidth
								InputLabelProps={{
									shrink: true,
								}}
								variant="standard"
								onChange={(e) => props.handleChange(e)}
								defaultValue={props.selectedCity !== undefined ? props.selectedCity.date_established:''}

							/>
					</DialogContent>
					<DialogActions>
						<Button onClick={props.handleClose}>Cancel</Button>
						<Button type='submit' disabled={props.isAddBtnLoading}>
						{props.isAddBtnLoading ? <CircularProgress color="inherit" size="15px"/>:false} Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
  );
}
export default AddEditModel;
