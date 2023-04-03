import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { MyComponent, defineCustomElements } from "react-library";

const inter = Inter({ subsets: ["latin"] });
defineCustomElements();

export default function Home() {
    return (
        <>
            <div className="App">
                <MyComponent first="Wan " last="Muhammad Fakhruddin" />
            </div>
        </>
    );
}
