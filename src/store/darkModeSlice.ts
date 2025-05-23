import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface DarkModeState {
  isDarkMode: boolean
}

const initialState: DarkModeState = {
  isDarkMode: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload
    },
  },
})

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer 