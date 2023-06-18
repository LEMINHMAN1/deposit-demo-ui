'use client';
import { useAPI } from "@/hook/useHttp";
import clsx from "clsx";
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { Styled } from "./page.styled";

const Schema = Yup.object().shape({
  itemName: Yup.string().required('Required field'),
  startPrice: Yup.number().required("Required field"),
  timeWindow: Yup.number().required("Required field")
});

export default function Page() {
  const router = useRouter();
  const { API } = useAPI();

  const formik = useFormik({
    initialValues: {
      itemName: null,
      startPrice: null,
      timeWindow: null
    },
    validationSchema: Schema,
    onSubmit: async values => {
      try {
        const res: { status: number, data: any } = await API.post("/bid/create", values);
        const { status, data } = res;
        if (status === 200) {
          toast.success("Item created successfully!", { toastId: "success" });
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
          <div className="title">Create Item</div>
          <div className="input">
            <input maxLength={20} className={clsx(errors["itemName"] && "ierr")} onChange={handleChange} id="itemName" name="itemName" type="text" placeholder="Name" />
            <div className="error">{errors["itemName"]}</div>
          </div>
          <div className="input">
            <input maxLength={20} className={clsx(errors["startPrice"] && "ierr")} onChange={handleChange} id="startPrice" name="startPrice" type="number" placeholder="Start Price" />
            <div className="error">{errors["startPrice"]}</div>
          </div>
          <div className="input">
            <input maxLength={10} className={clsx(errors["timeWindow"] && "ierr")} onChange={handleChange} id="timeWindow" name="timeWindow" type="number" placeholder="Time Window Minutes, ex: 60 means 1hr" />
            <div className="error">{errors["timeWindow"]}</div>
          </div>
          <div className="bottom">
            <button type="button" className="outlined" onClick={() => { router.push("/") }}>Cancel</button>
            <button type="submit">Create</button>
          </div>

        </form>
      </div>
    </Styled>
  )
}
