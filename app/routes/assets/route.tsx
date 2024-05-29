import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [{
    "title": "Asset | Moneyku"
}]

export default function Transaction(){
    return <p>Halaman Aset</p>
}