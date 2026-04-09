import { dialog, getCurrentWindow } from "@electron/remote";

import { translate } from "eez-studio-shared/studio-i18n";
import { getLocale } from "eez-studio-shared/i10n";

function dlgTitle() {
    return translate("common.appTitle", getLocale());
}

function yesNo() {
    return [
        translate("common.yes", getLocale()),
        translate("common.no", getLocale())
    ];
}

function okBtn() {
    return [translate("common.ok", getLocale())];
}

export function info(message: string, detail: string | undefined) {
    return dialog.showMessageBox(getCurrentWindow(), {
        type: "info",
        title: dlgTitle(),
        message: message,
        detail: detail,
        noLink: true,
        buttons: okBtn()
    });
}

export function error(message: string, detail: string | undefined) {
    return dialog.showMessageBox(getCurrentWindow(), {
        type: "error",
        title: dlgTitle(),
        message: message,
        detail: detail,
        noLink: true,
        buttons: okBtn()
    });
}

export async function confirm(
    message: string,
    detail: string | undefined,
    callback: () => void,
    cancelCallback?: () => void
) {
    const yn = yesNo();
    const result = await dialog.showMessageBox(getCurrentWindow(), {
        type: "question",
        title: dlgTitle(),
        message: message,
        detail: detail,
        noLink: true,
        buttons: yn,
        cancelId: 1
    });
    const buttonIndex = result.response;
    if (buttonIndex == 0) {
        callback();
    } else if (cancelCallback) {
        cancelCallback();
    }
}

export async function confirmPromise(
    message: string,
    detail: string | undefined
) {
    const yn = yesNo();
    const result = await dialog.showMessageBox(getCurrentWindow(), {
        type: "question",
        title: dlgTitle(),
        message: message,
        detail: detail,
        noLink: true,
        buttons: yn,
        cancelId: 1
    });
    const buttonIndex = result.response;
    if (buttonIndex == 0) {
        return true;
    }
    return false;
}

export async function confirmWithButtons(
    message: string,
    detail: string | undefined,
    buttons: string[]
) {
    const result = await dialog.showMessageBox(getCurrentWindow(), {
        type: "question",
        title: dlgTitle(),
        message: message,
        detail: detail,
        noLink: true,
        buttons: buttons || yesNo(),
        cancelId: 1
    });
    return result.response;
}
