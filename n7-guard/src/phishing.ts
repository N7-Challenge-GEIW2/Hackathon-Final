import { createSlice, isPending } from "@reduxjs/toolkit"

export interface CounterState {
isPhishing: boolean
}

const phishingSlice = createSlice({
  name: "phishing",
  initialState: { isPhishing: false },
  reducers: {
    setPhishing: (state) => {
      state.isPhishing = true
    },

  }
})

export const { setPhishing } = phishingSlice.actions

export default phishingSlice.reducer