const api = {
	key : "2fe5c6707108ed894c99148860cc53ae",
	url : "https://api.openweathermap.org/data/2.5/"
}

const btn = document.querySelector('.btn');
btn.addEventListener('click', function(){
	aquireInfo();
});

const searchbar = document.querySelector('.search-bar');
searchbar.addEventListener('keypress', function(e){
	if (e.keyCode === 13){
		aquireInfo(searchbar.value);
		console.log(searchbar.value);
	}
});

function aquireInfo (query) {
	fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
		.then(weather => {
			return weather.json();
	}).then(displayInfo);
}


function displayInfo (weather) {
	console.log(weather);

	let city = document.querySelector('.location .city');
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector('.location .date');
	date.innerText = dateBuilder(now);

	let temp = document.querySelector('.state .temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

	let weather_state = document.querySelector('.state .weather');
	weather_state.innerText = weather.weather[0].main;

	let range = document.querySelector('.range');
	range.innerText =`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder (d) {
	let days = ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}