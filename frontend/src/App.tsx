import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {

    const [welcomeMessage, setWelcomeMessage] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [me, setMe] = useState<string>();

    const fetchMe = () => {
        axios.get("api/users/me")
            .then(response => response.data)
            .then(setMe)
    }

    useEffect(
        fetchMe,
        []
    )

    const login = () => {
        axios.get("api/users/login", {auth: {username, password: password}})
            .then(response => response.data)
            .then(setMe)
    }

    const logout = () => {
        axios.get("api/users/logout")
            .then(response => response.data)
            .then(() => setMe("anonymousUser"))
    }

    const fetchWelcomeMessage = () => {
        axios.get("api/hello")
            .then(response => response.data)
            .then(setWelcomeMessage)
    };

    return <>
        {
            !me
                ? "Lade..."
                :
                    me === 'anonymousUser'
                        ? <>
                            <input onChange={ev => setUsername(ev.target.value)}/>
                            <input onChange={ev => setPassword(ev.target.value)}/>
                            <button onClick={login}>Login!</button>
                        </>
                        : <>
                            Angemeldet als {me}
                            <button onClick={logout}>Logout!</button>
                        </>

        }
        <>
            {welcomeMessage}
            <button onClick={fetchWelcomeMessage}>Fetch Message!</button>
        </>
    </>
        ;
}

export default App;
