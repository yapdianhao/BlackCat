import React, { useState } from 'react';

interface Props {
    children: (
        count: number,
        setCount: React.Dispatch<React.SetStateAction<number>>
    ) => JSX.Element | null;
}

const Counter: React.FC<Props> = ({children}) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count => count + 1);
    }
    
    const handleDecrement = () => {
        setCount(count => count - 1);
    }

    return (
        <div>
            <div>
                Count: {count}
            </div>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
            <button onClick={() => setCount(0)}>reset</button>
        </div>
    )
}

export default Counter;
