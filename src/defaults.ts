import { SelectableValue } from '@grafana/data';
import { getURL } from 'icon';
import { PumpchartOptions } from 'types';
import { Palette, PaletteName } from 'viridis';

export const defaultPumpchartOptions: PumpchartOptions = {
    colorizeBy: 'time',
    curve: {
        pump: { maxFlow: 200, maxHead: 50 },
        system: { friction: 0.001, static: 10 },
    },
    gradient: 'Viridis',
    speed: {
        max: 60,
        operation: 45,
        steps: [15, 30, 45],
    },
    radius: 3,
    series: { flow: '', head: '', power: '', speed: '' },
    specificGravity: 1,
    units: { flow: 'gpm', head: 'ft', power: 'hp', speed: 'Hz' },
};

export const Gradients: Array<SelectableValue<PaletteName>> = Object.keys(Palette).map(name => { return { label: name, value: name, imgUrl: getURL(name as PaletteName, 10, 2) } as SelectableValue<PaletteName> });
