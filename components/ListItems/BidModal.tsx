'use client';

import { useAuth } from "@/hook/useAuth";
import { useAPI } from "@/hook/useHttp";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { BidModalStyled } from "./ListItems.styled";

interface Props {
    visible?: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
    bidData: any;
}

export default function BidModal({ visible = false, onClose, onSubmit, bidData }: Props) {

    const { API } = useAPI();

    const { user } = useAuth();

    const highestPrice = bidData?.currentPrice ? bidData.currentPrice + 1 : bidData.startPrice + 1;
    const Schema = Yup.object().shape(
        user ?
            {
                amount: Yup.number().required('Required field').min(highestPrice, `Min price is ${highestPrice}`).max(user.balance, `Your balance (${new BigNumber(user.balance).toFormat(2)}$) isn't enough `),
            } :
            {
                amount: Yup.number().required('Required field').min(highestPrice, `Min price is ${highestPrice}`)
            }
    );

    const formik = useFormik({
        initialValues: {
            amount: null,
        },
        validationSchema: Schema,
        onSubmit: async values => {
            try {
                const res: { status: number, data: any } = await API.patch("/bid/place-order", { amount: values["amount"], projectId: bidData._id });
                const { status, data } = res;
                if (status === 200) {
                    toast.success("Successfully bid project", { toastId: "Successfully bid project" });
                    onSubmit && onSubmit();
                }
            } catch (err: any) {
                toast.error(err.message, { toastId: err.message })
            }
        },
    });


    const { handleSubmit, handleChange, errors } = formik;

    return (
        <BidModalStyled style={!visible ? { display: "none" } : {}}>
            <div className="group">
                <form onSubmit={handleSubmit}>
                    <div className="content">
                        <div className="title">{`Bid ${bidData?.itemName}`}</div>
                        <input placeholder="Bid Price" className={clsx(errors["amount"] && "ierr")} onChange={handleChange} id="amount" name="amount" type="number" />
                        <div className="error">{errors["amount"]}</div>
                        <div className="btn-group">
                            <button onClick={() => { onClose && onClose() }}>Cancel</button>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </BidModalStyled>
    )
}
