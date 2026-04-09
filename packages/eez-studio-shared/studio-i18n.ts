import { humanize } from "./string";

import menuEn from "./locales/en/menu.json";
import homeEn from "./locales/en/home.json";
import settingsEn from "./locales/en/settings.json";
import commonEn from "./locales/en/common.json";
import paletteEn from "./locales/en/palette.json";
import layoutEn from "./locales/en/layout.json";
import extensionsEn from "./locales/en/extensions.json";
import fontEn from "./locales/en/font.json";
import propertyPanelEn from "./locales/en/propertyPanel.json";

import menuZhCN from "./locales/zh-CN/menu.json";
import homeZhCN from "./locales/zh-CN/home.json";
import settingsZhCN from "./locales/zh-CN/settings.json";
import commonZhCN from "./locales/zh-CN/common.json";
import paletteZhCN from "./locales/zh-CN/palette.json";
import layoutZhCN from "./locales/zh-CN/layout.json";
import extensionsZhCN from "./locales/zh-CN/extensions.json";
import fontZhCN from "./locales/zh-CN/font.json";
import propertyPanelZhCN from "./locales/zh-CN/propertyPanel.json";

/** Bundled UI strings for English */
export const enTranslation = {
    menu: menuEn,
    home: homeEn,
    settings: settingsEn,
    common: commonEn,
    palette: paletteEn,
    layout: layoutEn,
    extensions: extensionsEn,
    font: fontEn,
    propertyPanel: propertyPanelEn
};

/** Bundled UI strings for Simplified Chinese (also used for zh-TW until a separate catalog exists) */
export const zhCNTranslation = {
    menu: menuZhCN,
    home: homeZhCN,
    settings: settingsZhCN,
    common: commonZhCN,
    palette: paletteZhCN,
    layout: layoutZhCN,
    extensions: extensionsZhCN,
    font: fontZhCN,
    propertyPanel: propertyPanelZhCN
};

type LocaleCode = "en" | "zh-CN" | "zh-TW";

const tables: Record<LocaleCode, typeof enTranslation> = {
    en: enTranslation,
    "zh-CN": zhCNTranslation,
    "zh-TW": zhCNTranslation
};

export function normalizeStudioLocale(locale: string | undefined): LocaleCode {
    if (!locale) {
        return "en";
    }
    const l = locale.toLowerCase();
    if (l === "zh" || l === "zh-cn") {
        return "zh-CN";
    }
    if (l === "zh-tw" || l === "zh-hk") {
        return "zh-TW";
    }
    if (l.startsWith("zh")) {
        return "zh-CN";
    }
    return "en";
}

function getStringAtPath(
    root: Record<string, unknown>,
    path: string
): string | undefined {
    const parts = path.split(".");
    let cur: unknown = root;
    for (const p of parts) {
        if (cur == null || typeof cur !== "object") {
            return undefined;
        }
        cur = (cur as Record<string, unknown>)[p];
    }
    return typeof cur === "string" ? cur : undefined;
}

/**
 * Synchronous translation for the main process and non-React code.
 * Keys use dot notation, e.g. `menu.file`, `home.open`.
 */
export function translate(
    key: string,
    locale?: string,
    vars?: Record<string, string | number>
): string {
    const loc = normalizeStudioLocale(locale);
    const table = tables[loc] ?? enTranslation;
    let s =
        getStringAtPath(table as unknown as Record<string, unknown>, key) ??
        getStringAtPath(enTranslation as unknown as Record<string, unknown>, key) ??
        key;
    if (vars) {
        for (const [k, v] of Object.entries(vars)) {
            const re = new RegExp(`{{\\s*${k}\\s*}}`, "g");
            s = s.replace(re, String(v));
        }
    }
    return s;
}

/**
 * Translate flow / LVGL component palette labels and group titles (English → 中文).
 * Unknown strings are returned unchanged.
 */
export function translatePaletteLabel(
    text: string,
    locale?: string
): string {
    const loc = normalizeStudioLocale(locale);
    if (loc === "en") {
        return text;
    }
    const labels = paletteZhCN.labels as Record<string, string>;
    return labels[text] ?? text;
}

/**
 * FlexLayout / 工程编辑器停靠标签标题（按英文原文匹配）。
 */
export function translateLayoutLabel(
    text: string,
    locale?: string
): string {
    const loc = normalizeStudioLocale(locale);
    if (loc === "en" || !text) {
        return text;
    }
    const names = layoutZhCN.names as Record<string, string>;
    return names[text] ?? text;
}

type PropertyPanelBundle = {
    groups?: Record<string, string>;
    labels?: Record<string, string>;
    qualified?: Record<string, string>;
    propertyNames?: Record<string, string>;
};

function getPropertyPanelBundle(locale: string | undefined): PropertyPanelBundle {
    const loc = normalizeStudioLocale(locale);
    const table = (tables[loc] ?? enTranslation) as unknown as {
        propertyPanel?: PropertyPanelBundle;
    };
    return table.propertyPanel ?? {};
}

/**
 * 属性面板分组标题（按 group.id，缺省则回退英文 title）。
 */
export function translatePropertyPanelGroupTitle(
    groupId: string,
    fallbackTitle: string,
    locale?: string
): string {
    const loc = normalizeStudioLocale(locale);
    if (loc === "en" || !groupId) {
        return fallbackTitle;
    }
    const g = getPropertyPanelBundle(locale).groups;
    return (g && g[groupId]) || fallbackTitle;
}

/**
 * 属性名 / 显式 displayName 的译文：先整句匹配，再 `类名.属性名`，再在默认 humanize 与 propertyName 一致时用 propertyNames。
 */
export function translatePropertyPanelLabel(
    text: string,
    locale?: string,
    propertyName?: string,
    qualifiedKey?: string
): string {
    const loc = normalizeStudioLocale(locale);
    if (loc === "en" || !text) {
        return text;
    }
    const pp = getPropertyPanelBundle(locale);
    if (pp.labels?.[text]) {
        return pp.labels[text];
    }
    if (qualifiedKey && pp.qualified?.[qualifiedKey]) {
        return pp.qualified[qualifiedKey];
    }
    if (propertyName) {
        const hum = humanize(propertyName);
        if (hum === text && pp.propertyNames?.[propertyName]) {
            return pp.propertyNames[propertyName];
        }
    }
    return text;
}
