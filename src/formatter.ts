import { DataFrame, FieldType, getFieldDisplayName } from '@grafana/data';

/**
 * Represents formatted data indexed by timestamps.
 */
type Formatted = Record<number, Record<string, number>>;

/**
 * Join all series into a time-indexed array of data.
 */
export function format(series: DataFrame[]): Formatted {
    const formatted: Formatted = {};
    // Run through each data frame in the series
    for (const frame of series) {
        // Run through each timestep in the data frame
        frame.fields.find(field => field.type === FieldType.time)?.values.forEach((step: number, index: number) => {
            // Set the timestep in the formatted data if unset
            formatted[step] = formatted[step] ?? {};
            // Run through each numeric value for each timestep
            for (const field of frame.fields.filter(field => field.type === FieldType.number)) {
                // Determine the display name and add the value to the formatted output
                const name: string = getFieldDisplayName(field, frame, series);
                formatted[step][name] = field.values[index];
            }
        });
    }
    return formatted;
}
