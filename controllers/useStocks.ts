import { useQuery } from "@apollo/client";
import _ from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";
import useCartModel from "../model/cart";
import { GET_ALL_SPECIES, GET_STOCKS } from "../model/stock/queries";

export default function useStocks() {
    const { query: { company, category } } = useRouter();
    const { add } = useCartModel();
    const { data: species, loading: loadingSpecies, error: errorSpecie } = useQuery(GET_ALL_SPECIES)
    const { data: stocks, loading: loadingStocks, error: errorStocks } = useQuery(GET_STOCKS)
    const [key, setKey] = useState<string>()
    const [filterKey, setFilterKey] = useState<string>()

    function handleError(error) {
        if (error) console.log(error.message || error)
    }

    const filter = (stocks, advanced?: boolean) => _.filter(stocks, (o) => {
        if (key) {
            const regex = new RegExp(`^${key}`, "i")
            const stock = o.node
            return (regex.test(stock?.product?.specie) ||
                regex.test(stock?.product?.mark))
        }
        return true
    })

    function match(tag: string, filterkey: string) {
        if (filterkey) {
            const regex = new RegExp(`^${filterkey}`, "i")
            return regex.test(tag)
        }
        return false
    }

    const onSearch = (search: string | Array<any>) => {
        setKey(null)
        setFilterKey(null)
        if (typeof search === "object") {
            if (search.length == 2) {
                setFilterKey(search[0])
                setKey(search[1])
            }
        } else {
            setKey(search)
        }
    }

    function addToCart(arg: any) {
        add(arg);
    }

    handleError(errorSpecie)
    handleError(errorStocks)

    function getTags() {
        let tags = _.map(species?.stocks?.edges, (o) => o.node?.product?.specie)
        tags = tags.filter((a, b) => tags.indexOf(a) === b)
        console.log(tags)
        return tags
    }

    return { addToCart, onSearch, match, filter, filterKey, loading: loadingSpecies || loadingStocks, company, category, getTags, stocks: stocks?.stocks?.edges }
}