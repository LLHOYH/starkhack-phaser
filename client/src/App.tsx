import { useEffect } from "react";
import { useNetworkLayer } from "./ui/hooks/useNetworkLayer";
import { PhaserLayer } from "./phaser/phaserLayer";
import { store } from "./store";
import { UI } from "./ui";
import {
    DynamicContextProvider,
    DynamicWidget,
    FilterChain,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { StarknetIcon, EthereumIcon } from "@dynamic-labs/iconic";

function App() {
    const networkLayer = useNetworkLayer();

    const DYNAMIC_WALLET_ENV_ID = "2ee647a9-e101-4ea2-a4f7-cad6a4366958";
    const EthWallets = {
        label: { icon: <EthereumIcon /> },
        walletsFilter: FilterChain("EVM"),
    };

    const StarkWallets = {
        label: { icon: <StarknetIcon /> },
        walletsFilter: FilterChain("STARK"),
    };

    useEffect(() => {
        if (!networkLayer || !networkLayer.account) return;

        console.log("Setting network layer");

        store.setState({ networkLayer });
    }, [networkLayer]);

    return (
        <DynamicContextProvider
            settings={{
                environmentId: DYNAMIC_WALLET_ENV_ID,
                walletConnectors: [
                    StarknetWalletConnectors,
                    EthereumWalletConnectors,
                ],
                overrides: {
                    views:[        
                        {
                        type: "wallet-list",
                        tabs: {
                            items: [EthWallets, StarkWallets],
                        },
                    }]
                },
            }}
        >
            <div>
                <DynamicWidget />

                <div className="flex justify-center w-full h-screen text-white bg-black">
                    <div className="self-center">
                        {!networkLayer && "loading..."}
                    </div>
                </div>
                <PhaserLayer networkLayer={networkLayer} />
                <UI />
            </div>
        </DynamicContextProvider>
    );
}

export default App;
