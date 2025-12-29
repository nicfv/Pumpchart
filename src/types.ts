import { PumpchartTypes } from 'psychart';

export interface PumpchartOptions {
  readonly specificGravity: PumpchartTypes.Options['specificGravity'];
  readonly maxSpeed: PumpchartTypes.Options['speed']['max'];
  readonly units: PumpchartTypes.Options['units'];
  readonly curve: PumpchartTypes.Options['curve'];
  readonly gradient: PumpchartTypes.Options['gradient'];
  readonly colorizeBy: PumpchartTypes.Options['colorizeBy'];
  readonly radius: PumpchartTypes.DataOptions['radius'];
  readonly series: {
    readonly flow: string;
    readonly head: string;
    readonly power: string;
    readonly speed: string;
  };
}
