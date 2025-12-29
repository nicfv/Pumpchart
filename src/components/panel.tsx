import React from 'react';
import { PanelProps } from '@grafana/data';
import { PumpchartOptions } from 'types';
import { useTheme2 } from '@grafana/ui';

export const PumpchartPanel: React.FC<PanelProps<PumpchartOptions>> = (props) => {
    const isDarkTheme: boolean = useTheme2().isDark;
    return <div>Hello! Dark theme is {isDarkTheme ? 'y' : 'n'}. Test is {props.options.test.toString()}.</div>;
};
