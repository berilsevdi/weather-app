import { useEffect, useState } from 'react';

import axios from 'axios';
import * as Location from 'expo-location';

import { WeatherData } from '../stores/appSlice';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const useLocationWeather = () => {
  const [locationWeather, setLocationWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Konum izni verilmedi.');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const { data } = await axios.get(
          `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        const weather: WeatherData = {
          city: data.name,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          windSpeed: data.wind.speed,
          windDegree: data.wind.deg,
          clouds: data.clouds.all,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          countryCode: data.sys.country,
          timestamp: data.dt,
        };

        setLocationWeather(weather);
      } catch (err) {
        setError('Konumdan hava durumu alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocationWeather();
  }, []);

  return { locationWeather, loading, error };
};

export default useLocationWeather;
