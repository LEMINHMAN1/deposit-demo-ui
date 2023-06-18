import UserIcon from "@/components/Icon/UserIcon";
import { Styled } from "./Header.styled";
import Balance from "./Balance";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    return (
        <Styled>
            <div className="left" onClick={()=>{router.push("/")}}>Jitera</div>
            <div className="right">
                <Balance />
                <div className="menu-group">
                    <UserIcon />
                    <ProfileMenu />
                </div>
            </div>
        </Styled>
    )
}