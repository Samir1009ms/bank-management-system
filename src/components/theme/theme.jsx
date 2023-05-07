import { useEffect, useState } from "react";

import DayNightToggle from 'react-day-and-night-toggle'

export function Theme() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const [theme, setTheme] = useState('light')

    useEffect(() => {
        let theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.body.classList.add("dark");
            setTheme("dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light")
            setTheme("light");
        }
    }, [])

    function changeTheme() {
        let theme = localStorage.getItem("theme")
        if (theme === "light") {
            localStorage.setItem("theme", "dark")
            document.body.classList.add("dark")
            setTheme("dark")
        } else {
            localStorage.setItem("theme", "light")
            document.body.classList.remove("dark")
            setTheme("light")
        }

    }
    return (
        <>
            {/* <button
            // onClick={changeTheme}
            // data-theme={theme}
            >
                s
                {theme === "light" ? "🌚" : "☀️"}
            </button> */}
            <DayNightToggle
                // onChange={() => setIsDarkMode(!isDarkMode)}
                checked={theme === "dark" ? true : false}
                onClick={changeTheme}

            />

        </>
    )
}