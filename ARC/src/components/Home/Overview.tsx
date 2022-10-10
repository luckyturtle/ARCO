import React from "react";

import { useContext } from 'react';
import { AptosContext } from "../../context/aptosContext";

export default function Overview() {
    const aptosContext = useContext(AptosContext);

    // let borrow = aptosContext?.borrow_amount;
    // let lend = aptosContext?.lend_amount;
    const aptPrice = aptosContext?.aptPrice;
    const arcPrice = aptosContext?.arcPrice;
    const borrow = Number(aptosContext?.borrow_amount) * Number(aptPrice) / 100000000;
    const lend = Number(aptosContext?.lend_amount) * Number(aptPrice) / 100000000;
    const percent = Number(borrow) * 100 / 80 * 100 / Number(lend) || 0;
    const style: React.CSSProperties = {
        width: percent.toString() + '%',
    }
    return (
        <div className="w-full">
            <span className="text-lg font-bold mb-10 w-full">Overview</span>
            <div className="w-full rounded-md shadow-sm px-12 py-4 mt-6 flex flex-row items-center justify-center bg-white flex-wrap">
                <div className="flex-1">
                    <span className="block text-sm text-text-black mx-auto text-center">Supply Balance</span>
                    <span className="block text-lg font-bold mx-auto text-center">$ {lend.toFixed(2)}</span>
                </div>
                <div className="h-8 border-r-2 border-solid border-divider"></div>
                <div className="flex-1"></div>
                <div className="h-8 border-r-2 border-solid border-divider"></div>
                <div className="flex-1">
                    <span className="block text-sm text-text-black mx-auto text-center">Borrow Balance</span>
                    <span className="block text-lg font-bold mx-auto text-center">$ {borrow.toFixed(2)}</span>
                </div>
                <div className="w-full mt-4 flex flex-row space-x-4 items-center justify-center">
                    <span className="text-sm text-text-black">Borrow Limit {percent.toFixed()}%</span>
                    <div className="flex-1 h-1 bg-text-black bg-opacity-20 overflow-hidden rounded-full">
                        <div className="bg-text-blur h-1 overflow-hidden" style={style}/>
                    </div>
                    <span className="text-sm text-text-black">$0.000000</span>
                </div>
            </div>
        </div>
    )
}