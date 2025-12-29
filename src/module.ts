import { PanelPlugin } from '@grafana/data';
import { PumpchartOptions } from './types';
import { PumpchartPanel } from './components/panel';

export const plugin = new PanelPlugin<PumpchartOptions>(PumpchartPanel).setPanelOptions((builder, context) => {
  return builder
    .addSliderInput({
      path: 'test',
      name: 'Test Number',
      description: 'Just for testing!',
      settings: {
        min: 0,
        max: 10,
        step: 1,
        included: false,
      },
      defaultValue: 5,
    });
});
