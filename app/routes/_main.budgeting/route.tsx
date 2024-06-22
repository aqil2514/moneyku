import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [{
    "title": "Budgeting | Moneyku"
}]

export default function Budgeting(){
    return <p>Halaman Budgeting</p>
}