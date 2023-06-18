'use client';

import { Bid } from "@/types/Bid";
import { isEmpty } from "lodash";
import TableRow from "./_TableRow";


interface Props {
    isLoading: boolean
    onOpenModal: (bid: any) => void;
    data?: Bid[]
}
export default function Table({ isLoading = true, onOpenModal, data }: Props) {

    if (isLoading) return (<div>Loading...</div>)

    return (
        <div className="_table">
            <div className="head">
                <div className="item">Name</div>
                <div className="item">Current Price</div>
                <div className="item">Bid User</div>
                <div className="item">Duration</div>
                <div className="item">Bid</div>
            </div>
            {
                !isEmpty(data)
                ? 
                data?.map((e: Bid) => (
                    <TableRow key={e._id} data={e} onOpenModal={onOpenModal}/>
                ))
                :
                <div style={{fontWeight: 600, textAlign:"center", marginTop: 10, opacity:0.5}}>No Data</div>
            }
        </div>
    )
}
