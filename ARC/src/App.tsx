import Lend from "./page/Lend";
import Farm from "./page/Farm";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { AptosContextProvider } from '../src/context/aptosContext';

import React from "react";

export default function App() {
  return (
    <AptosContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Lend />} />
          <Route path={"/farm"} element={<Farm />} />
        </Routes>
      </BrowserRouter>
    </AptosContextProvider>
  );
}
