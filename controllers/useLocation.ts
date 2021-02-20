import _ from 'lodash'
import { t } from '../locale'

export default function useLocation() {

    async function confirmLocation() {
        return new Promise((resolve, reject) => {
            const isOk = window.confirm(t("Is it the good address?"))
            if (isOk) {
                resolve(true)
            }
            reject({ address: { street: t("Please, confirm location") }, message: "location unconfirmed" })
        })
    }

    async function checkLocation(arg: any) {
        return new Promise(async (resolve, reject) => {
            if (arg.street && arg.number) {
                const provider: any = (await import('../comp/map/provider')).default
                const OpenStreetMapProvider = provider()
                const query = `${arg.street} ${arg.number}, ${arg.city || "CABA, Argentina"}`
                const results = await OpenStreetMapProvider.search({ query })
                if (!_.isEmpty(results)) {
                    const location = results[0]
                    resolve(location)
                }
            }
            reject({ address: { street: t("Invalid location") }, message: `${JSON.stringify(arg)}: invalid location` })
        })
    }

    return { confirmLocation, checkLocation }
}