import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { ColorVoterBackend, IDL } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

const programId = new PublicKey("xT1sp4mfJ4rNGjwbrCNNMgFPXmUgUerAYCsoEGNKd4U");
const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

window.Buffer = window.Buffer || Buffer;

export const program = new Program<ColorVoterBackend>(IDL, programId, {
    connection,
});

export const [colorPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("color")],
    program.programId,
);

export type ColorData = IdlAccounts<ColorVoterBackend>["color"];