import _ from "lodash";

class Storager {
    private readonly storage;
    private readonly company;

    constructor(company?: string) {
        this.storage = window.localStorage;
        this.company = `${company}@`
    }

    clear() {
        this.storage.clear()
    }

    removeItem(key: string) {
        this.storage.removeItem(this.company + key)
    }

    removeVal(key: string, val: string | object | Array<any>) {
        const item = this.getVal(key) || {};
        if (!_.isString(val)) {
            if (_.isArray(item)) {
                const nxt = item.filter((o: any) => o !== val);
                this.setVal(key, nxt);
            }
        } else {
            if (item[val]) {
                delete item[val];
                this.setVal(key, item);
            }
        }
    }

    addVal(key: string, val: any) {
        const item = this.getVal(key);
        if (_.isArray(item)) {
            item.push(val);
            this.setVal(key, item);
        } else {
            this.setVal(key, {...item, ...val});
        }
    }

    getVal(key: string) {
        const item: any = this.storage.getItem(this.company + key);
        try {
            return JSON.parse(item);
        } catch (error) {
            console.log(error.message);
        }
    }

    setVal(key: string, val: any) {
        return this.storage.setItem(this.company + key, JSON.stringify(val));
    }

    hasVal(key: string) {
        const item = this.getVal(key)
        return !_.isEmpty(item)
    }
}

export default Storager;
