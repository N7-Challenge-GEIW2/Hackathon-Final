import { CountButton } from "~features/count-button"
import React from "react"
import "~style.css"
async function IndexPopup() {

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <CountButton />
    </div>
  )
}

export default IndexPopup
