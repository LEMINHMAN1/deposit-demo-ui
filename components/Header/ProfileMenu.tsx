import { useAuth } from "@/hook/useAuth"
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
    const {logout} = useAuth();
    const router = useRouter();
    return (
        <div className="profile-menu">
            <div className="item" onClick={()=>{router.push("/create-item")}}>Create New Item</div>
            <div className="item" onClick={()=>{router.push("/deposit")}}>Deposit</div>
            <div className="item devided"/>
            <div className="item" onClick={logout}>Logout</div>
        </div>
    )
}