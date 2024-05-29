import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [{
    "title": "Statistik | Moneyku"
}]

export default function Transaction(){
    return <p>Halaman Statistik</p>
}