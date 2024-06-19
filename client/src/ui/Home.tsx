import { store } from "../store";
import { CreateAccount } from "./CreateAccount";
import { useUserWallets } from '@dynamic-labs/sdk-react-core'

export const Home = () => {

    const userWallets = useUserWallets()
    console.log(userWallets)

    const layers = store((state) => {
        return {
            networkLayer: state.networkLayer,
            phaserLayer: state.phaserLayer,
        };
    });

    if (!layers.networkLayer || !layers.phaserLayer) return <></>;

    return (
        <div className="absolute inset-0 pointer-events-none">
            <CreateAccount />
        </div>
    );
};
