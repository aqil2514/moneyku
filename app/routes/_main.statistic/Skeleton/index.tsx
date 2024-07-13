import { MainWrapper } from "components/General/Container"

export default function Skeleton(){
    return(
        <MainWrapper className="p-4">
            <div className="bg-white w-[990px] h-60 rounded-lg p-4">
            <div className="h-6 w-44 animate-pulse bg-slate-500 rounded-md mx-auto my-2" />
            <div className="h-5 w-16 animate-pulse bg-slate-500 rounded-md mx-auto my-2" />
            <div className="h-32 w-32 animate-pulse bg-slate-500 rounded-full mx-auto my-2" />
            </div>
        </MainWrapper>
    )
}