export interface Dimensions {
    pixels?: number
    rem?: number
    vh?: number
    vw?: number
    cm?: number
    mm?: number
    q?: number
    in?: number
    pc?: number
    pt?: number
}

interface ScreenSize {
    width: number
    height: number
    innerWidth: number
    innerHeight: number
}

export function convert(px?: number, rem?: number): Dimensions | null {
    /**
     * Returns converted dimensions
     *
     * @params px, rem - only one is required, if more than one parameter is specified, only one will be considered in that order (px, rem)
     * @return Dimensions - an object containing all the converted dimension
     */
    let screenSize = getScreenSize();
    let dpi = getScreenDPI();

    if (px != null) {
        return convertFromPixels(px, dpi, screenSize);
    }

    if (rem != null) {
        return convertFromRem(rem, dpi, screenSize);
    }

    return null;
}

function getScreenSize(): ScreenSize {
    let screen = window.screen;
    return {
        width: screen.width,
        height: screen.height,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
    }
}

function getScreenDPI(): number {
    let div = document.createElement("div");
    let id = Math.floor(Math.random() * 9000) + "_random"
    div.style.height = "1in";
    div.style.width = "1in";
    div.style.position = "fixed";
    div.style.left = "-10000px";
    div.id = id;

    document.body.append(div);

    let devicePixelRatio = window.devicePixelRatio || 1;

    let el = document.getElementById(id)!!;
    let dpiX = el.offsetWidth * devicePixelRatio;
    el.remove();

    return dpiX;
}

function convertFromPixels(px: number, dpi: number, screenSize: ScreenSize): Dimensions {
    let cmPerInch = 2.54;
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    return {
        pixels: px,
        rem: px / fontSize,
        vh: (screenSize.innerHeight * 100) / (dpi * px),
        vw: px / screenSize.innerWidth,
        cm: (px * cmPerInch) / dpi ,
        mm: (px * cmPerInch * 10) / dpi,
        q: (px * cmPerInch * 40) / dpi,
        in: px / dpi,
        pc: (px * 6) / dpi,
        pt: (px * 72) / dpi,
    }
}

function convertFromRem(rem: number, dpi: number, screenSize: ScreenSize) {
    let fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let px = rem * fontSize;
    return convertFromPixels(px, dpi, screenSize)
}
