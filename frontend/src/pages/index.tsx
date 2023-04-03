import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Login } from "../../machines/login";
import { SetStateAction, useState } from "react";
import { useMachine } from "@xstate/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, send] = useMachine(Login);

    const handleEmailChange = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        send({ type: "StartAuthentication", email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="password"
            />
            <button type="submit">Submit</button>
        </form>
    );
}
