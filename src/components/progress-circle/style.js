const style = {
    progressCircleBorder: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px"
    },
    progressCircle: (primary, secondary, background, angle, size) => ({
        background: `radial-gradient(${background} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${secondary} ${angle}deg 360deg),
                ${primary}`,
        width: `200px`,
        height: `200px`,
        borderRadius: "50%"
    }),
    votesBorder: {
        width: `200px`,
        height: `200px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
}

export default style;