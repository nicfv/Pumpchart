import React from 'react';
import { PanelProps } from '@grafana/data';
import { PumpchartOptions } from 'types';
import { useTheme2 } from '@grafana/ui';
import { Container } from './container';

export const PumpchartPanel: React.FC<PanelProps<PumpchartOptions>> = (props) => {
    const isDarkTheme: boolean = useTheme2().isDark;
    const demo: HTMLParagraphElement = document.createElement('p');
    demo.textContent = `Dark theme is: ${isDarkTheme}.`;
    return <Container child={demo} />;
};
