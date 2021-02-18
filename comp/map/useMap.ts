export default function useMap({ address }) {
    const center: any = address?.location ? [address?.location["y"], address?.location["x"]] : [0, 0];
    const attribute = "&copy; <a href='http://osm.org/copyright'>inmarketify | openstreetmap</a> contributors";
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    return { center, attribute, url }
}