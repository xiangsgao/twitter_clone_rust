import {Button} from "antd";
import {useState} from "react";
import {APP_URL} from "../../utils/constants.ts";


export const Home = () =>{
    const [count, setCount] = useState(0)
    return (
        <>
            <h1>{APP_URL}</h1>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={'/vite.svg'} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={"/assets/react.svg"} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React + Antd</h1>
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count} from antd button
                </Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}