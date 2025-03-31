import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.OPENWEATHER_API_KEY;
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDegree: number;
  clouds: number;
  description: string;
  icon: string;
  countryCode: string;
  timestamp: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  icon: string;
  description: string;
}

interface CityInfo {
  name: string;
  country: string;
  population: number;
  region: string;
  timezone: string;
}

interface AppState {
  weatherList: WeatherData[];
  searchResult: WeatherData | null;
  cityInfo: CityInfo | null;
  currentLocationForecast: ForecastData[];
  currentWeather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  weatherList: [],
  searchResult: null,
  cityInfo: null,
  currentLocationForecast: [],
  currentWeather: null,
  loading: false,
  error: null,
};

export const fetchLocationForecast = createAsyncThunk<
  ForecastData[],
  { lat: number; lon: number },
  { rejectValue: string }
>('weather/fetchLocationForecast', async ({ lat, lon }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const dailyForecastMap = new Map<string, ForecastData>();

    data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      const time = item.dt_txt.split(' ')[1];

      if (time === '12:00:00' && !dailyForecastMap.has(date)) {
        dailyForecastMap.set(date, {
          date,
          temperature: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        });
      }
    });

    const forecastList = Array.from(dailyForecastMap.values());
    return forecastList;
  } catch (error) {
    return rejectWithValue('Konum hava durumu verisi alınamadı.');
  }
});

export const fetchCurrentWeather = createAsyncThunk<
  WeatherData,
  { lat: number; lon: number },
  { rejectValue: string }
>('weather/fetchCurrentWeather', async ({ lat, lon }, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    return {
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
  } catch (error) {
    return rejectWithValue('Anlık hava durumu verisi alınamadı.');
  }
});

export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  'weather/fetchWeather',
  async (city, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

      return {
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
    } catch {
      return rejectWithValue('Hava durumu verisi alınamadı.');
    }
  }
);

export const fetchCityInfo = createAsyncThunk<
  CityInfo,
  { city: string; countryCode: string },
  { rejectValue: string }
>('weather/fetchCityInfo', async ({ city, countryCode }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const data = await response.json();

    if (!data || data.status === 404) throw new Error('Şehir bilgisi bulunamadı.');

    return {
      name: data[0].name?.common || 'Bilinmiyor',
      country: data[0].name?.official || 'Bilinmiyor',
      population: data[0].population || 0,
      region: data[0].region || 'Bilinmiyor',
      timezone: data[0].timezones?.[0] || 'Bilinmiyor',
    };
  } catch (error) {
    return rejectWithValue('Şehir bilgisi bulunamadı.');
  }
});

const appSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCityInfo: (state, action) => {
      state.cityInfo = action.payload;
    },
  },
  extraReducers: builder => {
    builder

      .addCase(fetchWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bilinmeyen hata';
      })
      .addCase(fetchCityInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.cityInfo = action.payload;
      })
      .addCase(fetchCityInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bilinmeyen hata';
      })
      .addCase(fetchLocationForecast.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocationForecast = action.payload;
      })
      .addCase(fetchLocationForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bilinmeyen hata';
      })
      .addCase(fetchCurrentWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bilinmeyen hata';
      });
  },
});

export const { setCityInfo } = appSlice.actions;
export default appSlice.reducer;
