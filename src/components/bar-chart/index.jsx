import { Typography, useTheme, Paper } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data }) => {
    const theme = useTheme();

    return (
        <ResponsiveBar
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.background.second,
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
                        fill: theme.palette.background.second,
                    },
                },
            }}
            keys={["type"]}
            indexBy="category"
            margin={{ bottom: 50, top: 50 }}
            // padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={(bar) => bar.data.typeColor}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "#38bcb2",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "#eed312",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            tooltip={bar => (
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.second,
                        padding: "8px",
                        borderRadius: "5px",
                    }}
                >
                    <Typography>{`${bar.data.category}: $${bar.value.toLocaleString()}`}</Typography>
                </Paper>
            )}
            borderColor={{
                from: "color",
                modifiers: [["darker", "1.6"]],
            }}
            axisTop={null}
            axisRight={null}
            enableLabel={true}
            label={bar => `$${bar.value.toLocaleString()}`}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            barAriaLabel={function (e) {
                return e.category
            }}
        />
    )
}

export default BarChart;