export const setCookie = (cname: any, cValue: string, exTime: any) => {
    const d = new Date();
    d.setTime(d.getTime() + timeToMillisecond(exTime));
    const expires = 'expires=' + d.toUTCString();
    if (typeof document != 'undefined') {
        cValue = cValue ? btoa(cValue) : cValue;
        document.cookie = cname + '=' + cValue + ';' + expires + ';path=/';
    }
};

export const deleteCookie = (cname: string) => {
    if (typeof document != 'undefined') {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
};

export const getCookie = (cname: string, decode = true) => {
    try {
        if (typeof document != 'undefined') {
            const name = cname + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (decode) {
                    if (c.indexOf(name) === 0) {
                        return window.atob(c.substring(name.length, c.length));
                    }
                } else {
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
            }
        } else {
            return;
        }
    } catch (err) {
        return;
    }
};
const timeToMillisecond = (time: string) => {
    const number = +time.substring(0, time.indexOf(' '));
    switch (time.substr(time.indexOf(' ') + 1)) {
        case 'day':
            return number * 24 * 60 * 60 * 1000;
        case 'hour':
            return number * 60 * 60 * 1000;
        case 'minute':
            return number * 60 * 1000;
        case 'second':
            return number * 1000;
        default:
            return number * 60 * 1000;
    }
};
export const checkCookie = (cname: string) => {
    const cookieInfo = getCookie(cname);
    return !!cookieInfo;
};



