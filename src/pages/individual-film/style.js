
const styles = {
    pageBorder: {
        display: "flex",
        flexDirection: "column"
    },
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
    headerRunTime: (color) => ({
        marginTop: "10px",
        color: color
    }),
    desciptionBorder: {
        height: '250px',
        overflowY: 'scroll',
        flex: '1',
    },
    descriptionHeaderSpacing: {
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
    }
}

export default styles;