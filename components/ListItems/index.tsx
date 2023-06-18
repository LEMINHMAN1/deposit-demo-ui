'use client';

import { useHttpGetAutoCached } from "@/hook/useHttp";
import { useEffect, useState } from "react";
import BidModal from "./BidModal";
import FilterBar from "./FilterBar";
import { Styled } from "./ListItems.styled";
import Table from "./Table";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";

export default function ListItems() {

    const [filterType, setFilterType] = useState<"all" | "ongoing" | "completed">("all");
    const [showBidModal, setShowBidModal] = useState(false);
    const [currentBid, setCurrentBid] = useState({});
    const {setUser} = useAuth();

    const {refetch, data:bidData, isLoading} = useHttpGetAutoCached<null, any>(`/bid/get?filterType=${filterType}`, {enabled: false});
    const {refetch: refetchUser, data: userData} = useHttpGetAutoCached<null, any>(`/user/get`, {enabled: false});

    const router = useRouter();
    useEffect(() => {
        refetch();
    }, [router, filterType]);

    useEffect(()=>{
        if(userData){
            console.log(userData,'xxxx')
            setUser(userData);
        }
    },[userData]);

    return (
        <Styled>
            <FilterBar filterType={filterType} setFilterType={setFilterType} />
            <Table isLoading={isLoading} data={bidData} onOpenModal={(bid:any)=>{setShowBidModal(true); setCurrentBid(bid)}}  />
            <BidModal bidData={currentBid} visible={showBidModal} onClose={()=>{setShowBidModal(false)}} onSubmit={()=>{setShowBidModal(false); refetch(); refetchUser()}} />
        </Styled>
    )
}
