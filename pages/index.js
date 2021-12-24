import React, { useEffect, useState, useCallback } from "react";
import {
  Page,
  Card,
  Tabs,
  Button,
  DataTable,
  TextField,
} from "@shopify/polaris";

import Home from "./home";
import History from "./history";

const Index = ({ authAxios }) => {
  const [mainTabSelected, setMainTabSelected] = useState(0);

  const handleMainTabChange = useCallback(
    (mainTabSelectedIndex) => setMainTabSelected(mainTabSelectedIndex),
    []
  );

  const mainTabs = [
    {
      id: "home",
      content: "Home",
    },
    {
      id: "settings",
      content: "Settings",
    },
    {
      id: "header-rename",
      content: "Header Rename",
    },
    {
      id: "history",
      content: "History",
    },
  ];

  let mainTabsContent = "";
  if (mainTabSelected === 0) {
    mainTabsContent = <Home authAxios={authAxios} />;
  } else if (mainTabSelected === 1) {
  } else if (mainTabSelected === 2) {
  } else if (mainTabSelected === 3) {
    mainTabsContent = <History authAxios={authAxios} />;
  }

  return (
    <>
      <Tabs
        tabs={mainTabs}
        selected={mainTabSelected}
        onSelect={handleMainTabChange}
      ></Tabs>
      {mainTabsContent}
    </>
  );
};

export default Index;
