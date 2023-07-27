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
                id: "Postive",
                label: "Postive",
                value: progress.toFixed(1),
            },
            {
                id: "Negative",
                label: "Negative",
                value: (10 - progress).toFixed(1),
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
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
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
                arcLinkLabelsTextColor={theme.palette.primary.second}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                colors={[theme.palette.primary.second, theme.palette.error.third]}
                animate={false}
                tooltip={bar => (
                    <Paper
                        sx={style.toolTipBorder}
                    >
                        <Typography>{`${bar.value}`}</Typography>
                    </Paper>
                )}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'row',
            //         justify: false,
            //         translateX: 0,
            //         translateY: 56,
            //         itemsSpacing: 0,
            //         itemWidth: 100,
            //         itemHeight: 18,
            //         itemTextColor: theme.palette.primary.second,
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 18,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
            />
        </Box>
    )
}

export default ProgressCircle;