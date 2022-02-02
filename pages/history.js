import { Page, Card, DataTable, Layout, Stack } from "@shopify/polaris";
import React, { useEffect, useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import Subscription from "./subscription";

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

  const heading = ["保存名", "保存日時"];

  // const exports = [];
  // exportData.map((data) => exports.push([data.export_name, data.export_date]));

  const handleDeleteHistory = async (exportId) => {
    console.log(exportId);

    // authAxios
    //   .delete("/delete-history", {
    //     exportId: exportId,
    //   })
    //   .then((result) => console.log(result))
    //   .catch((error) => console.log(error.response.data));
    // const exportItemIndex = exportData.findIndex(
    //   (exportItem) => exportItem.id.valueOf() === exportId
    // );

    // return exportData.splice(exportItemIndex, 1);
  };

  const exports = exportData.map((data) => {
    return data;
  });
  return (
    <>
      <Page>
        <Subscription authAxios={authAxios} />
        <br />
        <p>
          プランに応じたエクスポート回数をオーバーしますとエクスポートが出来なくなります。
          エクスポート回数制限がリセット(毎月1日実施)されてから実行してください。
          お急ぎの方はプランのアップグレードをお勧めいたします。
        </p>
      </Page>
      <Page title="エクスポート">
        <Card>
          <Card.Section>
            <table className="export-table">
              {" "}
              <tr>
                <th>保存名</th>
                <th>保存日時</th>
              </tr>
              {exports.map((e) => (
                <tr>
                  <td>{e.export_name}</td>
                  <td>{e.export_date}</td>
                  <button className="btnGreen">編集</button>
                  {/* edit */}

                  <button
                    className="btnRed"
                    id={e.id}
                    onClick={() => handleDeleteHistory(e.id)}
                  >
                    削除
                  </button>
                  {/* delete */}

                  <button className="btnBlue">
                    <CSVLink
                      headers={heading}
                      data={exports}
                      filename="export"
                      className="linkBlue"
                    >
                      エクスポート
                    </CSVLink>
                  </button>
                  {/* export */}
                </tr>
              ))}
            </table>
          </Card.Section>
        </Card>
      </Page>
      <Page title="エクスポート履歴 / 最新 10件">
        {" "}
        {/* export history*/}
        <Card>
          <Card.Section>
            <table className="export-table">
              {" "}
              <tr>
                <th>保存名</th>
                <th>保存日時</th>
              </tr>
              {exports.map((e) => (
                <tr>
                  <td>{e.export_name}</td>
                  <td>{e.export_date}</td>
                  <button className="btnGreen">編集</button>
                  {/* edit */}

                  <button className="btnBlue">
                    <CSVLink
                      headers={heading}
                      data={exports}
                      filename="export"
                      className="linkBlue"
                    >
                      エクスポート
                    </CSVLink>
                  </button>
                  {/* export */}
                </tr>
              ))}
            </table>
          </Card.Section>
          {/* <DataTable
              columnContentTypes={contentType}
              headings={heading}
              rows={exports}
            /> */}
        </Card>
      </Page>
    </>
  );
};

export default History;
