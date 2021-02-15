import moment from "moment";

export function parseDate(arg: string) {
    return moment(new Date(arg)).format()
}