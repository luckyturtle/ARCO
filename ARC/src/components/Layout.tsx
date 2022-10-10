import Dashbord from "../asset/icons/dashboard.svg";
import Pickaxe from "../asset/icons/pickaxe.svg";
import Alter from "../asset/icons/alter.svg";
import Document from "../asset/icons/document.svg";
import Doc from "../asset/icons/book-of-black-cover-closed.svg";
import Logo from "../asset/icons/Logo.png";
import Martian from "../asset/icons/Martian.jpg";
import Petra from "../asset/icons/Petra.jpg";
import Arco from '../asset/icons/Arco.png';
import Aptos from '../asset/icons/Aptos.png';
import moment from 'moment';

import { useNavigate, useLocation } from "react-router-dom";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import React, { useEffect, useState } from "react";

import { Types, AptosClient } from "aptos";
import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Avatar } from "antd";

import { useContext } from "react";
import { AptosContext } from "../context/aptosContext";


export default function Layout(props: {
  children:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const aptosContext = useContext(AptosContext);

  const address = aptosContext?.address;
  const handlePetraDisconnect = aptosContext?.handleDisconnect;
  const handlePetraConnect = aptosContext?.handleConnect;
  const last_interact_time = moment.unix(parseInt(aptosContext?.last_interact_time ?? '0' ));
  const current_time = moment()
  const interval = current_time.diff(last_interact_time,'minutes');
  const isConnected = aptosContext?.isConnected;
  const apt_balance = aptosContext?.apt_balance || "0";
  const claim_amount = Number(aptosContext?.lend_amount) * 150 * interval;

  const [open, setOpen] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Claim = () => {
    aptosContext?.Claim();
    setOpen(false);
  }
  
  const handleClickOpenWallet = () => {
    setOpenWallet(true);
  };
  const handleCloseWallet = () => {
    setOpenWallet(false);
  };
  const handleConnect = () => {
    handlePetraConnect();
    handleCloseWallet();
  }

  return (
    <div className="w-full min-h-screen h-full bg-background flex flex-row items-center justify-center bg-opacity-20">
      <Dialog
        open={openWallet}
        onClose={handleCloseWallet}
        fullWidth={true}
        maxWidth={"xs"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-text-blur py-4 space-y-4"
        >
          <span className="font-bold text-xl text-white">Connect a Wallet</span>
        </DialogTitle>
        <DialogContent className="bg-background">
          <div className="flex flex-col space-y-2 py-2 items-center justify-center">
            {!window.aptos ? (
              <a
                href="https://chrome.google.com/webstore/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci"
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
              >
                <span className="font-semibold text-base">Petra</span>
                <img
                  src={Petra}
                  alt=""
                  className="w-6 h-6 rounded object-scale-down"
                />
              </a>
            ) : (
              <div
                className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
                onClick={handleConnect}
              >
                <span className="font-semibold text-base">Petra</span>
                <img
                  src={Petra}
                  alt=""
                  className="w-6 h-6 rounded object-scale-down"
                />
              </div>
            )}
            <a
              href="https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk"
              target="_blank"
              rel="noreferrer"
              className="flex flex-row items-center justify-between bg-white p-2 rounded w-full"
            >
              <span className="font-semibold text-base">Martian</span>
              <img
                src={Martian}
                alt=""
                className="w-6 h-6 rounded object-scale-down"
              />
            </a>
            <span>Need to Help to connect Wallet ?</span>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"xs"}
        aria-labelledby="alert-dialog-title"  
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="bg-text-blur py-4 space-y-4"
        >
          <span className="text-white block text-center">Lend Mining</span>
          <Avatar
            src={Arco}
            size="large"
            className="block m-auto"
          />
        </DialogTitle>
        <DialogContent className="bg-background">
          <div className="p-4 space-y-4 flex flex-col items-center justify-center">
            <span className="py-2 font-medium text-base">
              Deposits and borrow will be automatically mined, and the display
              of mining rewards will be delayed, subject to the Claim amount.
            </span>
            <div className="flex flex-row items-center justify-between px-4 py-2 rounded-full bg-white bg-opacity-80 w-full font-bold">
              <span>Waiting Claim</span>
              <span>{Number(claim_amount)/10000000000} ARC</span>
            </div>
            <div className="flex flex-row items-center justify-between px-4 py-2 rounded-full bg-white bg-opacity-80 w-full font-bold">
              <span>Wallet Balance</span>
              <span>{Number(apt_balance)/100000000} ARC</span>
            </div>
            <button
              className="bg-text-blur text-white w-full rounded-full py-2"
              onClick={Claim}
            >
              Claim
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="w-64 border-r-2 border-solid border-divider min-h-screen h-full">
        <div className="flex flex-row space-x-4 items-center justify-center mt-4 pr-6">
          <img
            src={Logo}
            alt=""
            className="w-40 rounded-md object-scale-down"
          />
        </div>
        <div className="w-full flex flex-col items-start space-y-3 mt-10 px-2">
          <div
            className={`flex flex-row p-2 rounded-md ${location.pathname === "/" ? "bg-text-blur bg-opacity-20" : ""
              } space-x-2 w-full cursor-pointer`}
            onClick={() => navigate("/")}
          >
            <img src={Dashbord} alt="" />
            <span
              className={`${location.pathname === "/" ? "text-text-blur" : "text-text-black"
                } text-base`}
            >
              Lend
            </span>
          </div>
          <div
            className={`flex flex-row p-2 rounded-md ${location.pathname === "/farm" ? "bg-text-blur bg-opacity-20" : ""
              } space-x-2 w-full cursor-pointer`}
            onClick={() => navigate("/farm")}
          >
            <img src={Pickaxe} alt="" />
            <span
              className={`${location.pathname === "/farm"
                ? "text-text-blur"
                : "text-text-black"
                }`}
            >
              Farm
            </span>
          </div>
          <div className="flex flex-row p-2 rounded-md space-x-2 w-full cursor-pointer">
            <img src={Alter} alt="" />
            <span className="text-text-black text-base">Swap</span>
          </div>
          <div className="flex flex-row p-2 rounded-md space-x-2 w-full cursor-pointer">
            <img src={Document} alt="" />
            <span className="text-text-black text-base">Govern</span>
          </div>
          <a
            href="https://arcoprotocol.gitbook.io/arcogitbook/"
            target="_"
            className="flex flex-row p-2 rounded-md space-x-2 w-full cursor-pointer"
          >
            <img src={Doc} alt="" />
            <span className="text-text-black text-base">Docs</span>
          </a>
        </div>
      </div>
      <div className="flex-1 h-screen overflow-y-auto rel">
        <div className="w-[calc(100%-256px)] bg-[#f8f9fb] z-50 px-10 py-4 border-b-2 border-solid border-divider flex flex-row items-center justify-between space-x-4 fixed top-0 right-0">
          <span className="text-base font-bold flex-1">
            {location.pathname === "/" ? "Lend" : "Farm"}
          </span>
          <img
            src={Pickaxe}
            alt=""
            onClick={handleClickOpen}
            className="w-8 h-8 rounded-full bg-white p-2 shadow-lg cursor-pointer"
          />
          <div className="h-full bg-text-blur bg-opacity-20 rounded-full p-2 space-x-4">
            <span className="text-base font-semibold ml-2">Aptos</span>
            {!isConnected ? (
              <button
                className="px-4 bg-white rounded-full py-1"
                onClick={handleClickOpenWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                className="px-4 bg-white rounded-full py-1"
                onClick={handlePetraDisconnect}
              >
                {address?.slice(0, 4) + "..." + address?.slice(-4)}
              </button>
            )}
          </div>
        </div>
        <div className="w-full px-10 py-4 mt-36">{props.children}</div>
      </div>
    </div>
  );
}
