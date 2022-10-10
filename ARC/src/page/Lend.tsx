import Layout from "../components/Layout"

import Header from "../components/Home/Header";
import Overview from "../components/Home/Overview";
import Bills from "../components/Home/Bills";
import Market from "../components/Home/Market";
import React from "react";

export default function Lend() {
    return (
        <Layout>
            <div className="w-full flex flex-col items-center justify-center space-y-20">
                <Header />
                <Overview />
                <Bills />
                <Market />
            </div>
        </Layout>
    )
}