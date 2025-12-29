import React from 'react';
import { PanelProps } from '@grafana/data';
import { PumpchartOptions } from 'types';
import { useTheme2 } from '@grafana/ui';
import { Container } from './container';
import { PanelDataErrorView } from '@grafana/runtime';
import { Pumpchart } from 'psychart';
import { format } from 'formatter';

export const PumpchartPanel: React.FC<PanelProps<PumpchartOptions>> = (props) => {
  const isDarkTheme: boolean = useTheme2().isDark;
  let innerElement: HTMLElement;
  try {
    const formatted = format(props.data.series);
    const pumpchart: Pumpchart = new Pumpchart({
      axisColor: isDarkTheme ? '#303030' : '#E0E0E0',
      colorizeBy: props.options.colorizeBy,
      curve: {
        pump: {
          maxFlow: props.options.curve.pump.maxFlow,
          maxHead: props.options.curve.pump.maxHead,
        },
        system: {
          friction: props.options.curve.system.friction,
          static: props.options.curve.system.static,
        },
      },
      flipGradient: isDarkTheme,
      gradient: props.options.gradient,
      highlightColor: isDarkTheme ? '#555500' : '#FFFF00',
      pumpCurveColor: isDarkTheme ? '#AA6622' : '#FFAA55',
      size: { x: props.width, y: props.height },
      specificGravity: props.options.specificGravity,
      speed: {
        max: props.options.maxSpeed,
        operation: 50,
        steps: [50],
      },
      systemCurveColor: isDarkTheme ? '#22AA66' : '#55FFAA',
      textColor: isDarkTheme ? '#D0D0D0' : '#202020',
      timestamp: {
        start: props.timeRange.from.unix() * 1e3,
        stop: props.timeRange.to.unix() * 1e3,
      },
      units: {
        flow: props.options.units.flow,
        head: props.options.units.head,
        power: props.options.units.power,
        speed: props.options.units.speed,
      },
    });
    for (const t in formatted) {
      const flow: number | undefined = formatted[t][props.options.series.flow];
      const head: number | undefined = formatted[t][props.options.series.head];
      const power: number | undefined = formatted[t][props.options.series.power];
      const speed: number | undefined = formatted[t][props.options.series.speed];
      if (typeof flow !== 'number' || typeof head !== 'number') {
        continue;
      }
      pumpchart.plot({ flow: flow, head: head, power: power, speed: speed }, { radius: props.options.radius, timestamp: +t });
    }
    innerElement = pumpchart.getElement();
  } catch (ex: any) {
    return <PanelDataErrorView panelId={props.id} data={props.data} message={`${ex}`} />;
  }
  if (innerElement) {
    return <Container child={innerElement} />;
  } else {
    return <PanelDataErrorView panelId={props.id} data={props.data} />;
  }
};
