import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
  isPhishing: boolean,
  checkphishing:boolean 
}

const counterSlice = createSlice({
  name: "phishing",
  initialState: { isPhishing: false,checkphishing:false },
  reducers: {
    setisPhishingTrue: (state) => {
      state.isPhishing = true

    },
    setisPhishingFalse: (state) => {
      state.isPhishing =false

    },
    setCheckPhishing: (state) => {
      state.checkphishing=true
    },
    removeCheckPhishing: (state) => {
      state.checkphishing=true
    }

  }
})

export const { setisPhishingTrue, setisPhishingFalse,setCheckPhishing,removeCheckPhishing } = counterSlice.actions

export default counterSlice.reducer