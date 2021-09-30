import { i18n } from '@/i18n'
import axios from 'axios'

const Trans = {
    get defaultLocale() {
        return process.env.VUE_APP_I18N_LOCALE
    },
    get supportedLocales() {
        return process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
    },
    get currentLocale() {
        return i18n.locale
    },
    set currentLocale(locale) {
        i18n.locale = locale
    },
    changeLocale(locale) {
        if (!Trans.isLocalSupported(locale))
            return Promise.reject(new Error('Locale not supported'))
        if (i18n.locale === locale) return Promise.resolve(locale)

        return Trans.loadLocaleFile(locale).then((msgs) => {
            i18n.setLocaleMessage(locale, msgs.default || msgs)
            return Trans.setI18nLocaleInServices(locale)
        })
    },
    isLocalSupported(locale) {
        return Trans.supportedLocales.includes(locale)
    },
    loadLocaleFile(locale) {
        return import(`@/locales/${locale}.json`)
    },
    setI18nLocaleInServices(locale) {
        Trans.currentLocale = locale
        axios.defaults.headers.common['Accept-Language'] = locale
        document.querySelector('html').setAttribute('lang', locale)
        return locale
    },
    routeMiddleware(to, form, next) {
        const locale = to.params.locale
        if (!Trans.isLocalSupported(locale)) return next(Trans.getUserSupportedLocale())
        return Trans.changeLocale(locale).then(() => next())
    },
    i18nRoute(to) {
        return {
            ...to,
            params: { locale: this.currentLocale, ...to.params },
        }
    },
    getUserSupportedLocale() {
        const userPreferredLocale = Trans.getUserLocale
        if (Trans.isLocalSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
        if (Trans.isLocalSupported(userPreferredLocale.localeNoISO)) {
            return userPreferredLocale.localeNoISO
        }
        return Trans.defaultLocale
    },
    getUserLocale() {
        const locale =
            window.navigator.language ||
            window.navigator.userLanguage ||
            Trans.defaultLocale
        return { locale: locale, localeNoISO: locale.split('-')[0] }
    },
}

export { Trans }
