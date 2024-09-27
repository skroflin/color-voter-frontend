import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getProgram, colorPDA, ColorData } from "./anchor/setup";
import { Keypair } from "@solana/web3.js";

export default function ColorState() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [colorData, setColorData] = useState<ColorData | null>(null);
    const [loading, setLoading] = useState(true);
    const program = getProgram(wallet);

    useEffect(() => {
        const fetchColorData = async () => {
            try {
                const colorData = await program.account.color.fetch(colorPDA);
                setColorData(colorData);
            } catch (error) {
                console.error("Error fetching color data:", error);

                if (!wallet.publicKey) {
                    console.error("Wallet is not connected");
                    return;
                }

                const colorAccount = Keypair.generate();

                const accounts = {
                    color: colorAccount.publicKey,
                    user: wallet.publicKey,
                    systemProgram: Keypair.generate().publicKey,
                };

                await program.methods
                    .create_color("Red")
                    .accounts(accounts)
                    .signers([colorAccount])
                    .rpc();

                console.log("Created new color account:", colorAccount.publicKey);
                const newData = await program.account.color.fetch(colorAccount.publicKey);
                setColorData(newData);
            } finally {
                setLoading(false);
            }

        };

        fetchColorData();

        const subscriptionId = connection.onAccountChange(
            colorPDA,
            accountInfo => {
                try {
                    const decodedData = program.coder.accounts.decode(
                        "color",
                        accountInfo.data,
                    );
                    setColorData(decodedData);
                } catch (error) {
                    console.error("Error decoding account data:", error);
                }
            },
        );

        return () => {
            connection.removeAccountChangeListener(subscriptionId);
        };

    }, [program, colorPDA, connection]);

    if (loading) return <p>Loading...</p>

    return (
        <div>
            {colorData ? (
                <p className="text-lg">Color: {colorData.name} - Votes: {colorData.votes.toString()}</p>
            ) : (
                <p className="text-lg">Loading color data...</p>
            )}
        </div>
    );
}
