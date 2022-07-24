import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function CitiesTable(props) {
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
  return (
		<Paper elevation={1} style={{width: 'auto', overflowX: 'scroll'}}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>City Name</StyledTableCell>
						<StyledTableCell>State</StyledTableCell>
						<StyledTableCell>Country</StyledTableCell>
						<StyledTableCell>Tourist Rating</StyledTableCell>
						<StyledTableCell>Date Established</StyledTableCell>
						<StyledTableCell>Estimated Population</StyledTableCell>
						<StyledTableCell>Currency</StyledTableCell>
						<StyledTableCell>Weather</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
						<StyledTableRow>
						<StyledTableCell component="th" scope="row">{props.cities['Capital']}</StyledTableCell>
						<StyledTableCell>{props.cities['StateName']}</StyledTableCell>
						<StyledTableCell>{props.cities['CountryName']}</StyledTableCell>
						<StyledTableCell>{props.cities['TouristRating']}</StyledTableCell>
						<StyledTableCell>{props.cities['DateEstablished']}</StyledTableCell>
						<StyledTableCell>{props.cities['Population']}</StyledTableCell>
						<StyledTableCell>{props.cities['Currency']}</StyledTableCell>
						{props.cities['Weather'] !== undefined ? 
							<StyledTableCell>{props.cities['Weather']}<Avatar src={props.cities['WeatherIcon']} /></StyledTableCell> : 
							<StyledTableCell>N/A</StyledTableCell>
						}
						

					</StyledTableRow>
				</TableBody>
			</Table>
		</Paper>
  );
}

export default CitiesTable;
