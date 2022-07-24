import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import CitiesTable from '../components/CitiesTable'
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AlertMessage from '../components/AlertMessage'

const API_KEY = process.env.REACT_WEATHER_API_KEY;
const URL = process.env.REACT_APP_API_URL;

function SearchCity() {
	const [cityName, setCityname] = useState('')
	const [cities, setCities] = useState([])
	const [isLoading, setIsloading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [isDataExistInDb, setIsDataExistInDb] = useState(false)

	// All API Calling Function 
	/***  
	* Function to fetch city from  Rest countries Api 
	* If There is city with the name  
	* Call the Weather Api with the corresponding Lat & Lng
	* Store in to Cities State
	***/
	const fetchCity = async () => {
			setIsloading(true)

			await axios.get(`https://restcountries.com/v2/capital/${cityName}`)
			.then((response) => {
				return response.data
			}).catch((err)=>{
		        setIsloading(false)
				// Set error message and flag
				setIsError(true);
				setErrorMessage({msg:"Not Data Available",severity:"error"})
				setTimeout(() => {
					setIsError(false);
				}, 2000);
			})
			.then(async (Cities) => {
				// If City is empty for any reason no need to call weather api 
				if(Cities){
					await fetchWeather(Cities)
				}
			});
	};
	/***  
	* Function to fetch weather from  community-open-weather-map Api 
	* Open Weather Showing 401 (ApiKay Not Valid) for some reason So Used Rapid Api      
	* Call the Weather Api with the corresponding Lat & Lng
	* Map the weather data in to cities State
	***/
	const fetchWeather = (Cities) => {
			// Getting LAt an Lng from Cities
			let params = {
				lat: Cities[0].latlng[0],
				lon: Cities[0].latlng[1],
				lang: 'null',
				units: 'metric',
			  }
			  let headers = {
				'X-RapidAPI-Key': API_KEY??'d742cbe59cmsh467ffee9a090dddp157f3ajsn0828b63f97f3',
				'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
			  }
			    let CityData ={
					Capital:Cities[0].capital?? "N/A",
					StateName:Cities[0].subregion?? "N/A",
					TouristRating:Cities[0].TouristRating?? "N/A",
					CountryName:Cities[0].name?? "N/A",
					DateEstablished:Cities[0].dateestablished?? "N/A",
					Population:Cities[0].population?? "N/A",
					Currency:Cities[0].currencies[0].name+"("+Cities[0].currencies[0].symbol+")"?? "N/A",
				}
			axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{params,headers}).then(function (weatherResponse) {
				
			    const weatherData = weatherResponse.data
				// Mapping City Data and Weather Data
			    // Re initializing  the city object
				CityData = {
					Capital:Cities[0].capital?? "N/A",
					StateName:Cities[0].subregion?? "N/A",
					TouristRating:Cities[0].TouristRating?? "N/A",
					CountryName:Cities[0].name?? "N/A",
					DateEstablished:Cities[0].dateestablished?? "N/A",
					Population:Cities[0].population?? "N/A",
					Currency:Cities[0].currencies[0].name+"("+Cities[0].currencies[0].symbol+")"?? "N/A",
					Weather: weatherData.main.temp+"°C",
					WeatherIcon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
				}
				// Setting City data to state including Weather 
				setCities(CityData);
		        setIsloading(false)
			}).catch(function (error) {
				setErrorMessage({msg:"No Weather Data Available",severity:"error"})
		        setIsloading(false)
				setIsError(true);
				setTimeout(() => {
					setIsError(false);
				}, 2000);
			});

			// Setting City Values Without weather
			setCities(CityData);
	};

	/***  
	* Function to fetch city from db 
	* If There is no city with the name in Db 
	*   Call The Rest countries Api
	***/
	const fetchCityFromDb = async ()=>{
		setIsloading(true)
		let url = URL??'https://searchcity-backend.herokuapp.com/api'
		await axios.get(`${url}/cities/getCities/${cityName}`)
			  .then(function (response) {
				setIsloading(false)
				// Create city object for frontEnd
				let CityData ={
					Capital:response.data[0].city_name?? "N/A",
					StateName:response.data[0].state?? "N/A",
					TouristRating:response.data[0].tourist_rating?? "N/A",
					CountryName:response.data[0].country?? "N/A",
					DateEstablished:response.data[0].date_established?? "N/A",
					Population:response.data[0].estimated_population?? "N/A",
					Currency:response.data[0].currency?? "N/A",
				}
				  setCities(CityData)
			  })
			  .catch(function (error) {
				setIsError(true);
				setErrorMessage({msg:"No data Associated with the city name in DB Fetching Remotely  !",severity:"info"})
				setIsloading(true)
				setTimeout(() => {
					setIsError(false);
					fetchCity();
				}, 5000);
			});
	}

	// All  OnClick Handling  Function Starts 
	const handleSearchButton = () => {
		fetchCityFromDb();
	}
  return (
		<>
			<Container  sx={{ py: 8 }} maxWidth="md">    
				<Grid container spacing={2}>
					<AlertMessage open={isError} message={errorMessage} />
					<Grid item xs={12}>
						<TextField
							type="search"
							required
							fullWidth
							InputProps={{
							startAdornment: (
								<InputAdornment position="start">
								<SearchOutlinedIcon />
								</InputAdornment>
							)
							}}
							placeholder="Search city"
							onChange={(e) => setCityname(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} justifyContent="center" container>
						<Button
							disabled={isLoading}
							type="submit"
							color="inherit" 
							className='all-button'
							variant="outlined" 
							sx={{ mt: 3, mb: 2 }}
							onClick={() => cityName !== "" ? handleSearchButton() : false}
							>
							Search  {isLoading ? <CircularProgress color="inherit" size="15px"/>:false}
						</Button>
					</Grid>
				</Grid>
				{cities.length !==0 ?<CitiesTable cities={cities}/>:false}
			</Container>
		</>

    );
}

export default SearchCity;
