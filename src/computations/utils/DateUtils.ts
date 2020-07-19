// return number of days since 1992-12-31
export function toDaysSinceMilenium(date: Date): number {
    const mileniumDay = new Date(Date.UTC(1999, 11, 31));
    const millisecondsSinceMilenium = date.getTime() - mileniumDay.getTime();
    const millisecondsInDay = (1000 * 60 * 60 * 24) // 1000ms * 60s * 60min * 24h
    return millisecondsSinceMilenium / millisecondsInDay;
}

export function toJulianCenturiesSinceMilenium(date: Date): number {
    return toDaysSinceMilenium(date) / 36525.0;
}