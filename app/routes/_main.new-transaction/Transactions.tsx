import { TransactionType } from "~/@types/transaction";

export default function Transactions({data} : {data:TransactionType[]}){
    console.log(data);
    return(
        <div>ok</div>
    )
}