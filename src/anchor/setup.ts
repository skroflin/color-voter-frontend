import { AnchorProvider, Idl, IdlAccounts, Program } from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";
import idl from '../anchor/idl.json';

const stringflayedIdl = JSON.stringify(idl);
const jsonIdl = JSON.parse(stringflayedIdl);
const programId = new PublicKey(idl.address);
const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

window.Buffer = window.Buffer || Buffer;

export function getProgram(wallet: any) {
    if (!wallet) {
        throw new Error("Wallet is not connected");
    }

    const provider = new AnchorProvider(connection, wallet, {
        preflightCommitment: "confirmed",
    });

    return new Program(jsonIdl as Idl, programId, provider);
}

export const [colorPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("color")],
    programId,
);

export type ColorData = IdlAccounts<typeof jsonIdl>["Color"];