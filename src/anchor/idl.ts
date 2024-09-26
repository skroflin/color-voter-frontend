/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/color_voter_backend.json`.
 */
export type ColorVoterBackend = {
    version: "0.1.0",
    name: "color_voter_backend",
    instructions: [
        {
            name: "create_color",
            accounts: [
                {
                    name: "color",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "system_program",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "name",
                    type: "string",
                },
            ],
        },
        {
            name: "vote_color",
            accounts: [
                {
                    name: "color",
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: "color",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "votes",
                        type: "u64",
                    },
                ],
            },
        },
    ],
};

export const IDL: ColorVoterBackend = {
    version: "0.1.0",
    name: "color_voter_backend",
    instructions: [
        {
            name: "create_color",
            accounts: [
                {
                    name: "color",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "user",
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: "system_program",
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: "name",
                    type: "string",
                },
            ],
        },
        {
            name: "vote_color",
            accounts: [
                {
                    name: "color",
                    isMut: true,
                    isSigner: false,
                },
            ],
            args: [],
        },
    ],
    accounts: [
        {
            name: "color",
            type: {
                kind: "struct",
                fields: [
                    {
                        name: "name",
                        type: "string",
                    },
                    {
                        name: "votes",
                        type: "u64",
                    },
                ],
            },
        },
    ],
};
