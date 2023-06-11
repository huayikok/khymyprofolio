import { create } from 'zustand';
import * as locales from '@mui/material/locale';
import localeData from '../translate';

// ==============================|| LOCALE STORE ||============================== //

export const useLocaleStore = create((set) => ({
    currentLocale: 'zhCN',
    localesList: locales,
    translate: localeData.zhCN.default,
    setLocale: (input) => {
        if (input.currentLocale === null) {
            // Do nothing.
        }
        else {
            set((state) => ({
                currentLocale: input.currentLocale,
                // Get translate by current locale
                translate: (localeData[input.currentLocale] === undefined) ? localeData['enUS'].default : localeData[input.currentLocale].default,
            }));
        }
    },
    setLocaleFormat: (input) => {
        return (input.currentLocale === undefined) ? `${input.substring(0, 2)}-${input.substring(2, 4)}` : `${input.currentLocale.substring(0, 2)}-${input.currentLocale.substring(2, 4)}`;
    }
}));
