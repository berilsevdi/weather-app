import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.OPENWEATHER_API_KEY;

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
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  weatherList: [],
  searchResult: null,
  cityInfo: null,
  loading: false,
  error: null,
};

const defaultCities = ['Istanbul', 'Ankara', 'Izmir', 'London', 'New York'];

export const fetchWeatherList = createAsyncThunk(
  'weather/fetchWeatherList',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📡 API çağrısı yapılıyor...');

      const results = await Promise.all(
        defaultCities.map(async city => {
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
        })
      );
      //console.log(" API’den gelen veri:", results);
      return results;
    } catch (error) {
      //console.error("API Hatası:", error);
      return rejectWithValue('Şehir listesi yüklenirken hata oluştu.');
    }
  }
);

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
    console.log(
      '🌍 REST Countries API İsteği Yapılıyor:',
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );

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
    console.error('Şehir Bilgisi API Hatası:', error);
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
      .addCase(fetchWeatherList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherList.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherList = action.payload;
      })
      .addCase(fetchWeatherList.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Bilinmeyen hata';
      })
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
      });
  },
});

export const { setCityInfo } = appSlice.actions;
export default appSlice.reducer;
