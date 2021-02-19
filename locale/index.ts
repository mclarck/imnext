import i18n from 'i18n-js'

import en from "./en.json"
import es from "./es.json"
import fr from "./fr.json"
import pt from "./pt.json"

const locale = "es";
// const language = _locale ? _locale : navigator.language
// const locale = language.substr(0, 2)

i18n.fallbacks = true
i18n.missingBehaviour = 'guess'
i18n.defaultLocale = 'es'
i18n.locale = locale
i18n.translations = { en, es, fr, pt }

const t = i18n.t

export { t, locale }