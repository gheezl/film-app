const styles = {
    loaderBorder: (color) => ({
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: color ? color : "#121212"
        backgroundColor: "background.main" ? "background.main" : "#121212"
    })
}

export default styles;