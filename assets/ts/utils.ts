
export function isMobile(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|iemobile|wpdesktop/i.test(userAgent);
}