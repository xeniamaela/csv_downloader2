import React, { useEffect, useState, useCallback } from "react";
import { Card, Page, Stack, TextField, RadioButton } from "@shopify/polaris";
import { CSVLink } from "react-csv";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Customers = ({ authAxios }) => {
  const [whenReady, setWhenReady] = useState(false);
  useEffect(() => {
    setWhenReady(true);
  }, []);

  const heading = [
    "accepts_marketing",
    "accepts_marketing_updated_at",
    "addresses",
    "admin_graphql_api_id",
    "created_at",
    "email",
    "first_name",
    "id",
    "last_name",
    "last_order_id",
    "last_order_name",
    "marketing_opt_in_level",
    "multipass_identifier",
    "note",
    "orders_count",
    "phone",
    "state",
    "tags",
    "tax_exempt",
    "tax_exemptions",
    "total_spent",
    "updated_at",
    "verified_email",
  ];

  const headings = [
    { id: "item-1", content: "accepts_marketing" },
    { id: "item-2", content: "accepts_marketing_updated_at" },
    { id: "item-3", content: "addresses" },
    { id: "item-4", content: "admin_graphql_api_id" },
    { id: "item-5", content: "created_at" },
    { id: "item-6", content: "email" },
    { id: "item-7", content: "first_name" },
    { id: "item-8", content: "id" },
    { id: "item-9", content: "last_name" },
    { id: "item-10", content: "last_order_id" },
    { id: "item-11", content: "last_order_name" },
    { id: "item-12", content: "marketing_opt_in_level" },
    { id: "item-13", content: "multipass_identifier" },
    { id: "item-14", content: "note" },
    { id: "item-15", content: "orders_count" },
    { id: "item-16", content: "phone" },
    { id: "item-17", content: "state" },
    { id: "item-18", content: "tags" },
    { id: "item-19", content: "tax_exempt" },
    { id: "item-20", content: "tax_exemptions" },
    { id: "item-21", content: "total_spent" },
    { id: "item-22", content: "updated_at" },
    { id: "item-23", content: "verified_email" },
  ];

  //states
  const [customers, setCustomers] = useState([]);
  const [filename, setFileName] = useState("");

  useEffect(() => {
    authAxios
      .get("/customers")
      .then((result) => {
        console.log(result.data);
        setCustomers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authAxios]);

  const contentType = [
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
    "text",
  ];

  const row = [];
  customers.map((customer) => {
    row.push([
      customer.accepts_marketing.toString(),
      customer.accepts_marketing_updated_at,
      customer.addresses.join(),
      customer.admin_graphql_api_id,
      customer.created_at,
      customer.currency,
      customer.email,
      customer.first_name,
      customer.id,
      customer.last_name,
      customer.last_order_id,
      customer.last_order_name,
      customer.marketing_opt_in_level,
      customer.multipass_identifier,
      customer.note,
      customer.orders_count,
      customer.phone,
      customer.state,
      customer.tags,
      customer.tax_exempt,
      customer.tax_exemptions.join(),
      customer.total_spent,
      customer.updated_at,
      customer.verified_email.toString(),
    ]);
  });

  //handlers

  const handleDb = () => {
    authAxios
      .post("/export-history", { export_name: filename })
      .then((result) => {
        console.log(result);
        return result;
      });
  };

  const handleFilename = useCallback((fileName) => {
    setFileName(fileName);
  }, []);

  const [headerOrder, setHeaderOrder] = useState(headings);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(headerOrder);
    let [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setHeaderOrder(items);
  };

  const dragAndDrop = whenReady ? (
    <div className="dndContainer">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="headerOrder" className="draggable-container">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="draggable-list"
            >
              {headerOrder.map(({ id, content }, index) => {
                return (
                  <Draggable
                    key={id}
                    draggableId={id}
                    index={index}
                    ref={provided.innerRef}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="draggable-items"
                      >
                        <p>{content}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  ) : null;

  const csv_download_button =
    filename !== "" ? (
      <button className="btnBlue">
        <CSVLink
          headers={heading}
          data={row}
          filename={filename}
          onClick={handleDb}
          className="btnBlue"
        >
          エクスポート
        </CSVLink>
      </button>
    ) : (
      <button className="btnBlue" disabled>
        エクスポート
      </button>
    );

  return (
    <>
      <Page title="カラムカスタマイズ">
        {/*column customization */}
        <Card>
          <Card.Section>
            {dragAndDrop}
            <div className="btnContainer">
              <button class="btnGreen">空カラムを追加</button>
              {/*add empty column */}
              <button class="btnBlue">新しいカラムを追加</button>
              {/*add new column */}
            </div>
          </Card.Section>
        </Card>
      </Page>
      <Page title="オプション">
        <Card>
          <Card.Section>
            <Stack>
              <Stack.Item>ファイル名</Stack.Item>
              <TextField
                value={filename}
                onChange={handleFilename}
                placeholder="export_YYMMDD"
                autoComplete="off"
              />
            </Stack>
            <Stack>
              <Stack.Item>ヘッダー行</Stack.Item>
              <Stack.Item>
                <RadioButton
                  label="ヘッダー行を出力する"
                  // checked={value === "disabled"}
                  id="printHeaderLine"
                  name="accounts"
                  // onChange={handleChange}
                />
                <br />
                <RadioButton
                  label="ヘッダー行を出力しない"
                  // checked={value === "disabled"}
                  id="doNotPrintHeaderLine"
                  name="accounts"
                  // onChange={handleChange}
                />
              </Stack.Item>
            </Stack>
          </Card.Section>
        </Card>
        <div className="btnContainer">
          <button className="btnGreen">この内容を保存</button>{" "}
          {/*save this content */}
          {csv_download_button}
          {/* export */}
        </div>
      </Page>
    </>
  );
};

export default Customers;
{
  /* <TextField
          label="Change file name"
          value={filename}
          onChange={handleFilename}
          placeholder="File name"
          autoComplete="off"
        />
        <br />
         */
}
