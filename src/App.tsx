import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createStore, StoreApi, useStore } from "zustand";
import { useMemo, useState } from "react";

interface DemoStore {
    data: string;
    setData: (newData: string) => void;
}

interface CountStore {
    count: number;
    increaseCount: () => void;
    decreaseCount: () => void;
    resetCount: () => void;
}

interface State {
    demoStore: StoreApi<DemoStore>;
    countStore: StoreApi<CountStore>;
}

const useStateStore = createStore<State>(() => ({
    demoStore: createStore<DemoStore>((set) => ({
        data: "demo",
        setData: (newData: string) => set({ data: newData }),
    })),

    countStore: createStore<CountStore>((set) => ({
        count: 0,
        increaseCount: () => set((state) => ({ count: state.count + 1 })),
        decreaseCount: () => set((state) => ({ count: state.count - 1 })),
        resetCount: () => set({ count: 0 }),
    })),
}));

function Counter() {
    const countStore = useStore(useStateStore, (state) => state.countStore);

    const count = useStore(countStore, (state) => state.count);
    const increase = useStore(countStore, (state) => state.increaseCount);
    const decrease = useStore(countStore, (state) => state.decreaseCount);
    const reset = useStore(countStore, (state) => state.resetCount);

    const countTypography = useMemo(() => <p>{count}</p>, [count]);

    return (
        <div className="card">
            <button onClick={increase}>Count Up</button>
            <button onClick={decrease}>Count down</button>
            <button onClick={reset}>Reset</button>

            {countTypography}
        </div>
    );
}

function DemoData() {
    const [string, setString] = useState<string>("");
    const demoStore = useStore(useStateStore, (state) => state.demoStore);

    const data = useStore(demoStore, (state) => state.data);
    const setData = useStore(demoStore, (state) => state.setData);

    return (
        <div className="card">
            <input value={string} onChange={(e) => setString(e.target.value)} />
            <button
                onClick={() => {
                    setString("");
                    setData(string);
                }}
            >
                更新
            </button>

            <p>{data}</p>
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

            <Counter />

            <DemoData />
        </>
    );
}

export default App;
