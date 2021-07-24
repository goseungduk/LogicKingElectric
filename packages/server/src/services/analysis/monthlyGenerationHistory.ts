import { getDate, getDaysInMonth } from "date-fns";
import { GenerationActual, GenerationPrediction } from "../../entity/generationHistory";

export interface MonthlyGenerationHistory {
    year: number;
    month: number;
    records: DateRecord[];
}

interface DateRecord {
    date: number;
    actual?: number;
    prediction?: number;
    errorRate?: number;
}

interface RawData {
    year: number;
    month: number;
    actualMonthly: GenerationActual[];
    predictionMonthly: GenerationPrediction[];
}

export function createMonthlyHistoryReport({
    year,
    month,
    actualMonthly,
    predictionMonthly,
}: RawData): MonthlyGenerationHistory {
    const daysInMonth = getDaysInMonth(new Date(year, month));

    const dateList = makeEmptyDateList(daysInMonth);

    actualMonthly.forEach(actual => {
        const date = getDate(actual.targetDate);
        dateList[date - 1].actual = actual.generation;
    });

    predictionMonthly.forEach(prediction => {
        const date = getDate(prediction.targetDate);
        dateList[date - 1].prediction = prediction.generation;
    });

    dateList.forEach(entry => {
        if (entry.actual !== undefined && entry.prediction !== undefined) {
            entry.errorRate = calcErrorRate(entry.actual, entry.prediction);
        }
    });

    return {
        year,
        month,
        records: dateList,
    };
}

function makeEmptyDateList(size: number): DateRecord[] {
    const result: DateRecord[] = [...new Array(size)].map((_, index) => {
        return {
            date: index + 1,
        };
    });

    return result;
}

function calcErrorRate(actual: number, prediction: number) {
    const error = Math.abs(actual - prediction);
    const errorRate = error / prediction;

    return errorRate;
}