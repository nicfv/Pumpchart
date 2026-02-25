import { DataFrame, DataFrameView, FieldType, outerJoinDataFrames } from '@grafana/data';

/**
 * Join all series by time into a DataFrameView.
 */
export function format(series: DataFrame[]): DataFrameView {
    return new DataFrameView(outerJoinDataFrames({ frames: series })!);
}

/**
 * Extract the time field series name from the formatted data.
 */
export function getTimeField(formatted: DataFrameView): string | undefined {
    return formatted.dataFrame.fields.find(field => field.type === FieldType.time)?.name;
}
