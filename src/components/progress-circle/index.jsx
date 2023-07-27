import { Box, Paper, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

import style from "./style";
import { useEffect, useState } from "react";

const ProgressCircle = ({ progress, votes }) => {
    const [data, setData] = useState([
        {
            id: "Postive",
            label: "Postive",
        },
        {
            id: "Negative",
            label: "Negative",
        },
    ])

    const theme = useTheme();
    // const angle = (progress * 0.1) * 360;

    useEffect(() => {
        setData([
            {
                id: `${(progress * 10).toFixed(0)} %`,
                label: "Postive",
                value: (progress * 10).toFixed(0),
            },
            {
                id: `${(100 - progress * 10).toFixed(0)} %`,
                label: "Negative",
                value: (100 - progress * 10).toFixed(0),
            },
        ])

    }, [progress, votes])

    return (
        // <Box sx={style.progressCircleBorder}>
        //     <Box sx={style.progressCircle(theme.palette.primary.main, theme.palette.secondary.main, theme.palette.background.main, angle)}>
        //         <Box sx={style.votesBorder}>
        //             {
        //                 votes
        //                     ?
        //                     <>
        //                         <Typography
        //                             variant="h2"
        //                         >
        //                             {progress % 1 === 0 ? progress : progress.toFixed(1)} / 10
        //                         </Typography>
        //                         <Typography
        //                             variant="h5"
        //                         >
        //                             {votes.toLocaleString()} reviews
        //                         </Typography>
        //                     </>
        //                     :
        //                     <Typography
        //                         variant="h3"
        //                     >
        //                         No reviews
        //                     </Typography>
        //             }
        //         </Box>
        //     </Box>
        // </Box>
        <Box sx={style.progressCircleBorder}>
            <Box
                sx={{
                    width: "100%",
                    justifyContent: "start"
                }}
            >
                <Typography
                    variant="h2"
                >
                    {votes.toLocaleString()} reviews
                </Typography>
            </Box>
            <ResponsivePie
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.primary.second,
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.primary.second,
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.primary.second,
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.primary.second,
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.primary.second,
                        },
                    },
                }}
                margin={{ top: 15, right: 80, bottom: 45, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                enableArcLabels={false}
                arcLinkLabelsTextColor={"white"}
                arcLinkLabelsThickness={5}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabel={bar => (
                    <Typography variant="h1" >{bar.value}</Typography>
                )}
                colors={[theme.palette.primary.second, theme.palette.error.third]}
                animate={false}
                tooltip={bar => (
                    <Paper
                        sx={style.toolTipBorder}
                    >
                        <Typography>{`${bar.value}`}</Typography>
                    </Paper>
                )}
            />
            <style>
                {`.nivo_pie__label text {
                        font-size: 150px;
                        fill: white;
                    }`}
            </style>
        </Box>
    )
}

export default ProgressCircle;