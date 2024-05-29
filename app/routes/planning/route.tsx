import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [
    {"title" : "Rencana | Moneyku"}
]
export default function Test(){
    return <p>Halaman Planning</p>
}