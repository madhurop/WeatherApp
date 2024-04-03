

// weather.js

const weatherConditions = {
    0: "Clear sky",
    "1": "Mainly clear",
    "2": "Partly cloudy",
    "3": "Overcast",
    "45": "Fog",
    "48": "Depositing rime fog",
    "51": "Drizzle: Light ",
    "53": "Drizzle: Moderate ",
    "55": "Drizzle: Dense ",
    "56": "Freezing Drizzle: Light ",
    "57": "Freezing Drizzle: Dense ",
    "61": "Rain: Slight ",
    "63": "Rain: Moderate ",
    "65": "Rain: Heavy ",
    "66": "Freezing Rain: Light ",
    "67": "Freezing Rain: Heavy ",
    "71": "Snow fall: Slight ",
    "73": "Snow fall: Moderate ",
    "75": "Snow fall: Heavy ",
    "77": "Snow grains",
    "80": "Rain showers",
    "81": "Rain showers",
    "82": "Rain showers: Violent",
    "85": "Snow showers: Slight",
    "86": "Snow showers: Heavy",
    "95*": "Thunderstorm: Slight",
    "96": "Thunderstorm: slight",
    "99*": "Thunderstorm heavy"
};

const weatherImages = {
    0: "https://i.ibb.co/Brz59nV/clearSky.jpg",
    1: "https://i.ibb.co/LJNX1Y9/mainly-Clear.jpg",
    2: "https://i.ibb.co/VD0hfSJ/partly-Cloudy.jpg" ,
    3: "https://i.ibb.co/S0cYVMh/overcast.jpg",
    45: "https://i.ibb.co/BLtgn3p/fogg.jpg",
    48: "https://i.ibb.co/BLtgn3p/fogg.jpg",
    51: "https://i.ibb.co/0Z31cRC/drizzle.jpg",
    53: "https://i.ibb.co/0Z31cRC/drizzle.jpg",
    55: "https://i.ibb.co/0Z31cRC/drizzle.jpg",
    57: "https://i.ibb.co/WxVLb91/frezzing-Drizzle.jpg",
    61: "https://i.ibb.co/G7YJfdH/rain-Slight-Intense.jpg",
    80: "https://i.ibb.co/G7YJfdH/rain-Slight-Intense.jpg",
    81: "https://i.ibb.co/G7YJfdH/rain-Slight-Intense.jpg",
    82: "https://i.ibb.co/G7YJfdH/rain-Slight-Intense.jpg",
    63: "https://i.ibb.co/41PWYJv/rain-Moderate.jpg",
    65: "https://i.ibb.co/41PWYJv/rain-Moderate.jpg",
    66: "https://i.ibb.co/rdjLxWj/freezing-Rain.jpg",
    67: "https://i.ibb.co/rdjLxWj/freezing-Rain.jpg",
    71: "https://i.ibb.co/17DtKV8/Gemini-Generated-Image.jpg",
    73: "https://i.ibb.co/17DtKV8/Gemini-Generated-Image.jpg",
    75: "https://i.ibb.co/17DtKV8/Gemini-Generated-Image.jpg",
    77: "https://i.ibb.co/17DtKV8/Gemini-Generated-Image.jpg",
    85: "https://i.ibb.co/17DtKV8/Gemini-Generated-Image.jpg",
    86: "https://i.ibb.co/17DtKV8/Gemini-Generated-Image.jpg",
    95: "https://i.ibb.co/vJCCMxH/thunder-Storm.jpg",
    96: "https://i.ibb.co/vJCCMxH/thunder-Storm.jpg",
    99: "https://i.ibb.co/vJCCMxH/thunder-Storm.jpg",
    
};

// Example usage:
// Create a new Date object
var currentDate = new Date();

// Get the current date components
var day = currentDate.getDate(); // Get the day (1-31)
var month = currentDate.getMonth() + 1; // Get the month (0-11), adding 1 to match usual month numbering (1-12)
var year = currentDate.getFullYear(); // Get the year (e.g., 2024)

// Format the date as desired
var formattedDate = year + '-' + month + '-' + day; // Example: "2024-4-2"
document.querySelector('.date').textContent = formattedDate;
console.log("Current date is:", formattedDate);




async function fetchWeatherData(latitude, longitude) {
  try {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,daylight_duration&timezone=auto`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      document.getElementById('loader').style.visibility = 'hidden';
      const genTime = data.current.time;
      const sDadate = genTime.slice(0,-6);
      document.querySelector('.date').textContent = sDadate;
      document.querySelector('.temperature').textContent = data.current.temperature_2m + "°C";
      document.querySelector('.description').textContent = weatherConditions[data.current.weather_code];
      document.getElementById('humid-t').innerHTML = "Humidity: " + data.hourly.relative_humidity_2m[0] + " %";
      document.querySelector('.wind-t').textContent = "Wind: " + data.hourly.wind_speed_10m[0] + "kmh";
      document.querySelector('.visi-t').textContent = "Visibility: " + data.hourly.visibility[0] / 1000 + "km";
      const backgroundImageUrl = weatherImages[data.current.weather_code];
      document.getElementById("abc").style.backgroundImage = "url(" + backgroundImageUrl + ")";
  } catch (error) {
      console.log('Error fetching weather data:', error);
  }
}

async function fetchForecastData(latitude, longitude) {
  try {
      const apiUrlD = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code&hourly=temperature_2m,relative_humidity_2m,weather_code,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
      const response = await fetch(apiUrlD);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      document.getElementById('loader').style.visibility = 'hidden';
      const forecastDays = data.daily.temperature_2m_max;
      const weatherCodes = data.daily.weather_code;
      const dayDate = data.daily.time;
      for (let index = 0; index < forecastDays.length; index++) {
          const forecast = forecastDays[index];
          const dateString = dayDate[index];
          const date = new Date(dateString);
          const localizedDateString = date.toLocaleDateString('en-US', { weekday: 'long' });
          const dayElement = document.querySelector(`.day:nth-child(${index + 1})`);
          dayElement.querySelector('.day-name').innerHTML = localizedDateString;
          dayElement.querySelector('.day-temp').innerHTML = `${forecastDays[index]}°C`;
          dayElement.querySelector('.day-weather').innerHTML = weatherConditions[weatherCodes[index]];
          //dayElement.style.backgroundImage = "url('" + weatherImages[weatherCodes[index]] + "')";
      }
  } catch (error) {
      console.log('Error fetching forecast data:', error);
  }
}

async function searchLocation(place) {
  try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place.value)}`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length > 0) {
        
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          getPlaceName1(latitude, longitude);
          document.querySelector('.city').textContent = place.value;
          await fetchForecastData(latitude, longitude);
          await fetchWeatherData(latitude, longitude);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } else {
          console.error('Location not found');
          alert('Sorry We Did Not Find The Location')
          document.getElementById('loader').style.visibility = 'hidden';
      }
  } catch (error) {
      console.error('Error fetching geocoding data:', error);
  }
}

const place = document.getElementById('searchInput');
const getPlace = document.getElementById('search-bt');
getPlace.addEventListener('click', async () => {
  document.getElementById('loader').style.visibility = 'visible';
  await searchLocation(place);
});

function getPlaceName(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`;
  fetch(apiUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          const arr = data.display_name;
          var df = arr.split(",");
          const placeName = df[0] + "," + data.address.state;
          document.querySelector('.city').textContent = placeName;
      })
      .catch(error => {
          console.error('Error fetching place name:', error);
      });
}

async function getPlaceName1(latitude, longitude) {
  try {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const arr = data.display_name;
      var df = arr.split(",");
      console.log(df);
  } catch (error) {
      console.error('Error fetching place name:', error);
  }
}

function currentGeo() {
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async function(pos) {
          var latitude = pos.coords.latitude;
          var longitude = pos.coords.longitude;
          await fetchWeatherData(latitude, longitude);
          await fetchForecastData(latitude, longitude);
          getPlaceName(latitude, longitude);
      });
  } else {
      console.log("Geolocation is not supported by this browser.");
  }
}

currentGeo();
