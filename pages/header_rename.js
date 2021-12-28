import { Page, Card, Tabs, Layout, Stack } from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";

const HeaderRename = ({ authAxios }) => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "items-related-to-products",
      content: "商品に関する項目",
    },
    {
      id: "items-related-to-orders",
      content: "注文に関する項目",
    },
    {
      id: "items-related-to-members",
      content: "会員に関する項目",
    },
  ];

  let table = "";

  if (selected === 0) {
  } else if (selected === 1) {
  } else if (selected === 2) {
  } else if (selected === 3) {
  }
  return (
    <Page title="ヘッダー名変更">
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
      </Card>
    </Page>
  );
};

export default HeaderRename;
