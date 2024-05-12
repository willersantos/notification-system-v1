export class DateUtils {
    public static millisecondsPerDay: number = 24 * 60 * 60 * 1000;

    public static today = (): Date => {
        return new Date();
    };

    public static getTime = (date: Date): number => {
        return date.getTime();
    };

    public static addDays = (date: Date, quantityDays: number): Date => {
        const dateValue = date.getDate();
        const dateAddedDays = date.setDate(dateValue + quantityDays);
        return new Date(dateAddedDays);
    };
}
