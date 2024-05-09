import { MetaFunction } from "@remix-run/node"

export const meta:MetaFunction = () => [{
    "title": "Budgeting | Money Management"
}]

export default function Budgeting(){
    return <p>Halaman Budgeting</p>
}