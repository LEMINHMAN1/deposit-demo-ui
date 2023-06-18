'use client';
import { useAtom } from "jotai";
import { toast } from 'react-toastify';
import { userAtom } from "./../atom"
import { UserRequest, UserResponse } from "@/types/User";
import { useAPI } from "./useHttp";
import { useRouter } from 'next/navigation';

export function useAuth() {
    const [user, setUser] = useAtom(userAtom);
    const { API } = useAPI();
    const router = useRouter();

    const login = async (req: UserRequest) => {
        try {
            const res: { status: number, data: UserResponse } = await API.post("/login", req);
            const { status, data } = res;
            if (status === 200) {
                const { user, accessToken, refreshToken } = data;
                setUser(user);
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", refreshToken)
                toast.success("Account login successfully!", { toastId: "success" });
            }
        } catch (err: any) {
            toast.error(err.message, { toastId: err.message })
        }
    }

    const register = async (req: UserRequest) => {
        try {
            const res: { status: number, data: UserResponse } = await API.post("/register", req);
            const { status, data } = res;
            if (status === 200) {
                toast.success("Account created successfully!", { toastId: "success" });
                router.push("/login");
            }
        } catch (err: any) {
            toast.error(err.message, { toastId: err.message })
        }
    }


    const logout = async () => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken")
            setUser(null);
            router.push("/login");
        } catch (err: any) {
            toast.error(err.message, { toastId: err.message })
        }
    }

    return {
        user, setUser, login, logout, register
    }
}