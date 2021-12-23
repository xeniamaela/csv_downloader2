import { Card, DataTable } from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";

const History = ({ authAxios }) => {
  //states
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    console.log("am clicked");
    authAxios.get("/get-history").then((result) => {
      console.log(result);
      setExportData(result);
    });
  }, [authAxios]);

  const contentType = ["text", "text"];
  const heading = ["export_name", "export_date"];

  //   const exports = [];
  //   exportData.map((data) => exports.push([data.export_name, data.export_date]));

  return (
    <Card title="Export history">
      <Card.Section>
        {/* <DataTable
          columnContentTypes={contentType}
          headings={heading}
          rows={exports}
        /> */}
      </Card.Section>
    </Card>
  );
};

export default History;
