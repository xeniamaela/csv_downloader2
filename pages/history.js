import { Page, Card, DataTable, Layout, Stack } from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";

const History = ({ authAxios }) => {
  //states
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    console.log("am clicked");
    authAxios.get("/get-history").then((result) => {
      console.log(result.data.body);
      setExportData(result.data.body);
    });
  }, [authAxios]);

  const contentType = ["text", "text"];
  const heading = ["保存名", "保存日時"];

  const exports = [];
  exportData.map((data) => exports.push([data.export_name, data.export_date]));

  return (
    <>
      <Page>
        <Card>
          <Card.Section>
            <Stack>
              <Stack.Item>現在の登録プラン</Stack.Item> {/* current plan*/}
              <Stack.Item>スタンダードプラン</Stack.Item> {/* standard plan*/}
            </Stack>
          </Card.Section>
          <Card.Section>
            <Stack>
              <Stack.Item>エクスポート回数制限</Stack.Item>
              <Stack.Item>10回/50回</Stack.Item>
            </Stack>
            <br />
            <p>毎月1日にダウンロード回数はリセットされます。</p>
          </Card.Section>
        </Card>
        <br />
        <p>
          プランに応じたエクスポート回数をオーバーしますとエクスポートが出来なくなります。
          エクスポート回数制限がリセット(毎月1日実施)されてから実行してください。
          お急ぎの方はプランのアップグレードをお勧めいたします。
        </p>
      </Page>
      <Page title="エクスポート履歴 / 最新 10件">
        {" "}
        {/* export history*/}
        <Card>
          <Card.Section>
            <DataTable
              columnContentTypes={contentType}
              headings={heading}
              rows={exports}
            />
          </Card.Section>
        </Card>
      </Page>
    </>
  );
};

export default History;
