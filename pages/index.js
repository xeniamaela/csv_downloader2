import React ,{useEffect, useState, useCallback} from 'react';
import { Page, Card, Tabs, Button, DataTable, TextField } from "@shopify/polaris";
import { CSVLink, CSVDownload } from "react-csv";

const Index = ({authAxios}) => {

  const [mainTabSelect, setMainTabSelect] = useState(0)
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

  const handleMainTabChange = useCallback(
    (selectedTabIndex) => setMainTabSelect(selectedTabIndex),
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

  const home = (
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
        <Button primary>
          <CSVDownload
            headers={heading}
            data={row}
            filename={filename}
            target="_blank"
          />
        </Button>
      </Card.Section>
      {table}
    </Tabs>
  )

  const mainTabs = [
    {
      id: 'home',
      content:  'Home',
    },
    {
      id: 'settings',
      content: 'Settings',
    },
    {
      id: 'header-rename',
      content: 'Header Rename',
    },
    {
      id: 'about',
      content: 'About',
    },
  ]

  const tabs = [
    {
      id: 'customers',
      content:  'Customers',
    },
    {
      id: 'products',
      content: 'Products',
    },
    {
      id: 'orders',
      content: 'Orders',
    },
    {
      id: 'financial-report',
      content: 'Financial Report',
    },
  ];

  let table = ""

  if ( selected === 0) {
    table = customerTable;
  } else if (selected === 1) {

  } else if (selected === 2) {
     
  } 

  let mainContents = ""

  if ( mainTabSelect === 0) {
    mainContents = home;
  } else if (mainTabSelect === 1) {

  } else if (mainTabSelect === 2) {
     
  } 

  return(
    <>
    <Tabs tabs={mainTabs} selected={mainTabSelect} onSelect={handleMainTabChange}></Tabs>
    <Page
    title="Options"
    >
      <Card>
        {mainContents}
      </Card>
    </Page>
    </>
  )
};

export default Index;
