interface BaseEndpointServer{
    github: string;
    local: string;
    cyclic: string;
}
const serverEndpoint:BaseEndpointServer = {
    github: process.env.GITHUB_SERVER as string,
    local: process.env.LOCAL_SERVER as string,
    cyclic: process.env.CYCLIC_SERVER as string,
}

export default serverEndpoint;