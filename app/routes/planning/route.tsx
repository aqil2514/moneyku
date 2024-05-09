import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [
    {"title" : "Rencana | Money Management"}
]
export default function Test(){
    return <p>Halaman Planning</p>
}