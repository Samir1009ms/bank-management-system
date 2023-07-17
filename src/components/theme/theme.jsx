import { useEffect, useState } from "react";
import DayNightToggle from 'react-day-and-night-toggle'
import { useDispatch } from "react-redux";
import { theme } from "../../store/expense/theme-slice";

export function Theme() {

    const [themes, setThemes] = useState('light')
    const dispatch = useDispatch()

    useEffect(() => {
        let themes = localStorage.getItem("theme");
        dispatch(theme(themes))
        if (themes === "dark") {
            document.body.classList.add("dark");
            setThemes("dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light")
            setThemes("light");
        }
    }, [])

    function changeTheme() {
        let themes = localStorage.getItem("theme")
        if (themes === "light") {
            localStorage.setItem("theme", "dark")
            document.body.classList.add("dark")
            dispatch(theme("dark"))
            setThemes("dark")
        } else {
            localStorage.setItem("theme", "light")
            document.body.classList.remove("dark")
            setThemes("light")
            dispatch(theme("light"))
        }
    }

    return (
        <div className={`flex align-items-center `}>
            {/* <button
            // onClick={changeTheme}
            // data-theme={theme}
            >
                s
                {theme === "light" ? "🌚" : "☀️"}
            </button> */}
            <DayNightToggle
                // onChange={() => setIsDarkMode(!isDarkMode)}
                checked={themes === "dark" ? true : false}
                onClick={changeTheme}
                size={30}

            />
            {/* <span>{theme === "dark" ? "Light Mod" : "Dark Mod"}</span> */}
        </div>
    )
}