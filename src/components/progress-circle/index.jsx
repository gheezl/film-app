import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

import style from "./style";

const ProgressCircle = ({ progress, votes }) => {
    const theme = useTheme();
    const angle = (progress * 0.1) * 360;
    const data = [
        {
            id: "liked",
            label: "Liked",
            value: "150",
            color: theme.palette.primary.second,
        },
        {
            id: "disliked",
            label: "Disliked",
            value: "175",
            color: theme.palette.primary.second,
        },
    ]

    return (
        <Box sx={style.progressCircleBorder}>
            <Box sx={style.progressCircle(theme.palette.primary.main, theme.palette.secondary.main, theme.palette.background.main, angle)}>
                <Box sx={style.votesBorder}>
                    {
                        votes
                            ?
                            <>
                                <Typography
                                    variant="h2"
                                >
                                    {progress % 1 === 0 ? progress : progress.toFixed(1)} / 10
                                </Typography>
                                <Typography
                                    variant="h5"
                                >
                                    {votes.toLocaleString()} reviews
                                </Typography>
                            </>
                            :
                            <Typography
                                variant="h3"
                            >
                                No reviews
                            </Typography>
                    }
                </Box>
            </Box>
        </Box>
        // <ResponsivePie
        //     data={data}
        //     margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        //     innerRadius={0.5}
        //     padAngle={0.7}
        //     cornerRadius={3}
        //     activeOuterRadiusOffset={8}
        //     borderWidth={1}
        //     borderColor={{
        //         from: 'color',
        //         modifiers: [
        //             [
        //                 'darker',
        //                 0.2
        //             ]
        //         ]
        //     }}
        //     arcLinkLabelsSkipAngle={10}
        //     arcLinkLabelsTextColor="#333333"
        //     arcLinkLabelsThickness={2}
        //     arcLinkLabelsColor={{ from: 'color' }}
        //     arcLabelsSkipAngle={10}
        //     arcLabelsTextColor={{
        //         from: 'color',
        //         modifiers: [
        //             [
        //                 'darker',
        //                 2
        //             ]
        //         ]
        //     }}
        //     defs={[
        //         {
        //             id: 'dots',
        //             type: 'patternDots',
        //             background: 'inherit',
        //             color: theme.palette.primary.second,
        //             size: 4,
        //             padding: 1,
        //             stagger: true
        //         },
        //         {
        //             id: 'lines',
        //             type: 'patternLines',
        //             background: 'inherit',
        //             color: 'rgba(255, 255, 255, 0.3)',
        //             rotation: -45,
        //             lineWidth: 6,
        //             spacing: 10
        //         }
        //     ]}
        //     fill={[
        //         {
        //             match: {
        //                 id: "liked"
        //             },
        //             // id: "lines"
        //         },
        //         {
        //             match: {
        //                 id: "disliked"
        //             },
        //             // id: "lines"
        //         }
        //     ]}
        //     legends={[
        //         {
        //             anchor: 'bottom',
        //             direction: 'row',
        //             justify: false,
        //             translateX: 0,
        //             translateY: 56,
        //             itemsSpacing: 0,
        //             itemWidth: 100,
        //             itemHeight: 18,
        //             itemTextColor: theme.palette.primary.second,
        //             itemDirection: 'left-to-right',
        //             itemOpacity: 1,
        //             symbolSize: 18,
        //             symbolShape: 'circle',
        //             effects: [
        //                 {
        //                     on: 'hover',
        //                     style: {
        //                         itemTextColor: '#000'
        //                     }
        //                 }
        //             ]
        //         }
        //     ]}
        // />
    )
}

export default ProgressCircle;