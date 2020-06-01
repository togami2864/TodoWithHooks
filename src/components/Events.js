import React, { useContext } from "react";

import Event from "./Event";
import AppContext from "../contexts/AppContext";

import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "../style.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import shortid from "shortid";

const Events = () => {
  const { state } = useContext(AppContext);

  const progress =
    state.events.length > 0
      ? ((state.events[0].count / state.events.length) * 100).toFixed(1)
      : 0;
  return (
    <div className="container-lg">
      <div className="row">
        <div className="col">
          <h4>イベント一覧</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {state.events.map((event, index) => {
                return <Event event={event} key={index} />;
              })}
            </tbody>
          </table>
        </div>
        <div className="col">
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={`${progress}`}
            duration={2.0}
            easingFunction={easeQuadInOut}
          >
            {(value) => {
              const roundedValue = Math.round(value);
              return (
                <>
                  <h1>Progress</h1>
                  <CircularProgressbar
                    value={value}
                    text={`${progress}%`}
                    styles={buildStyles({ pathTransition: "none" })}
                  />
                </>
              );
            }}
          </AnimatedProgressProvider>
        </div>
      </div>
    </div>
  );
};

export default Events;
