import React, { useEffect, useState, useCallback } from "react";
import {
  Page,
  Card,
  Tabs,
  Button,
  DataTable,
  TextField,
} from "@shopify/polaris";
import { CSVLink } from "react-csv";

const Customers = ({ authAxios }) => {
  //states
  const [customers, setCustomers] = useState([]);
  const [filename, setFileName] = useState("customers");

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

  //handlers
  const handleFilename = useCallback((fileName) => {
    setFileName(fileName);
  }, []);

  const handleDb = () => {
    authAxios
      .post("/export-history", { export_name: filename })
      .then((result) => {
        console.log(result);
        return result;
      });
  };

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

  return (
    <Card>
      <Card.Section>
        <TextField
          label="Change file name"
          value={filename}
          onChange={handleFilename}
          placeholder="File name"
          autoComplete="off"
        />
        <br />
        <Button>
          <CSVLink
            headers={heading}
            data={row}
            filename={filename}
            onClick={handleDb}
          >
            Download
          </CSVLink>
        </Button>
      </Card.Section>
      <Card.Section>
        <DataTable
          columnContentTypes={contentType}
          headings={heading}
          rows={row}
        />
      </Card.Section>
    </Card>
  );
};

export default Customers;
