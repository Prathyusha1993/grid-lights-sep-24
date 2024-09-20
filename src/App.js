import { isDisabled } from '@testing-library/user-event/dist/utils';
import './App.css';
import React, { useState } from 'react';

const Cell = ({ filled, onClick, isDisabled, label }) => {
  return <button aria-label={label}  disabled={isDisabled} type='button' onClick={onClick} className={filled ? 'cell cell-activated' : 'cell'} />
};

const App = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ];

  const deactivateCells = () => {
    setIsDeactivated(true)
    const interval = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(interval)
          setIsDeactivated(false)
        }
        return newOrder;
      })
    }, 300);
  };

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);
    console.log(newOrder);

    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  return (
    <div className='wrapper'>
      <h1>Grid Lights</h1>
      <div className='grid' style={{ gridTemplateColumns: `repeat(${config[0].length}, 1fr)` }}>
        {config.flat(1).map((value, index) => (
          value ? (<Cell key={index}
            filled={order.includes(index)}
            label={`Cell ${index}`}
            onClick={() => activateCells(index)}
            isDisabled={order.includes(index) || isDeactivated}
          />) : <span />
        ))}
      </div>
    </div>
  );
}

export default App;
