import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createStore } from "zustand";

type State = {
    count: number;
    increaseCount: () => void;
    resetCount: () => void;
    decreaseCount: () => void;
};
const useCountStore = createStore<State>((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
    resetCount: () => set({ count: 0 }),
}));

function CounterDisplay() {
    const count = useCountStore.getState().count;
    return <p>{count}</p>;
}

function Counter() {
    const increase = useCountStore.getState().increaseCount;
    const decrease = useCountStore.getState().decreaseCount;
    const reset = useCountStore.getState().resetCount;

    useCountStore.subscribe(({ count }) => {
        console.log(count);
    });

    return (
        <div className="card">
            <button onClick={increase}>Count Up</button>
            <button onClick={decrease}>Count down</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
}

function App() {
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>

                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React</h1>

            <CounterDisplay />

            <Counter />
        </>
    );
}

export default App;
