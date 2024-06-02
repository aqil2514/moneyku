const isLocal = process.env.NODE_ENV === "development";

const clientEndpoint = isLocal ? String(process.env.LOCAL_WEB_ENDPOINT) : String(process.env.LOCAL_WEB_STAGGING);

export default clientEndpoint