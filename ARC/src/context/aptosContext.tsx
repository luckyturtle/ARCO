import { createContext } from 'react';

import React, { ReactNode, useEffect, useState } from "react";

import { Types, AptosClient } from 'aptos';

const protocol_address = "0xb6b036eb0c96620b95c3fba556a1bc6ed33bbe17ff808dfeeea8a9224faf61fd";

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');
const token1 = `${protocol_address}::arc::Pool<0x1::aptos_coin::AptosCoin>`;
const token2 = `${protocol_address}::arc::Pool<${protocol_address}::arc_coin::ARC_Coin>`;
const ticket = `${protocol_address}::arc::Ticket`;
const balance = `0x1::coin::CoinStore<${protocol_address}::arc_coin::ARC_Coin>`;

interface AppContextInterface {
    total_deposit1: string;
    total_deposit2: string;
    value1: string;
    total_borrow1: string;
    total_borrow2: string;
    value2: string;
    borrow_amount: string,
    lend_amount: string,
    last_interact_time: string,
    Deposit1: any,
    Deposit2: any,
    Borrow1: any,
    Borrow2: any,
    Claim: any,
    handleConnect: any,
    handleDisconnect: any,
    address: string | null,
    isConnected: boolean,
    aptPrice: string,
    arcPrice: string,
    apt_balance: string,
}

interface Props {
    children?: ReactNode
    // any props that come into the component
}

export const AptosContext = createContext<AppContextInterface | null>(null);
export const AptosContextProvider = ({ children, ...props }: Props) => {
    const [address, setAddress] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)
    const [resources, setResources] = React.useState<Types.MoveResource[]>([]);
    const [userResources, setUserResources] = React.useState<Types.MoveResource[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkIsConnected();
    }, [])

    const handleConnect = async () => {
        try {
            const connectStatus = await window.aptos.connect()
            console.log('connectStatus', connectStatus)
            checkIsConnected()
        } catch (e) {
            console.log(e)
        }
    }

    const handleDisconnect = async () => {
        await window.aptos.disconnect()
        checkIsConnected()
    }

    const checkIsConnected = async () => {
        const x = await window.aptos.isConnected()
        setIsConnected(x)
    };

    const Claim = async (amount:Number) => {
        const transaction = {
            arguments: [],
            function: protocol_address + '::arc::claim',
            type: 'entry_function_payload',      
            type_arguments: [],      
        };
        try {
            setIsLoading(true);
            await window.aptos.signAndSubmitTransaction(transaction);
        } finally {
            setIsLoading(false);
        }
    }

    const Deposit1 = async (amount:Number) => {
        const transaction = {
            arguments: [amount],
            function: protocol_address + '::arc::lend',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        try {
            setIsLoading(true);
            await window.aptos.signAndSubmitTransaction(transaction);
        } finally {
            setIsLoading(false);
        }
    }
    const Deposit2 = async (amount:Number) => {
        const transaction = {
            arguments: [amount],
            function: protocol_address + '::arc::lend',
            type: 'entry_function_payload',
            type_arguments: [protocol_address + '::arc_coin::ARC_Coin'],
        };
        try {
            setIsLoading(true);
            await window.aptos.signAndSubmitTransaction(transaction);
        } finally {
            setIsLoading(false);
        }
    }
    const Borrow1 = async (amount:Number) => {
        const transaction = {
            arguments: [amount],
            function: protocol_address + '::arc::borrow',
            type: 'entry_function_payload',
            type_arguments: ['0x1::aptos_coin::AptosCoin'],
        };
        try {
            setIsLoading(true);
            await window.aptos.signAndSubmitTransaction(transaction);
        } finally {
            setIsLoading(false);
        }
    }
    const Borrow2 = async (amount:Number) => {
        const transaction = {
            arguments: [amount],
            function: protocol_address + '::arc::borrow',
            type: 'entry_function_payload',
            type_arguments: [protocol_address + '::arc_coin::ARC_Coin'],
        };
        try {
            setIsLoading(true);
            await window.aptos.signAndSubmitTransaction(transaction);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isConnected) {
            window?.aptos.account().then((data: any) => {
                setAddress(data.address)
            })
        } else {
            setAddress(null)
        }
    }, [isConnected])

    useEffect(() => {
        client.getAccountResources(protocol_address).then(setResources);
        if (!address) return;        
        client.getAccountResources(address).then(setUserResources);
    }, [address, isLoading]);

    const resource1 = resources.find((r) => r.type === token1);
    const data1 = resource1?.data as { borrowed_amount: string, deposited_amount: string, token: { value: string } } | undefined;
    const resource2 = resources.find((r) => r.type === token2);
    const data2 = resource2?.data as { borrowed_amount: string, deposited_amount: string, token: { value: string } } | undefined;
    const resource3 = userResources.find((r) => r.type === ticket);
    const data3 = resource3?.data as { borrow_amount: string, lend_amount: string, last_interact_time: string } | undefined;
    console.log(data3);

    const bal_resource = userResources.find((r) => r.type === balance);
    // console.log('bal', bal_resource);
    const bal_data = bal_resource?.data as { coin: { value: string } };
    // console.log(bal_data);

    const total_deposit1 = data1?.deposited_amount;
    const total_borrow1 = data1?.borrowed_amount;
    const value1 = data1?.token.value;

    const total_deposit2 = data2?.deposited_amount;
    const total_borrow2 = data2?.borrowed_amount;
    const value2 = data2?.token.value;

    const borrow_amount = data3?.borrow_amount;
    const lend_amount = data3?.lend_amount;
    const last_interact_time = data3?.last_interact_time;

    const apt_balance = bal_data?.coin.value;

    // const aptPrice = data3?.aptPrice;
    // const arcPrice = data3?.arcPrice;

    const datacontext: AppContextInterface = {
        total_deposit1: total_deposit1 || "0",
        total_deposit2: total_deposit2 || "0",
        value1: value1 || "0",
        total_borrow1: total_borrow1 || "0",
        total_borrow2: total_borrow2 || "0",
        value2: value2 || "0",
        borrow_amount: borrow_amount || "0",
        lend_amount: lend_amount || "0",
        last_interact_time: last_interact_time || "0",
        aptPrice: "0.5",
        arcPrice: "1",
        Deposit1: Deposit1,
        Deposit2: Deposit2,
        Borrow1: Borrow1,
        Borrow2: Borrow2,
        apt_balance: apt_balance,
        Claim,
        handleConnect: handleConnect,
        handleDisconnect: handleDisconnect,
        address: address,
        isConnected: isConnected,
    };

    return (
        <AptosContext.Provider value={datacontext}>
            {children}
        </AptosContext.Provider>
    )
}