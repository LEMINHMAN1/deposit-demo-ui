'use client';
import { useAuth } from "@/hook/useAuth";
import clsx from "clsx";
import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { Styled } from "./page.styled";

const Schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required("Required field")
});

export default function Page() {

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Schema,
    onSubmit: async values => {
      login(values)
    },
  });

  const { handleSubmit, handleChange, errors } = formik;
  return (
    <Styled>
      <div className="group">
        <form onSubmit={handleSubmit} className="form">
          <div className="title">Login</div>
          <div className="input">
            <input className={clsx(errors["email"] && "ierr")} onChange={handleChange} id="email" name="email" type="text" placeholder="Email" />
            <div className="error">{errors["email"]}</div>
          </div>
          <div className="input">
            <input className={clsx(errors["password"] && "ierr")} onChange={handleChange} id="password" name="password" type="password" placeholder="Password" />
            <div className="error">{errors["password"]}</div>
          </div>

          <div className="bottom">
            <Link href={"/register"}>Register</Link>
            <button type="submit" >Login</button>
          </div>

        </form>
      </div>
    </Styled>
  )
}
