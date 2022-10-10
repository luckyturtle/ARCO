import { Table, Avatar, Divider } from "antd";
import React from "react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@mui/material/Tab";
import { Box, Tabs } from "@mui/material";

import Arco from '../../asset/icons/Arco.png';
import Aptos from '../../asset/icons/Aptos.png';
import type { ColumnsType } from "antd/es/table";
import { useContext } from "react";
import { AptosContext } from "../../context/aptosContext";

export default function Market() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [depositOrBorrow, setDepositOrBorrow] = useState(true);
  const [isApt, setIsApt] = useState(true);

  const aptosContext = useContext(AptosContext)!;
  // const total_borrow1 = Number(aptosContext?.total_borrow1) / 100000000;
  // const total_borrow2 = Number(aptosContext?.total_borrow2) / 1000000;
  const total_deposit1 = Number(aptosContext?.total_deposit1) / 100000000;
  const total_deposit2 = Number(aptosContext?.total_deposit2) / 1000000;
  const value1 = Number(aptosContext?.value1) / 100000000;
  const value2 = Number(aptosContext?.value2) / 1000000;


  const aptPrice = aptosContext?.aptPrice;
  const arcPrice = aptosContext?.arcPrice;
  const borrow = Number(aptosContext?.borrow_amount) * Number(aptPrice) / 100000000;
  const lend = Number(aptosContext?.lend_amount) * Number(aptPrice) / 100000000;

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === 0 && (
          <Box sx={{ p: 2 }}>
            {
              <>
                <span className="font-bold text-base text-[#000] block mb-2">
                  Deposit Rate
                </span>
                <div className="flex flex-row items-center space-x-6">
                  <div className="flex flex-row items-center space-x-2 bg-white shadow-md p-2 rounded-md">
                    <Avatar src={isApt ? Aptos : Arco} />
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{"8%"}</span>
                      <span className="text-xs text-text-black font-medium">{`Supply apy`}</span>
                    </div>
                  </div>
                  <span>+</span>
                  <div className="flex flex-row items-center space-x-2 bg-white shadow-md p-2 rounded-md">
                    <Avatar src={isApt ? Aptos : Arco} />
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{"3 %"}</span>
                      <span className="text-xs text-text-black font-medium">{`Mining apy`}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-base text-[#000] block mt-4 mb-2">
                  Borrow Limit
                </span>
                <div className="flex flex-row items-center justify-between">
                  <span className="text-sm text-text-black">Borrow Limit</span>
                  <span className="text-sm text-text-black">Borrow Rate</span>
                </div>
                <Divider />
                <div className="flex flex-row items-center justify-between">
                  <span className="text-sm text-text-black">0 $</span>
                  <span className="text-sm text-text-black">0 %</span>
                </div>
                <button
                  className="bg-text-blur text-white text-xs font-semibold py-2 w-full mt-4 rounded-full"
                  onClick={() => {
                    isApt ? aptosContext.Deposit1(amount * 100000000) : aptosContext.Deposit2(amount * 100000000);
                    setOpen(false);
                  }
                  }
                >
                  Deposit
                </button>
              </>
            }
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ p: 2 }}>
            {
              <>
                <span className="font-bold text-base text-[#000] block mb-2">
                  Deposit Rate
                </span>
                <div className="flex flex-row items-center space-x-6">
                  <div className="flex flex-row items-center space-x-2 bg-white shadow-md p-2 rounded-md">
                    <Avatar src={isApt ? Aptos : Arco} />
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{"8%"}</span>
                      <span className="text-xs text-text-black font-medium">{`Supply apy`}</span>
                    </div>
                  </div>
                  <span>+</span>
                  <div className="flex flex-row items-center space-x-2 bg-white shadow-md p-2 rounded-md">
                    <Avatar src={isApt ? Aptos : Arco} />
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{"3 %"}</span>
                      <span className="text-xs text-text-black font-medium">{`Mining apy`}</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-base text-[#000] block mt-4 mb-2">
                  Borrow Limit
                </span>
                <div className="flex flex-row items-center justify-between">
                  <span className="text-sm text-text-black">Borrow Limit</span>
                  <span className="text-sm text-text-black">Borrow Rate</span>
                </div>
                <Divider />
                <div className="flex flex-row items-center justify-between">
                  <span className="text-sm text-text-black">0 $</span>
                  <span className="text-sm text-text-black">0 %</span>
                </div>
                <button
                  className="bg-text-blur text-white text-xs font-semibold py-2 w-full mt-4 rounded-full"
                  onClick={() => {
                    isApt ? aptosContext.Borrow1(amount * 100000000) : aptosContext.Borrow2(amount * 100000000);
                    setOpen(false);
                  }
                  }
                >
                  Borrow
                </button>
              </>
            }
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  interface DataType {
    Asset: Object;
    "Deposited APY": Object;
    "Borrow APY": Object;
    "Total Deposited": Object;
    Available: Object;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Asset",
      dataIndex: "Asset",
      key: "Asset",
      render: (item: {
        avatar:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal
        | null
        | undefined;
        name:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal
        | null
        | undefined;
        UR: any;
      }) => (
        <div className="flex w-full flex-row items-center space-x-4">
          <Avatar src={item.avatar} />
          <div className="flex flex-col">
            <span className="text-base font-bold">{item.name}</span>
            <span className="text-xs text-text-black font-medium">{`UR:${item.UR}%`}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Deposited APY",
      dataIndex: "Deposited APY",
      key: "Deposited APY",
      render: (item: { main: any; f: any; s: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}`}</span>
          <span className="text-xs text-text-black font-medium">{`=(${item.f} + ${item.s})%`}</span>
        </div>
      ),
    },
    {
      title: "Borrow APY",
      dataIndex: "Borrow APY",
      key: "Borrow APY",
      render: (item: { main: any; f: any; s: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}`}</span>
          <span className="text-xs text-text-black font-medium">{`=(${item.f} - ${item.s})%`}</span>
        </div>
      ),
    },
    {
      title: "Total Deposited",
      dataIndex: "Total Deposited",
      key: "Total Deposited",
      render: (item: { main: any; sub: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}`}</span>
          <span className="text-xs text-text-black font-medium">{`=$${item.sub}`}</span>
        </div>
      ),
    },
    {
      title: "Available",
      dataIndex: "Available",
      key: "Available",
      render: (item: { main: any; sub: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}`}</span>
          <span className="text-xs text-text-black font-medium">{`=$${item.sub}`}</span>
        </div>
      ),
    },
    {
      title: "Operation",
      dataIndex: "Operation",
      key: "Operation",
      render: (item: { deposit_func: any; withdraw_func: any }) => (
        <div className="flex flex-row items-center space-x-2">
          <button
            onClick={item.deposit_func}
            className="bg-text-blur text-white text-xs font-semibold py-2 w-16 rounded-full"
          >
            Deposit
          </button>
          <button
            onClick={item.withdraw_func}
            className="bg-text-blur bg-opacity-25 text-text-blur text-xs font-semibold py-2 w-16 rounded-full"
          >
            Borrow
          </button>
        </div>
      ),
      align: "center",
    },
  ];
  const Data = [
    {
      Asset: {
        avatar: Aptos,
        name: "APT",
        UR: "24.32",
      },
      "Deposited APY": {
        main: "11",
        f: "8",
        s: "3",
      },
      "Borrow APY": {
        main: "5",
        f: "8",
        s: "3",
      },
      "Total Deposited": {
        main: lend / Number(aptPrice),
        sub: lend,
      },
      Available: {
        main: ((lend * 0.8 - borrow) / Number(aptPrice)).toFixed(2),
        sub: (lend * 0.8 - borrow).toFixed(2),
      },
      Operation: {
        deposit_func: () => {
          handleClickOpen();
          setValue(0);
          setIsApt(true);
          setDepositOrBorrow(true);
          // aptosContext.Deposit1();
        },
        withdraw_func: () => {
          handleClickOpen();
          setValue(1);
          setIsApt(true);
          setDepositOrBorrow(false);
          // aptosContext.Borrow1();
        },
      },
    },
    {
      Asset: {
        avatar: Arco,
        name: "ARC",
        UR: "24.32",
      },
      "Deposited APY": {
        main: "11",
        f: "8",
        s: "3",
      },
      "Borrow APY": {
        main: "5",
        f: "8",
        s: "3",
      },
      "Total Deposited": {
        main: total_deposit2 / 100,
        sub: total_deposit2 / 100,
      },
      Available: {
        main: total_deposit2 * 0.8 / 100,
        sub: total_deposit2 * 0.8 / 100,
      },
      Operation: {
        deposit_func: () => {
          // aptosContext.Deposit2();
          handleClickOpen();
          setValue(0);
          setIsApt(false);
          setDepositOrBorrow(true);
        },
        withdraw_func: () => {
          // aptosContext.Borrow2();
          handleClickOpen();
          setValue(1);
          setIsApt(false);
          setDepositOrBorrow(false);
        },
      },
    },
  ];

  return (
    <div className="w-full">
      <span className="text-lg font-bold mb-10 w-full">Market</span>
      <div className="w-full rounded-md shadow-sm mt-6 flex flex-row items-center justify-center overflow-hidden">
        <Table
          columns={columns}
          dataSource={Data}
          style={{ width: "100%" }}
          pagination={false}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="bg-text-blur">
          <span className="text-white block text-center mb-10">{isApt ? 'APT' : 'ARC'}</span>
          {/* <TextField
            placeholder="Balance 0.000 BNB"
            variant="outlined"
            margin="none"
            size="small"
            InputProps={{
              startAdornment: (
                <Avatar
                  src="https://www.gravatar.com/avatar/HASH"
                  className="mr-6"
                />
              ),
            }}
            fullWidth
            className="text-white active:text-white active:border-white outline-white active:outline-white"
          /> */}
          <div className="border-2 border-solid border-white rounded-md flex flex-row items-center justify-center space-x-2 px-2 py-1">
            <Avatar src={isApt ? Aptos : Arco} />
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="outline-none border-none text-white bg-[#0000] flex-1 text-base"
              placeholder="APT Amount"
            />
          </div>
        </DialogTitle>
        <DialogContent className="bg-background">
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className="flex flex-row items-center"
                >
                  <Tab label="Deposit" {...a11yProps(0)} />
                  <Tab label="Borrow" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}></TabPanel>
              <TabPanel value={value} index={1}></TabPanel>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
