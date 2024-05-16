import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
  isPhishing: boolean
}

const counterSlice = createSlice({
  name: "phishing",
  initialState: { isPhishing: false },
  reducers: {
    setisPhishingTrue: (state) => {
      state.isPhishing = true
    },
    setisPhishingFalse: (state) => {
      state.isPhishing =false
    }
  }
})

export const { setisPhishingTrue, setisPhishingFalse } = counterSlice.actions

export default counterSlice.reducer