

declare module 'react-apexcharts' {
    import { Component } from 'react';
    import { ApexOptions } from 'apexcharts';

    interface ChartProps {
        options: ApexOptions;
        series: ApexOptions['series'];
        type: 'line' | 'area' | 'bar' | 'histogram' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'boxPlot' | 'candlestick' | 'radar' | 'polarArea' | 'rangeBar';
        width?: string | number;
        height?: string | number;
    }

    export default class ReactApexChart extends Component<ChartProps> { }
}
