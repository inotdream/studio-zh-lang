import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { observable, runInAction } from "mobx";

import {
    enTranslation,
    zhCNTranslation,
    normalizeStudioLocale,
    translatePaletteLabel,
    translateLayoutLabel
} from "./studio-i18n";

/** Mobx box so observer components re-render when the UI language changes */
export const i18nLanguageVersion = observable.box(0);

function bumpI18nVersion() {
    runInAction(() => {
        i18nLanguageVersion.set(i18nLanguageVersion.get() + 1);
    });
}

export function initStudioI18nRenderer(locale: string) {
    const lng = normalizeStudioLocale(locale);
    if (!i18n.isInitialized) {
        i18n.use(initReactI18next).init({
            resources: {
                en: { translation: enTranslation },
                "zh-CN": { translation: zhCNTranslation },
                "zh-TW": { translation: zhCNTranslation }
            },
            lng,
            fallbackLng: "en",
            interpolation: { escapeValue: false }
        });
        i18n.on("languageChanged", bumpI18nVersion);
    } else {
        void i18n.changeLanguage(lng);
    }
    bumpI18nVersion();
}

export function syncStudioI18nLanguage(locale: string) {
    void i18n.changeLanguage(normalizeStudioLocale(locale));
}

/**
 * Use inside MobX `observer` components so text updates when the language changes.
 */
export function tr(
    key: string,
    options?: Record<string, string | number | boolean>
) {
    void i18nLanguageVersion.get();
    return i18n.t(key, options);
}

/** Flow / LVGL 组件面板上的分组名与组件名（英文原文 → 中文） */
export function trPaletteLabel(text: string) {
    void i18nLanguageVersion.get();
    return translatePaletteLabel(text, i18n.language);
}

/** 工程编辑器 FlexLayout 标签标题 */
export function trLayoutLabel(text: string) {
    void i18nLanguageVersion.get();
    return translateLayoutLabel(text, i18n.language);
}

export { i18n };
