import React from "react";
import style from './style.module.css'
import { Range } from "react-range";

const ComponentRange = ({values, setValues}) => {
  return <div className={style.text__html__range}>
<Range
      label="Select your value"
      step={0.1}
      min={10}
      max={50}
      values={values}
      onChange={(values) => {
        setValues(values)
      }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            backgroundColor: "#999",
          }}
        />
      )}
    />
  </div>
}

export default ComponentRange