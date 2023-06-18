import { useAuth } from "@/hook/useAuth"
import BigNumber from "bignumber.js";

export default function Balance() {
    const {user} = useAuth();
    return (
        <div className="balance">
            <div>Balance:</div>
            <div>{new BigNumber(user?.balance || 0).toFormat(2)}$</div>
        </div>
    )
}