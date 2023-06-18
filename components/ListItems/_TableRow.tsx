'use client';

import { Bid } from "@/types/Bid";
import BigNumber from "bignumber.js";
import { hideString, toTimeString } from "@/utils/StringUtils";
import moment from "moment";
import { useEffect, useState } from "react";

interface Props {
    data: Bid;
    onOpenModal: (bid: any) => void;
}

export default function TableRow({ data, onOpenModal }: Props) {

    
    const dueDate = moment(data.dueDate)
    const date = moment();
    const diff = dueDate.diff(date, "s");

    const [remaning, setRemaning] = useState(diff>0 ? toTimeString(diff) : "00:00:00");
    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = moment();
            const diff = dueDate.diff(date, "s");
            if(diff >0){
                setRemaning(toTimeString(diff));
            }else{
                setRemaning("00:00:00");
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [])
    
    return (
        <div className="data">
            <div className="item">{data.itemName}</div>
            <div className="item">{new BigNumber(data?.currentPrice || data?.startPrice).toFormat(2)}$</div>
            <div className="item">{data?.bidUser ? hideString(data?.bidUser) : "--"}</div>
            <div className="item">{remaning}</div>
            <div className="item">
                <button disabled={remaning === "00:00:00"} className="btn-bid" onClick={() => onOpenModal(data)}>{remaning === "00:00:00" ? "Completed" : "Bid"}</button>
            </div>
        </div>
    )
}
