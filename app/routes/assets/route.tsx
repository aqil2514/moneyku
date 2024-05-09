import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [{
    "title": "Asset | Money Management"
}]

export default function Transaction(){
    return <p>Halaman Aset</p>
}