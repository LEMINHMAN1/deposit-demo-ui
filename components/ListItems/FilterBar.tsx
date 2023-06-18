'use client';

import { useAtom } from "jotai";
import clsx from "clsx";

type _Type = "all" | "ongoing" | "completed";
interface Props{
    filterType: _Type;
    setFilterType: (t:_Type) => void;
}
export default function FilterBar({filterType = "all", setFilterType}: Props) {

    const onHandler = (status: _Type)=>{
        if(filterType === status){
            setFilterType("all");
        }else{
            setFilterType(status);
        }
    }

    return (
        <div className="filter-bar">
            <button onClick={()=>onHandler("ongoing")} className={clsx(filterType === "ongoing" && "active")}>On going</button>
            <button onClick={()=>onHandler("completed")} className={clsx(filterType === "completed" && "active")}>Completed</button>
        </div>
    )
}
