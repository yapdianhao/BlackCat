import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';

import Counter from "../components/Counter";

const App = () => {
    return (
        <div>
            <Counter>
                {(count, setCount) => (
                <div>
                    {count}
                    <button onClick={() =>setCount(count + 1)}>
                        click me
                    </button>
                </div>)}
            </Counter>
        </div>
    );
}

export default App;