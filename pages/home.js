import React, { useEffect, useState, useCallback } from "react";
import {
  Page,
  Card,
  Tabs,
  Button,
  DataTable,
  TextField,
} from "@shopify/polaris";

import Customers from "./customers";

const Home = ({ authAxios }) => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "customers",
      content: "Customers",
    },
    {
      id: "products",
      content: "Products",
    },
    {
      id: "orders",
      content: "Orders",
    },
  ];

  let table = "";

  if (selected === 0) {
    table = <Customers authAxios={authAxios} />;
  } else if (selected === 1) {
  } else if (selected === 2) {
  } else if (selected === 3) {
  }

  return (
    <Page title="CSV Downloader">
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {table}
        </Tabs>
      </Card>
    </Page>
  );
};

export default Home;
