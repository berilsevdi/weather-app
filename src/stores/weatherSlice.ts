import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  city: string;
  temperature: string;
  condition: string;
}

const initialState: WeatherState = {
  city: "",
  temperature: "",
  condition: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherState>) => {
      state.city = action.payload.city;
      state.temperature = action.payload.temperature;
      state.condition = action.payload.condition;
    },
  },
});

export const { setWeather } = weatherSlice.actions;
export default weatherSlice.reducer;