import React from 'react';
import { PanelProps } from '@grafana/data';
import { PumpchartOptions } from 'types';
import { useTheme2 } from '@grafana/ui';
import { Container } from './container';
import { PanelDataErrorView } from '@grafana/runtime';
import { Pumpchart } from 'psychart';

export const PumpchartPanel: React.FC<PanelProps<PumpchartOptions>> = (props) => {
  const isDarkTheme: boolean = useTheme2().isDark;
  let innerElement: HTMLElement;
  try {
    console.log(props.options.curve);
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
        start: 0,
        stop: 0,
      },
      units: {
        flow: props.options.units.flow,
        head: props.options.units.head,
        power: props.options.units.power,
        speed: props.options.units.speed,
      },
    });
    // TODO: plot data
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
