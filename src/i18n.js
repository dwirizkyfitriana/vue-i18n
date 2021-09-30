import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en.json'

Vue.use(VueI18n)

// function loadLocaleMessages() {
//     const locales = require.context(
//         './locales',
//         true,
//         /[A-Za-z0-9-_,\s]+\.json$/i
//     )
//     const messages = {}
//     locales.keys().forEach((key) => {
//         const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//         if (matched && matched.length > 1) {
//             const locale = matched[1]
//             messages[locale] = locales(key)
//         }
//     })
//     return messages
// }

const dateTimeFormats = {
    en: {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        },
    },
    id: {
        short: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        },
    },
}

const numberFormats = {
    en: {
        currency: {
            style: 'currency',
            currency: 'USD',
        },
    },
    id: {
        currency: {
            style: 'currency',
            currency: 'IDR',
        },
    },
}

export const i18n =  new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: { en },
    dateTimeFormats,
    numberFormats,
})
// export default new VueI18n({
//     locale: process.env.VUE_APP_I18N_LOCALE || 'en',
//     fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
//     messages: loadLocaleMessages(),
//     dateTimeFormats,
//     numberFormats,
// })
