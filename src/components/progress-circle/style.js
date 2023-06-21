const style = {
    progressCircleBorder: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    progressCircleCompleted: (colorPrimary, colorSecondary, backgroundColor, angle, size) => ({
        background: `radial-gradient(${backgroundColor} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${colorSecondary} ${angle}deg 360deg),
                ${colorPrimary}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
    })
}

export default style;