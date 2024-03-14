import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { create } from "zustand";

type State = {
    count: number;
    increaseCount: () => void;
    resetCount: () => void;
    decreaseCount: () => void;
};
const useCountStore = create<State>((set) => ({
    count: 0,
    increaseCount: () => set((state) => ({ count: state.count + 1 })),
    resetCount: () => set({ count: 0 }),
    decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));

function App() {
    const { count, increaseCount, decreaseCount, resetCount } = useCountStore();

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

            <p>{count}</p>

            <div className="card">
                <button onClick={increaseCount}>Count Up</button>
                <button onClick={decreaseCount}>Count down</button>
                <button onClick={resetCount}>Reset</button>
            </div>
        </>
    );
}

export default App;
