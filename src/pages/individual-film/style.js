
const styles = {
    pageBorder: {
        display: "flex",
        flexDirection: "column"
    },
    animationDiv: (isBelowLg) => ({
        display: "flex",
        flexDirection: isBelowLg ? "column" : "row",
        padding: '20px',
        marginBottom: '20px',
    }),
    imageBorder: (isBelowLg) => ({
        marginBottom: "20px",
        marginRight: isBelowLg ? "0px" : "25px"
    }),
    imageCard: {
        width: "fit-content",
        height: "fit-content",
        mx: "auto"
    },
    image: (isBelowSm) => ({
        width: isBelowSm ? "100%" : "450px",
        borderRadius: '25px'
    }),
    headerBorder: (isBelowLg) => ({
        display: 'flex',
        flexDirection: isBelowLg ? "column" : "row",
        gap: "10px",
        justifyContent: 'space-between',
    }),
    headerContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    headerRunTime: {
        marginTop: "10px",
        color: "primary.third"
    },
    desciptionBorder: {
        height: '250px',
        overflowY: 'scroll',
        flex: '1',
    },
    descriptionHeader: {
        marginBottom: "10px"
    },
    ratingBorder: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '250px'
    },
    playButtonBorder: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '250px'
    },
    playButton: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '25px',
    },
    playIcon: {
        fontSize: '150px'
    },
    detailsBorder: {
        height: '250px',
        overflowY: 'scroll',
    },
    financialPerformanceBorder: {
        height: "250px"
    },
    chartBorder: {
        display: 'flex', flexDirection: 'column', height: '100%'
    },
    chartHeader: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    }
}

export default styles;