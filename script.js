window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature');
	let temperatureSpan = document.querySelector('.temperature span');

	if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition
			(position => {
				long = position.coords.longitude; 
				lat = position.coords.latitude;

				const proxy = "https://cors-anywhere.herokuapp.com/"
				const api = `${proxy}https://api.darksky.net/forecast/f50fc13b46890d42974d4d6f26b650ca/${lat},${long}`;

			fetch(api)
			.then(response => {
				return response.json();
			})
			.then(data => {
					const { temperature, summary, icon } = data.currently;
					//set DOM elements
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary; 
					locationTimezone.textContent = data.timezone;
					//celsius formula
					let celsius = (temperature - 32) * (5/9);
					//set icon
					setIcons(icon, document.querySelector('.icon'));
					//Change between C and F
					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === "F") {
							 temperatureSpan.textContent = "C";
							 temperatureDegree.textContent = celsius.toFixed(2);
						}  else {
							 temperatureSpan.textContent = "F";
							 temperatureDegree.textContent = temperature;
						}
					});

			});
		});
	}
	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});