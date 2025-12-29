import { PanelPlugin } from '@grafana/data';
import { PumpchartOptions } from './types';
import { PumpchartPanel } from './components/panel';
import { defaultPumpchartOptions } from 'defaults';

export const plugin = new PanelPlugin<PumpchartOptions>(PumpchartPanel).setPanelOptions((builder, context) => {
  return builder
    .addNumberInput({
      path: 'specificGravity',
      name: 'Specific Gravity',
      description: 'The ratio of density of the process fluid in the system to the density of pure water.',
      defaultValue: defaultPumpchartOptions.specificGravity,
      settings: {
        integer: false,
        min: 0.01,
        max: 1000,
        placeholder: 'Specific Gravity',
        step: 0.01,
      },
    });
});
