'use client';
import { useAuth } from "@/hook/useAuth";
import clsx from "clsx";
import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { Styled } from "./page.styled";
import { useRouter } from "next/navigation";
import { useAPI } from "@/hook/useHttp";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { userAtom } from "@/atom";

const Schema = Yup.object().shape({
  amount: Yup.number().required('Required').min(1, "Please deposit with min 1$"),
});

export default function Page() {

  const router = useRouter();
  const {API} = useAPI();
  const {user, setUser} = useAuth();

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Schema,
    onSubmit: async values => {
      try {
        const res: { status: number, data: any } = await API.patch("/user/deposit", values);
        const { status, data } = res;
        if (status === 200) {
          toast.success("Item created successfully!", { toastId: "success" });
          setUser({...user, balance: (user?.balance || 0) + Number(values.amount)})
          router.push("/")
        }
      } catch (err: any) {
        toast.error(err.message, { toastId: err.message })
      }
    },
  });

  const { handleSubmit, handleChange, errors } = formik;
  return (
    <Styled>
      <div className="group">
        <form onSubmit={handleSubmit} className="form">
          <div className="title">Deposit</div>
          <div className="input">
            <input className={clsx(errors["amount"] && "ierr")} onChange={handleChange} id="amount" name="amount" type="text" placeholder="Amount" />
            <div className="error">{errors["amount"]}</div>
          </div>
          <div className="bottom">
            <button type="button" className="outlined" onClick={() => { router.push("/") }}>Cancel</button>
            <button type="submit" >Deposit</button>
          </div>

        </form>
      </div>
    </Styled>
  )
}
