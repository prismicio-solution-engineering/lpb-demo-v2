import { LandingDocumentData } from "@/prismicio-types";

/**
 * Hex to RGBA conversion
 */
const hexToRgba = (color: string, alpha: number): string => {
    const hex = color.replace(/^#/, "");

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    return rgba
}

/**
 * Background Color
 */
export const getBackgroundColor = (pageData: LandingDocumentData): object => {

    let color
    let alpha = 1

    if(pageData?.primary_color) {
        color = pageData?.primary_color;
    } else {
        color = "#797979";
    }

    const rgba = hexToRgba(color, alpha);

    return {backgroundColor: rgba};

}

/**
 * Light Background Color
 */
export const getLightBackgroundColor = (pageData: LandingDocumentData): object => {

    let color
    let alpha

    if(pageData?.primary_color) {
        color = pageData?.primary_color;
        alpha = 0.1;
    } else {
        color = "#F2F1F1";
        alpha = 1;
    }

    const rgba = hexToRgba(color, alpha);

    return {backgroundColor: rgba};

}

/**
 * Icon Color
 */
export const getIconColor = (pageData: LandingDocumentData): object => {

    let color
    let alpha = 1

    if(pageData?.primary_color) {
        color = pageData?.primary_color;
    } else {
        color = "#797979";
    }

    const rgba = hexToRgba(color, alpha);

    return {backgroundColor: rgba};

}

/**
 * Light Icon Color
 */
export const getLightIconColor = (pageData: LandingDocumentData): object => {

    let color
    let alpha

    if(pageData?.primary_color) {
        color = pageData?.primary_color;
        alpha = 0.5;
    } else {
        color = "#D9D9D9";
        alpha = 1;
    }

    const rgba = hexToRgba(color, alpha);

    return {backgroundColor: rgba};

}