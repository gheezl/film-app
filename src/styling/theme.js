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
    },
    error: {
        100: "#401818",
        200: "#632626",
        300: "#854343",
        400: "#a76868",
        500: "#c78f8f",
        600: "#eab6b6"
    }
}

const lightMode = {
    surface: {
        100: "#ffffff",
        200: "#f0f0f0",
        300: "#e0e0e0",
        400: "#d0d0d0",
        500: "#c0c0c0",
        600: "#b0b0b0"
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
        100: "#f4f5f5",
        200: "#e9eaea",
        300: "#dedfe0",
        400: "#d3d4d5",
        500: "#c8c9ca",
        600: "#bdbfbe"
    },
    error: {
        100: "#ffcccc",
        200: "#ffa6a6",
        300: "#ff7f7f",
        400: "#ff5959",
        500: "#ff3333",
        600: "#ff0d0d"
    }
};

const setThemeSettings = (mode) => {
    let themeSettings;

    if (mode === "dark") {
        themeSettings = {
            palette: {
                primary: {
                    main: darkMode.primary[100],
                    secondary: darkMode.primary[200],
                    third: darkMode.primary[300]
                },
                secondary: {
                    main: darkMode.mixed[100],
                    secondary: darkMode.mixed[200]
                },
                background: {
                    default: darkMode.surface[100],
                    secondary: darkMode.surface[200]
                },
                error: {
                    main: darkMode.error[100],
                    secondary: darkMode.error[200],
                    third: darkMode.error[300],
                    fourth: darkMode.error[400],
                    fifth: darkMode.error[500],
                    final: darkMode.error[600]
                }
            },
            typography: {
                allVariants: {
                    fontFamily: "'Nunito', sans-serif",
                    color: "#FFFFFF"
                },
                fontSize: 12,
                h1: {
                    fontSize: 40,
                },
                h2: {
                    fontSize: 32,
                },
                h3: {
                    fontSize: 24,
                },
                h4: {
                    fontSize: 20,
                },
                h5: {
                    fontSize: 16,
                },
                h6: {
                    fontSize: 14,
                },
            },
            shadows: ['none', `0 4px 8px ${darkMode.primary[300]}`],
        }
    }
    else if (mode === "light") {
        themeSettings = {
            palette: {
                primary: {
                    main: lightMode.primary[100],
                    secondary: lightMode.primary[200],
                    third: lightMode.primary[300]
                },
                secondary: {
                    main: lightMode.mixed[100],
                    secondary: lightMode.mixed[200]
                },
                background: {
                    default: lightMode.surface[100],
                    secondary: lightMode.surface[200]
                },
                error: {
                    main: lightMode.error[100],
                    secondary: lightMode.error[200],
                    third: lightMode.error[300],
                    fourth: lightMode.error[400],
                    fifth: lightMode.error[500],
                    final: lightMode.error[600]
                }
            },
            typography: {
                allVariants: {
                    fontFamily: "'Nunito', sans-serif",
                    color: "#FFFFFF"
                },
                fontSize: 12,
                h1: {
                    fontSize: 40,
                },
                h2: {
                    fontSize: 32,
                },
                h3: {
                    fontSize: 24,
                },
                h4: {
                    fontSize: 20,
                },
                h5: {
                    fontSize: 16,
                },
                h6: {
                    fontSize: 14,
                },
            },
            shadows: ['none', `0 4px 8px ${lightMode.primary[300]}`],
        };
    }


    return themeSettings;
}


export const toggleMode = (selectedMode) => {
    const updatedThemeSettings = setThemeSettings(selectedMode);
    return updatedThemeSettings;
}