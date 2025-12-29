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
    .addSelect({
      path: 'units.head',
      name: 'Head',
      description: 'The units of head gain or pressure measurement.',
      category: ['Measurement Units'],
      defaultValue: defaultPumpchartOptions.units.head,
      settings: {
        allowCustomValue: false,
        isClearable: false,
        options: Pumpchart.getHeadUnits().map(unit => { return { label: unit, value: unit } as SelectableValue }),
      },
    })
    .addSelect({
      path: 'units.power',
      name: 'Power',
      description: 'The units for pump input power.',
      category: ['Measurement Units'],
      defaultValue: defaultPumpchartOptions.units.power,
      settings: {
        allowCustomValue: false,
        isClearable: false,
        options: Pumpchart.getPowerUnits().map(unit => { return { label: unit, value: unit } as SelectableValue }),
      },
    })
    .addSelect({
      path: 'units.speed',
      name: 'Speed',
      description: 'The units for rotational pump speed.',
      category: ['Measurement Units'],
      defaultValue: defaultPumpchartOptions.units.speed,
      settings: {
        allowCustomValue: false,
        isClearable: false,
        options: Pumpchart.getSpeedUnits().map(unit => { return { label: unit, value: unit } as SelectableValue }),
      },
    })
    .addNumberInput({
      path: 'specificGravity',
      name: 'Specific Gravity',
      description: 'The ratio of density of the process fluid in the system to the density of pure water.',
      category: ['Fluid Properties'],
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
      category: ['Pump Parameters'],
      defaultValue: defaultPumpchartOptions.maxSpeed,
      settings: {
        integer: true,
        min: 1,
        max: 10000,
        step: 1,
        placeholder: 'Max Speed',
      },
    })
    .addNumberInput({
      path: 'curve.pump.maxFlow',
      name: 'Max Flow',
      description: 'The theoretical maximum pump flow rate, with zero friction or head loss.',
      category: ['Pump Parameters'],
      defaultValue: defaultPumpchartOptions.curve.pump.maxFlow,
      settings: {
        integer: false,
        min: 1,
        max: 1e6,
        step: 0.1,
        placeholder: 'Max Flow',
      },
    })
    .addNumberInput({
      path: 'maxHead',
      name: 'Max Head',
      description: 'The theoretical maximum pressure the pump can add to the fluid, known as the shut-off head.',
      category: ['Pump Parameters'],
      defaultValue: defaultPumpchartOptions.curve.pump.maxHead,
      settings: {
        integer: false,
        min: 1,
        max: 1e6,
        step: 0.1,
        placeholder: 'Max Head',
      },
    })
    .addNumberInput({
      path: 'curve.system.static',
      name: 'Static',
      description: 'The static head loss in the system, which is defined by the elevation difference between the inlet and outlet of the system, and is theoretically zero for closed systems.',
      category: ['System Parameters'],
      defaultValue: defaultPumpchartOptions.curve.system.static,
      settings: {
        integer: false,
        min: 0,
        max: 1e6,
        step: 0.1,
        placeholder: 'Static',
      },
    })
    .addNumberInput({
      path: 'curve.system.friction',
      name: 'Friction',
      description: 'The coefficient of friction in the system, which scales head loss quadratically with flow rate.',
      category: ['System Parameters'],
      defaultValue: defaultPumpchartOptions.curve.system.friction,
      settings: {
        integer: false,
        min: 0,
        max: 1e6,
        step: 0.0001,
        placeholder: 'Static',
      },
    })
    .addSelect({
      path: 'gradient',
      name: 'Gradient',
      description: 'The gradient used for colorizing this data series.',
      category: ['Display Options'],
      defaultValue: defaultPumpchartOptions.gradient,
    })
    .addRadio({
      path: 'colorizeBy',
      name: 'Colorize By',
      description: 'Preferred parameter used to colorize data points.',
      category: ['Display Options'],
      defaultValue: defaultPumpchartOptions.colorizeBy,
      settings: {
        allowCustomValue: false,
        isClearable: false,
        options: [
          { label: 'Time', value: 'time' },
          { label: 'Efficiency', value: 'efficiency', description: 'If possible', },
        ],
      },
    })
    .addSliderInput({
      path: 'radius',
      name: 'Point Radius',
      description: 'How large to render each data point.',
      category: ['Display Options'],
      defaultValue: defaultPumpchartOptions.radius,
      settings: {
        included: true,
        min: 1,
        max: 10,
        step: 1,
      },
    });
});
