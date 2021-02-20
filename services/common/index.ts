export function getCommonProps(context) {
    let props: any = {}
    const { res, params } = context; 
    if (!params?.company) return props;
    const { company } = params;
    let io = { uri: process.env.SOCKETIO_URL, options: {} }
    let rest = { uri: process.env.API_REST_URL, headers: { 'IM-COMPANY': company } }
    let graphql = { uri: process.env.API_GRAPHQL_URL, headers: { "IM-COMPANY": company } } 
    props.io = io
    props.rest = rest
    props.graphql = graphql
    props.company = company 
    return props;
}