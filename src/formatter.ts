import { DataFrame, DataFrameView, FieldType, outerJoinDataFrames } from '@grafana/data';

/**
 * Join all series by time into an array of series and return the time field series name.
 */
export function format(series: DataFrame[]): [string, Array<Record<string, number>>] {
    const formatted: DataFrameView = new DataFrameView(outerJoinDataFrames({ frames: series })!);
    const timeField: string | undefined = formatted.dataFrame.fields.find(field => field.type === FieldType.time)?.name;
    if (!timeField) {
        throw new Error('Data is missing a time field.');
    }
    return [timeField, formatted.toArray()];
}
