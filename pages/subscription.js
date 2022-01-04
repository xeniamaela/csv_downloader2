import { Card, Stack } from "@shopify/polaris";
import React, { useState, useEffect } from "react";

const Subscription = ({ authAxios }) => {
  useEffect(() => {
    authAxios.get("/all-subscription").then((result) => {
      const subscription = result.data.body.recurring_application_charges;
      const length = result.data.body.recurring_application_charges.length;
      console.log(subscription);
      console.log(length);
    });
  }, [authAxios]);
  return (
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
  );
};

export default Subscription;
