interface BaseEndpointServer {
  github: string;
  local: string;
  production: string;
  cyclic: string;
}
const serverEndpoint: BaseEndpointServer = {
  github: process.env.GITHUB_SERVER as string,
  production: process.env.PRODUCTION_SERVER as string,
  local: process.env.LOCAL_SERVER as string,
  cyclic: process.env.CYCLIC_SERVER as string,
};

const isLocal = process.env.NODE_ENV === "development";
export const endpoint = isLocal
  ? serverEndpoint.local
  : serverEndpoint.production;

export default serverEndpoint;
