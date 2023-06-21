const style = {
    displayBorder: (isBelowMd) => ({
        padding: isBelowMd ? "0px 0px 20px 0px" : "20px",
        margin: isBelowMd ? "0px -20px 0px -20px" : "0px"
    }),
    headlineBorder: {
        display: "flex",
        justifyContent: "center",
        margin: "-15px 0px 10px 0px",
    },
    mobileScrollBorder: {
        display: "flex",
        overflowX: "scroll",
        height: "380px",
        borderRadius: "20px",
        padding: "0px 10px 0px 10px"
    },
    desktopScrollBorder: (color) => ({
        height: "380px",
        borderLeft: `1px solid ${color}`,
        borderRight: `1px solid ${color}`,
        borderRadius: "20px",
        padding: "0px 10px 0px 10px"
    })
}

export default style;