import { useEffect, useState } from "react";
export function Theme() {

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
            <button
                onClick={changeTheme}
                data-theme={theme}
            >
                s
                {theme === "light" ? "🌚" : "☀️"}
            </button>
        </>
    )
}