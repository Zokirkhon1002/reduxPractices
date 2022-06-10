import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { inc, dec, res, incByAmount, selectCount } from "./counterSlice";
import './counter.css'

const Counter = () => {
  const [incAmount, setIncAmount] = useState(0);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const addValue = Number(incAmount) || 0;

  const resetAll = () => {
    setIncAmount(0);
    dispatch(res());
  };

  return (
    <div className="counterBodyMain">
      <section className="counterBody" style={{fontSize: '2rem'}}>
      <p>{count}</p>
      <div>
        <button className="counterBtn" onClick={() => dispatch(inc())}>+</button>
        <button className="counterBtn"  onClick={() => dispatch(dec())}>-</button>
      </div>
      <input
        className="counterInput"
        type="text"
        value={incAmount}
        onChange={(e) => setIncAmount(e.target.value)}
      />

      <div>
        <button className="counterBtn" onClick={() => dispatch(incByAmount(addValue))}>
          Add Amount
        </button>
        <button className="counterBtn"  onClick={resetAll}>Reset</button>
      </div>
    </section>
    </div>
  );
};

export default Counter;
