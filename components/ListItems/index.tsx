'use client';

import { useHttpGetAutoCached } from "@/hook/useHttp";
import { useState } from "react";
import BidModal from "./BidModal";
import FilterBar from "./FilterBar";
import { Styled } from "./ListItems.styled";
import Table from "./Table";

export default function ListItems() {

    const [filterType, setFilterType] = useState<"all" | "ongoing" | "completed">("all");
    const [showBidModal, setShowBidModal] = useState(false);
    const [currentBid, setCurrentBid] = useState({});

    const {refetch } = useHttpGetAutoCached<null, any>(`/bid/get?filterType=${filterType}`, {enabled: false});

    return (
        <Styled>
            <FilterBar filterType={filterType} setFilterType={setFilterType} />
            <Table filterType={filterType} onOpenModal={(bid:any)=>{setShowBidModal(true); setCurrentBid(bid)}}  />
            <BidModal bidData={currentBid} visible={showBidModal} onClose={()=>{setShowBidModal(false)}} onSubmit={()=>{setShowBidModal(false); refetch()}} />
        </Styled>
    )
}
