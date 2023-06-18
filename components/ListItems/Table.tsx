'use client';

import { useHttpGetAutoCached } from "@/hook/useHttp";
import { Bid } from "@/types/Bid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TableRow from "./_TableRow";
import { isEmpty } from "lodash";


interface Props {
    onOpenModal: (bid: any) => void;
    filterType: "all" | "ongoing" | "completed"
}
export default function Table({ onOpenModal, filterType }: Props) {

    const { data, isLoading, refetch } = useHttpGetAutoCached<null, any>(`/bid/get?filterType=${filterType}`);

    const router = useRouter();
    useEffect(() => {
        refetch();
    }, [router]);

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
