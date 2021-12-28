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
import HeaderRename from "./header_rename";

const Index = ({ authAxios }) => {
  const [mainTabSelected, setMainTabSelected] = useState(0);

  const handleMainTabChange = useCallback(
    (mainTabSelectedIndex) => setMainTabSelected(mainTabSelectedIndex),
    []
  );

  const mainTabs = [
    {
      id: "home",
      content: "ホーム",
    },
    {
      id: "set-by-the-owner",
      content: "依賴主設定(佐票)",
    },
    {
      id: "header-rename",
      content: "ヘッダー名変更",
    },
    {
      id: "plan-information",
      content: "プラン情報",
    },
  ];

  let mainTabsContent = "";
  if (mainTabSelected === 0) {
    mainTabsContent = <Home authAxios={authAxios} />;
  } else if (mainTabSelected === 1) {
  } else if (mainTabSelected === 2) {
    mainTabsContent = <HeaderRename authAxios={authAxios} />;
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
      <Page>
        <br />
        <hr />
        <br />
        <div>
          <p>アプリに関するご質問・ご要望は下記までご連絡ください。</p>
          <p>サポートセンター:app-support@gf-e.co.jp</p>
        </div>
        <br />
        <br />
      </Page>
    </>
  );
};

export default Index;
