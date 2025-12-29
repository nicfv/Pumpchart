import { PumpchartOptions } from 'types';

export const defaultPumpchartOptions: PumpchartOptions = {
    colorizeBy: 'time',
    curve: {
        pump: { maxFlow: 100, maxHead: 100 },
        system: { friction: 0.001, static: 10 },
    },
    gradient: 'Viridis',
    maxSpeed: 60,
    radius: 3,
    specificGravity: 1,
    units: { flow: 'gpm', head: 'ft', power: 'hp', speed: 'Hz' },
};
