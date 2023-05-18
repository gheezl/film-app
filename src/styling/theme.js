import { createTheme } from "@mui/material"

const darkMode = {
    surface: {
        100: "#121212",
        200: "#282828",
        300: "#3f3f3f",
        400: "#575757",
        500: "#717171",
        600: "#8b8b8b"
    },
    primary: {
        100: "#00bcd4",
        200: "#47c4d9",
        300: "#67cbde",
        400: "#81d3e2",
        500: "#99dae7",
        600: "#afe2ec"
    },
    mixed: {
        100: "#192122",
        200: "#2e3637",
        300: "#454c4c",
        400: "#5d6363",
        500: "#767b7b",
        600: "#8f9494"
    }
}

// TODO fill out our light mode colors, will do after most development with dark mode is finished
// const lightMode = {
//     surface: {

//     },
//     primary: {

//     },
//     mixed: {

//     }
// }

const themeSettings = {
    palette: {
        primary: {
            main: darkMode.primary[100],
            secondary: darkMode.primary[200]
        },
        secondary: {
            main: darkMode.mixed[100],
            secondary: darkMode.mixed[200]
        },
        background: {
            default: darkMode.surface[100],
            secondary: darkMode.surface[200]
        }
    },
    typography: {
        allVariants: {
            color: "#FFFFFF"
        },
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 40,
        },
        h2: {
            // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 32,
        },
        h3: {
            // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 24,
        },
        h4: {
            // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 20,
        },
        h5: {
            // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 16,
        },
        h6: {
            // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 14,
        },
    },
}

const theme = createTheme(themeSettings);

export default theme;