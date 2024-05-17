import { createSlice } from "@reduxjs/toolkit"

export interface CounterState {
  isPhishing: boolean,
  url:string
}

const counterSlice = createSlice({
  name: "phishing",
  initialState: { isPhishing: false,checkphishing:false,url:"" },
  reducers: {
    setisPhishingTrue: (state,obj) => {
      state.isPhishing = true
      state.url= obj.payload.url

    },
    setisPhishingFalse: (state) => {
      state.isPhishing =false
      state.url=""

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