export function getExpirationDate(expiresIn: number) {
    const now = new Date();
    const futureDate = new Date(now.getTime() + expiresIn * 1000);
    return futureDate
}