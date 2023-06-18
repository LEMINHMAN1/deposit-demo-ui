import { useAuth } from "@/hook/useAuth"
import BigNumber from "bignumber.js";

export default function Balance() {
    const { user } = useAuth();
    return (
        <div style={{marginTop: -11}}>
            <div className="balance">
                <div style={{fontSize:12}}>{user?.email}</div>
            </div>
            <div className="balance">
                <div>Balance:</div>
                <div>{new BigNumber(user?.balance || 0).toFormat(2)}$</div>
            </div>
        </div>
    )
}