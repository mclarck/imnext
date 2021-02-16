export function sanitize(obj: any) {
    const finalObj: any = {}
    Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object') {
            const nestedObj = sanitize(obj[key])
            if (Object.keys(nestedObj).length) {
                finalObj[key] = nestedObj
            }
        } else if (
            obj[key] !== '' &&
            obj[key] !== undefined &&
            obj[key] !== null
        ) {
            finalObj[key] = obj[key]
        }
    })
    return finalObj
}

export function fileUrl(file, scheme = "http") {
    return `${scheme}://${file.uri}/${file.path}/${file.name}`
}

export function isMail(email: string) {
    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
}