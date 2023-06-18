export function toTimeString(totalSeconds: number) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);
    return result;
}

export function hideString(value: string) {
    const len = value.length;
    console.log(len)
    return value.slice(0,len/4) + "***" + value.slice(-5)
}