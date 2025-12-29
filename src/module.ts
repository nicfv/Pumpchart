import { PanelPlugin, SelectableValue } from '@grafana/data';
import { PumpchartOptions } from './types';
import { PumpchartPanel } from './components/panel';
import { defaultPumpchartOptions } from 'defaults';
import { Pumpchart } from 'psychart';

export const plugin = new PanelPlugin<PumpchartOptions>(PumpchartPanel).setPanelOptions((builder, context) => {
  return builder
    .addSelect({
      path: 'units.flow',
      name: 'Flow',
      description: 'The units of volumetric flow rate measurement.',
      category: ['Measurement Units'],
      defaultValue: defaultPumpchartOptions.units.flow,
      settings: {
        allowCustomValue: false,
        isClearable: false,
        options: Pumpchart.getFlowUnits().map(unit => { return { label: unit, value: unit } as SelectableValue }),
      },
    })
    .addNumberInput({
      path: 'specificGravity',
      name: 'Specific Gravity',
      description: 'The ratio of density of the process fluid in the system to the density of pure water.',
      category: ['System Properties'],
      defaultValue: defaultPumpchartOptions.specificGravity,
      settings: {
        integer: false,
        min: 0.01,
        max: 1000,
        step: 0.01,
        placeholder: 'Specific Gravity',
      },
    })
    .addNumberInput({
      path: 'maxSpeed',
      name: 'Max Speed',
      description: 'The maximum rotational speed of the pump, in the units provided.',
      category: ['System Properties'],
      defaultValue: defaultPumpchartOptions.maxSpeed,
      settings: {
        integer: true,
        min: 1,
        max: 10000,
        step: 1,
        placeholder: 'Max Speed',
      },
    });
});
