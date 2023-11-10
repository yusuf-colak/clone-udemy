"use client";

import React, { useState, useEffect } from "react";
import { DataTableComps } from "./table";
import {
  Payment,
  columns,
} from "./columns";

async function fetchData(): Promise<Payment[]> {
  return [
    {
      id: 1,
      logo: "data:image/png;base64,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",
      company: "Linear",
      companyLink: "linear.app",
      status: "Customer",
      About1: "Developer Tools",
      About2: "The issue trackingtool you'll enjoy using.",
    },
    {
      id: 2,
      company: "Stripe",
      logo: "https://play-lh.googleusercontent.com/2PS6w7uBztfuMys5fgodNkTwTOE6bLVB2cJYbu5GHlARAK36FzO5bUfMDP9cEJk__cE",
      companyLink: "stripe.com",
      status: "Churned",
      About1: "Financal Tools",
      About2: "Payment processing platform for the Internet...",
    },
    {
      id: 3,
      company: "Webflow",
      logo: "https://cdn.icon-icons.com/icons2/2699/PNG/512/webflow_logo_icon_169218.png",
      companyLink: "webflow.com",
      status: "Customer",
      About1: "Web Development",
      About2: "Create a custom website + no-code website builder.",
    },
    {
      id: 4,
      company: "Intercom",
      logo: "https://cdn.icon-icons.com/icons2/2845/PNG/512/intercom_logo_icon_181366.png",
      companyLink: "intercom.com",
      status: "Customer",
      About1: "Customer Support",
      About2: "Customer messaging platform.",
    },
    {
      id: 5,
      company: "Basecamp",
      logo: "https://cdn.dribbble.com/users/2167937/screenshots/15705208/figma.png",
      companyLink: "basecamp.com",
      status: "Churned",
      About1: "Project Management",
      About2: "The all-in-one toolkit for working remotely.",
    },
    {
      id: 6,
      company: "Figma",
      logo: "https://cdn.dribbble.com/users/2167937/screenshots/15705208/figma.png",
      companyLink: "figma.com",
      status: "Customer",
      About1: "Design Tools",
      About2: "The collaborative interface design tool.",
    },
    {
      id: 7,
      company: "Framer",
      logo: "https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/n0d9usfnesuxdubkvor1",
      companyLink: "framer.com",
      status: "Churned",
      About1: "Developer Tools",
      About2: "Interactive design tool for teams.",
    },
  ];
}

export default function Datatable() {
  const [data, setData] = useState<Payment[]>([]);

  const getData = async () => {
    const result: Payment[] = await fetchData();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, []);

  return <DataTableComps columns={columns} data={data}/>;
}
