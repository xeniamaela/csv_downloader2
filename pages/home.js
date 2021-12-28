import React, { useEffect, useState, useCallback } from "react";
import {
  Page,
  Card,
  Tabs,
  Layout,
  RadioButton,
  Button,
  DataTable,
  TextField,
  Stack,
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
      id: "shipping-order",
      content: "配送/注文",
    },
    {
      id: "product",
      content: "商品",
    },
    {
      id: "member-customer",
      content: "会員",
    },
    {
      id: "financial-report",
      content: "財務レポート",
    },
  ];

  let table = "";

  if (selected === 0) {
  } else if (selected === 1) {
  } else if (selected === 2) {
    table = <Customers authAxios={authAxios} />;
  } else if (selected === 3) {
  }

  const radioButtons = (
    <Layout>
      <Layout.Section>
        <Card>
          <Card.Section>
            <h1>フォーマット選択</h1>
            <div>
              <RadioButton
                label="佐川急便 - e飛伝II"
                // checked={value === "disabled"}
                id="disabled"
                name="accounts"
                // onChange={handleChange}
              />
            </div>
            <div>
              <RadioButton
                label="佐川急便 - e飛伝III"
                // checked={value === "disabled"}
                id="disabled"
                name="accounts"
                // onChange={handleChange}
              />
            </div>
            <div>
              <RadioButton
                label="ヤマト B2 運輸 - クラウド"
                // checked={value === "disabled"}
                id="disabled"
                name="accounts"
                // onChange={handleChange}
              />
            </div>
            <div>
              <RadioButton
                label="日本郵政 - ゆうパックプリントR"
                // checked={value === "disabled"}
                id="disabled"
                name="accounts"
                // onChange={handleChange}
              />
            </div>
            <div>
              <RadioButton
                label="フォーマット未選択"
                // checked={value === "disabled"}
                id="disabled"
                name="accounts"
                // onChange={handleChange}
              />
            </div>
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  );

  return (
    //format selection
    <>
      <Page title="フォーマット選択">
        <Card>
          <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            className="main-tabs"
          >
            {radioButtons}
          </Tabs>
        </Card>
        <br />
        <p>
          フォーマットを変更すると下の「カラムカスタマイズ」の項目が変わります。
        </p>
        <p>
          カラムの内容を編集されていた場合、元に戻すことは出来ませんのでご注意ください。
        </p>
      </Page>
      {table}
    </>
  );
};

export default Home;
