import { Page, Card, DataTable } from "@shopify/polaris";
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
  const heading = ["Export Name", "Export Date"];

  const exports = [];
  exportData.map((data) => exports.push([data.export_name, data.export_date]));

  return (
    <Page title="Export History">
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
  );
};

export default History;
