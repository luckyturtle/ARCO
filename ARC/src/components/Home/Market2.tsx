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
        {value === index && (
          <Box sx={{ p: 2 }}>
            {
              <>
                <span className="font-bold text-base text-[#000] block mb-2">
                  Deposit Rate
                </span>
                <div className="flex flex-row items-center space-x-6">
                  <div className="flex flex-row items-center space-x-2 bg-white shadow-md p-2 rounded-md">
                    <Avatar src="https://www.gravatar.com/avatar/HASH" />
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{"2.26 %"}</span>
                      <span className="text-xs text-text-black font-medium">{`Supply apy`}</span>
                    </div>
                  </div>
                  <span>+</span>
                  <div className="flex flex-row items-center space-x-2 bg-white shadow-md p-2 rounded-md">
                    <Avatar src="https://www.gravatar.com/avatar/HASH" />
                    <div className="flex flex-col">
                      <span className="text-base font-bold">{"1.26 %"}</span>
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


                {depositOrBorrow ? (
                  <button
                    className="bg-text-blur text-white text-xs font-semibold py-2 w-full mt-4 rounded-full"
                    onClick={isApt ? () => aptosContext.Deposit1(amount * 100000000) : () => aptosContext.Deposit2(amount * 1000000)}
                  >
                    Deposit
                  </button>
                ) : (
                  <button
                    className="bg-text-blur text-white text-xs font-semibold py-2 w-full mt-4 rounded-full"
                    onClick={isApt ? () => aptosContext.Borrow1(amount * 100000000) : () => aptosContext.Borrow2(amount * 1000000)}
                  >
                    Borrow
                  </button>
                )
                }
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
    "Borrow API": Object;
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
          <span className="text-base font-semibold">{`${item.main}%`}</span>
          <span className="text-xs text-text-black font-medium">{`=${item.f}% + ${item.s}`}</span>
        </div>
      ),
    },
    {
      title: "Borrow API",
      dataIndex: "Borrow API",
      key: "Borrow API",
      render: (item: { main: any; f: any; s: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}%`}</span>
          <span className="text-xs text-text-black font-medium">{`=${item.f}% + ${item.s}`}</span>
        </div>
      ),
    },
    {
      title: "Total Deposited",
      dataIndex: "Total Deposited",
      key: "Total Deposited",
      render: (item: { main: any; sub: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}%`}</span>
          <span className="text-xs text-text-black font-medium">{`=$${item.sub}K`}</span>
        </div>
      ),
    },
    {
      title: "Available",
      dataIndex: "Available",
      key: "Available",
      render: (item: { main: any; sub: any }) => (
        <div className="flex flex-col">
          <span className="text-base font-semibold">{`${item.main}%`}</span>
          <span className="text-xs text-text-black font-medium">{`=$${item.sub}K`}</span>
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
        avatar: "https://www.gravatar.com/avatar/HASH",
        name: "APT",
        UR: "24.32",
      },
      "Deposited APY": {
        main: "4.10",
        f: "2.10",
        s: "1.99",
      },
      "Borrow API": {
        main: "4.10",
        f: "2.10",
        s: "1.99",
      },
      "Total Deposited": {
        main: total_deposit1,
        sub: "1000",
      },
      Available: {
        main: value1,
        sub: "38.3535",
      },
      Operation: {
        deposit_func: () => {
          handleClickOpen();
          setIsApt(true);
          setDepositOrBorrow(true);
          // aptosContext.Deposit1();
        },
        withdraw_func: () => {
          handleClickOpen();
          setIsApt(true);
          setDepositOrBorrow(false);
          // aptosContext.Borrow1();
        },
      },
    },
    {
      Asset: {
        avatar: "https://www.gravatar.com/avatar/HASH",
        name: "ARC",
        UR: "24.32",
      },
      "Deposited APY": {
        main: "4.10",
        f: "2.10",
        s: "1.99",
      },
      "Borrow API": {
        main: "4.10",
        f: "2.10",
        s: "1.99",
      },
      "Total Deposited": {
        main: total_deposit2,
        sub: "34.123",
      },
      Available: {
        main: value2,
        sub: "12.11",
      },
      Operation: {
        deposit_func: () => {
          // aptosContext.Deposit2();
          handleClickOpen();
          setIsApt(false);
          setDepositOrBorrow(true);
        },
        withdraw_func: () => {
          // aptosContext.Borrow2();
          handleClickOpen();
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
          <span className="text-white block text-center mb-10">APT</span>
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
            <Avatar src="https://www.gravatar.com/avatar/HASH" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
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
