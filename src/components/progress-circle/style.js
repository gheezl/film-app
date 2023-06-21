const style = {
    progressCircleBorder: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    progressCircle: (primary, secondary, background, angle, size) => ({
        background: `radial-gradient(${background} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${secondary} ${angle}deg 360deg),
                ${primary}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
    }),
    votesBorder: (size) => ({
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    })
}

export default style;