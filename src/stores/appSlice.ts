import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.OPENWEATHER_API_KEY;

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  timestamp: number;
}

interface CityInfo {
  name: string;
  population: number;
  region: string;
}

interface AppState {
  weatherList: WeatherData[]; // Şehir listesi
  searchResult: WeatherData | null; // Arama sonucu
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

// **Birden fazla şehir için hava durumu çek**
const defaultCities = ["Istanbul", "Ankara", "Izmir", "London", "New York"];
export const fetchWeatherList = createAsyncThunk(
  "weather/fetchWeatherList",
  async (_, { rejectWithValue }) => {
    try {
      const promises = defaultCities.map(async (city) => {
        const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        return {
          city: response.data.name,
          temperature: response.data.main.temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon || "01d",
          timestamp: response.data.dt, 
        };
      });

      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      return rejectWithValue("Şehir listesi yüklenirken hata oluştu.");
    }
  }
);

// **Tek bir şehir için hava durumu çek (Arama işlemi)**
export const fetchWeather = createAsyncThunk<WeatherData, string, { rejectValue: string }>(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      if (city.length < 3) {
        return rejectWithValue("Lütfen en az 3 harf giriniz.");
      }

      const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);

      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        timestamp: response.data.dt,
      };
    } catch (error) {
      return rejectWithValue("Şehir bulunamadı. Lütfen tam şehir adı giriniz.");
    }
  }
);
const appSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCityInfo: (state, action: { payload: CityInfo }) => {
      state.cityInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // **Şehir listesi için case’ler**
      .addCase(fetchWeatherList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherList.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherList = action.payload;
      })
      .addCase(fetchWeatherList.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Bilinmeyen hata";
      })

      // **Tek şehir araması için case’ler (Eksik Olan Kısım Eklendi!)**
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResult = action.payload; // 👈 Redux Store’a veriyi yazdık!
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bilinmeyen hata";
      });
  },
});

export const { setCityInfo } = appSlice.actions;
export default appSlice.reducer;