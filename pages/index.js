import React ,{useEffect, useState, useCallback} from 'react';
import { Page, Card, Tabs, Button, DataTable, TextField } from "@shopify/polaris";
import { CSVLink } from "react-csv";

const Index = ({authAxios}) => {

  const [selected, setSelected] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [filename, setFileName] = useState('');

  useEffect(() => {

    authAxios.get('/customers')
    .then(result => {
      // console.log(result)
      setCustomers(result.data)
    }).catch(error => { console.log(error)})

  }, [authAxios])

  const handleFilename = useCallback((fileName) => setFileName(fileName), []);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const heading = [
    "id",
    "email",
    "first_name",
    "last_name",
    "created_at",
    "updated_at",
    "orders_count","state",
    "total_spent",
    "phone",
    "currency",
    "accepts_marketing_updated_at",
    "marketing_opt_in_level",
    "admin_graphql_api_id"
  ]

  const contentType = [
    'text', 'text', 'text', 'text', 'text','text'
  ]

  const row = customers.map(customer => {
    return [
    customer.id.toString(),
    customer.email,
    customer.first_name,
    customer.last_name,
    customer.created_at,
    customer.updated_at,
    customer.orders_count,
    customer.state,
    customer.total_spent,
    customer.phone,
    customer.currency,
    customer.accepts_marketing_updated_at,
    customer.marketing_opt_in_level,
    customer.admin_graphql_api_id
    ]
  })

  const customerTable = (
    <Card.Section>
            <DataTable
                columnContentTypes={contentType}
                headings={heading}
                rows={row}
            />
          </Card.Section>
  )

  const tabs = [
    {
      id: 'accepts-marketing-1',
      content:  'Customers',
    },
    {
      id: 'repeat-customers-1',
      content: 'Products',
    },
    {
      id: 'prospects-1',
      content: 'Orders',
    },
  ];

  let table = ""
  
  if ( selected === 0) {
    table = customerTable;
  } else if (selected === 1) {

  } else if (selected === 2) {
     
  } 

  return(
    <>
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}></Tabs>
    <Page
    title="Options"
    >
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            <TextField
              label="Change file name"
              value={filename}
              onChange={handleFilename}
              placeholder="File name"
              autoComplete="off"
            />
            <br/>
            <Button>
              <CSVLink
                headers={heading}
                data={row}
                filename={filename}
              >Download me</CSVLink>
            </Button>
          </Card.Section>
          {table}
        </Tabs>
      </Card>
    </Page>
    </>
  )
};

export default Index;
