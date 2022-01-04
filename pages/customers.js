import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Icon,
  Page,
  Stack,
  TextField,
  RadioButton,
  Modal,
} from "@shopify/polaris";
import { CSVLink } from "react-csv";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragHandleMinor, ChevronRightMinor } from "@shopify/polaris-icons";

const Customers = ({ authAxios }) => {
  const [whenReady, setWhenReady] = useState(false);
  useEffect(() => {
    setWhenReady(true);
  }, []);

  const headings = [
    { label: "accepts_marketing", key: "accepts_marketing" },
    {
      label: "accepts_marketing_updated_at",
      key: "accepts_marketing_updated_at",
    },
    { label: "addresses", key: "addresses" },
    { label: "admin_graphql_api_id", key: "admin_graphql_api_id" },
    { label: "created_at", key: "created_at" },
    { label: "currency", key: "currency" },
    { label: "email", key: "email" },
    { label: "first_name", key: "first_name" },
    { label: "id", key: "id" },
    { label: "last_name", key: "last_name" },
    { label: "last_order_id", key: "last_order_id" },
    { label: "last_order_name", key: "last_order_name" },
    { label: "marketing_opt_in_level", key: "marketing_opt_in_level" },
    { label: "multipass_identifier", key: "multipass_identifier" },
    { label: "note", key: "note" },
    { label: "orders_count", key: "orders_count" },
    { label: "phone", key: "phone" },
    { label: "state", key: "state" },
    { label: "tags", key: "tags" },
    { label: "tax_exempt", key: "tax_exempt" },
    { label: "tax_exemptions", key: "tax_exemptions" },
    { label: "total_spent", key: "total_spent" },
    { label: "updated_at", key: "updated_at" },
    { label: "verified_email", key: "verified_email" },
  ];

  const heading = [
    "accepts_marketing",
    "accepts_marketing_updated_at",
    "addresses",
    "admin_graphql_api_id",
    "created_at",
    "currency",
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

  //states
  const [customers, setCustomers] = useState([]);
  const [filename, setFileName] = useState("");

  useEffect(() => {
    authAxios
      .get("/customers")
      .then((result) => {
        // console.log(result.data);
        setCustomers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authAxios]);

  const row = customers.map((customer) => {
    return {
      accepts_marketing: customer.accepts_marketing.toString(),
      accepts_marketing_updated_at: customer.accepts_marketing_updated_at,
      addresses: customer.addresses.map((result) => {
        let address = `${result.address1} , ${result.city} , ${result.country} , ${result.zip}`;
        return address;
      }),
      admin_graphql_api_id: customer.admin_graphql_api_id,
      created_at: customer.created_at,
      currency: customer.currency,
      email: customer.email,
      first_name: customer.first_name,
      id: customer.id,
      last_name: customer.last_name,
      last_order_id: customer.last_order_id,
      last_order_name: customer.last_order_name,
      marketing_opt_in_level: customer.marketing_opt_in_level,
      multipass_identifier: customer.multipass_identifier,
      note: customer.note,
      orders_count: customer.orders_count,
      phone: customer.phone,
      state: customer.state,
      tags: customer.tags,
      tax_exempt: customer.tax_exempt,
      tax_exemptions: customer.tax_exemptions,
      total_spent: customer.total_spent,
      updated_at: customer.updated_at,
      verified_email: customer.verified_email,
    };
  });

  // console.log(trial);
  const handleDb = () => {
    authAxios
      .post("/export-history", { export_name: filename })
      .then((result) => {
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

  let sortedRow = [];
  headerOrder.map((head) => sortedRow.push(head.key));

  const valuesOrder = row.map((member) => {
    return JSON.parse(JSON.stringify(member, sortedRow));
  });

  console.log(valuesOrder);

  const handleRename = (head, updatedValue) => {
    const elements = headerOrder.map((newArrangement) => {
      if (newArrangement.key === head.key) {
        return { ...newArrangement, label: updatedValue };
      }
      return newArrangement;
    });

    console.log(elements);
    setHeaderOrder(elements);
  };

  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);
  const btnAddEmptyColumn = (
    <button className="btnGreen" onClick={handleChange}>
      空カラムを追加
    </button>
  );

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
              {headerOrder.map((head, index) => {
                return (
                  <Draggable
                    key={head.key}
                    draggableId={head.key}
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
                        <div className="header-container">
                          <div className="header-name">
                            <Stack>
                              <Icon source={DragHandleMinor} color="base" />
                              <label>{head.key}</label>
                            </Stack>
                          </div>
                          <div className="margin-auto">
                            <Stack>
                              <Icon source={ChevronRightMinor} color="base" />
                            </Stack>
                          </div>
                          <div></div>
                          <div>
                            <TextField
                              value={head.label}
                              onChange={(e) => {
                                handleRename(head, e.target.value);
                              }}
                              autoComplete="off"
                              placeholder={head.label}
                            />
                          </div>
                        </div>
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
          headers={headerOrder}
          data={valuesOrder}
          filename={filename}
          onClick={handleDb}
          className="linkBlue"
        >
          エクスポート
        </CSVLink>
      </button>
    ) : (
      <button className="btnDisabled">エクスポート</button>
    );

  const radioButtonsAddColumn = (
    <div>
      <RadioButton
        label="商品に関する項目" //items related to products
        // checked={value === "disabled"}
        id="printHeaderLine"
        name="accounts"
        // onChange={handleChange}
      />
      <br />
      <RadioButton
        label="注文に関する項目" //items related to orders
        // checked={value === "disabled"}
        id="doNotPrintHeaderLine"
        name="accounts"
        // onChange={handleChange}
      />
      <br />
      <RadioButton
        label="会員に関する項目" //items related to members
        // checked={value === "disabled"}
        id="doNotPrintHeaderLine"
        name="accounts"
        // onChange={handleChange}
      />
      <br />
      <br />
      <p>
        各データの項目につきましては
        <span>
          <a href="">こちら</a>
        </span>
        を参照してください。
      </p>
    </div>
  );

  return (
    <>
      <Page title="カラムカスタマイズ">
        {/*column customization */}
        <Card>
          <Card.Section>
            {dragAndDrop}
            <div className="btnContainer">
              <Modal
                activator={btnAddEmptyColumn}
                open={active}
                onClose={handleChange}
                title="カラム追加" /* add column */
                primaryAction={{
                  content: "Close",
                  onAction: handleChange,
                }}
                secondaryActions={[
                  {
                    content: "戻る", //cancel
                    onAction: handleChange,
                  },
                ]}
              >
                <Modal.Section>{radioButtonsAddColumn}</Modal.Section>
              </Modal>
              {/*add empty column */}
              <button className="btnBlue">新しいカラムを追加</button>
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
