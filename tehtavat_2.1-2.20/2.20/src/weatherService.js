import axios from 'axios';

const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = async (capital) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Virhe säätiedotuksen hakemisessa:', error);
    return null;
  }
};

export default { getWeather };