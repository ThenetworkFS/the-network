import React from 'react'


const Spinner = (props) => {
  let isSizeL = props.size === "L"
  return (
    <div className={isSizeL ? "spinner-container" : "spinner-container small-container"}>
      <div className={isSizeL ? "la-ball-clip-rotate la-dark la-2x" : "la-ball-clip-rotate la-sm la-dark"}>
        <div className={isSizeL ? "" : "small"}></div>
      </div>
    </div>
  )
}


export default Spinner;
