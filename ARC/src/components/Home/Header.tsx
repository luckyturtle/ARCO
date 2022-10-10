import Bank from "../../asset/icons/bank.svg";
import Wallet from "../../asset/icons/wallet.svg";
import Piehart from "../../asset/icons/pie-chart.svg";
import Piehart1 from "../../asset/icons/pie-chart1.svg";

import React, { useEffect, useState } from "react";

import { useContext } from 'react';
import { AptosContext } from "../../context/aptosContext";

export default function Header() {
    const aptosContext = useContext(AptosContext);
    const total_borrow1 = Number(aptosContext?.total_borrow1)/100000000;
    const total_borrow2 = Number(aptosContext?.total_borrow2)/100000000;
    const total_deposit1 = Number(aptosContext?.total_deposit1)/100000000;
    const total_deposit2 = Number(aptosContext?.total_deposit2)/100000000;
    const value1 = Number(aptosContext?.value1)/100000000;
    const value2 = Number(aptosContext?.value2)/100000000;
    const aptPrice = aptosContext?.aptPrice;
    const arcPrice = aptosContext?.arcPrice;

    const total_borrow = (total_borrow1 * Number(aptPrice) + total_borrow2 * Number(arcPrice)).toFixed(2);
    const total_deposit = (total_deposit1 * Number(aptPrice) + total_deposit2 * Number(arcPrice)).toFixed(2);
    const value = Number(total_borrow) + Number(total_deposit);
    return (
        <div className="w-full flex flex-row items-center justify-center space-x-12">
            <div className="w-60 h-60 rounded-full bg-white shadow-sm flex flex-col items-center justify-center">
                <div className="mb-4 relative w-14 h-14 object-scale-down rounded-full bg-text-blur bg-opacity-25 flex flex-row items-center justify-center">
                    <img src={Bank} alt="" className="w-8" />
                </div>
                {/* <span className="text-lg font-bold">{total_deposit1} APT</span>
                <span className="text-lg font-bold">{total_deposit2} ARC</span> */}
                <span className="text-lg font-bold">$ {total_deposit}</span>
                <span className="text-base text-text-black">Total Desposited</span>
            </div>
            <div className="w-60 h-60 rounded-full bg-white shadow-sm flex flex-col items-center justify-center">
                <div className="mb-4 relative w-14 h-14 object-scale-down rounded-full bg-dark-green bg-opacity-25 flex flex-row items-center justify-center">
                    <img src={Wallet} alt="" className="w-8" />
                </div>
                {/* <span className="text-lg font-bold">{total_borrow1} APT</span>
                <span className="text-lg font-bold">{total_borrow2} ARC</span> */}
                <span className="text-lg font-bold">$ {total_borrow}</span> 
                <span className="text-base text-text-black">Total Borrowed</span>
            </div>
            <div className="w-60 h-60 rounded-full bg-white shadow-sm flex flex-col items-center justify-center">
                <div className="mb-4 relative w-14 h-14 object-scale-down rounded-full bg-green bg-opacity-25 flex flex-row items-center justify-center">
                    <img src={Piehart} alt="" className="w-8" />
                </div>
                {/* <span className="text-lg font-bold">{value1} APT</span>
                <span className="text-lg font-bold">{value2} ARC</span> */}
                <span className="text-lg font-bold">$ {value}</span>
                <span className="text-base text-text-black">Market Cap</span>
            </div>
            <div className="w-60 h-60 rounded-full bg-white shadow-sm flex flex-col items-center justify-center">
                <div className="mb-4 relative w-14 h-14 object-scale-down rounded-full bg-dark-red bg-opacity-25 flex flex-row items-center justify-center">
                    <img src={Piehart1} alt="" className="w-8" />
                </div>
                <span className="text-lg font-bold">APT = ${aptPrice}</span>
                <span className="text-lg font-bold">ARC = ${arcPrice}</span>
                <span className="text-base text-text-black">Token Price</span>
            </div>
        </div>
    )
}