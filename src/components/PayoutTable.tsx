import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function createData(
  account_id: string,
  account_name: string,
  account_type: 'Individual' | 'Business',
  total_lifetime: number,
  total_ytd: number,

  ) {
    return {
      account_id,
      account_name,
      account_type,
      total_lifetime,
      total_ytd,
      history: [
        {
          date: '2020-01-05',
          status: 'Pending',
          event_id: '123abc',
          amount: 300.00.toFixed(2),
          initator: 'Mykael',
          invoice_url: "http://localhost:3000",
          line_items: [
            {
            item_name: 'item_name_1',
            item_rate: 'item_rate_1',
            item_quantity: 'item_quantity_1'
            }
          ]
        },
        {
          date: '2020-01-02',
          status: 'Pending',
          event_id: '123abc',
          amount: 100.00.toFixed(2),
          initator: 'Mykael',
          invoice_url: "http://localhost:3000",
          line_items: [
            {
            item_name: 'item_name_2',
            item_rate: 'item_rate_2',
            item_quantity: 'item_quantity_2'
            }
          ]
        },
      ],
    };
  }
  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [openPaymentHistory, setOpenPaymentHistory] = React.useState(false);
    const [openLineItems, setOpenLineItems] = React.useState(false)
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className='table-row'>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenPaymentHistory(!openPaymentHistory)}
            >
              {openPaymentHistory ? '-' : '+'}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" className='table-cell'>
            {row.account_id}
          </TableCell>
          <TableCell component="th" scope="row" className='table-cell'>
            {row.account_name}
          </TableCell>
          <TableCell className='table-cell'>{row.account_type}</TableCell>
          <TableCell className='table-cell'>{row.total_lifetime}</TableCell>
          <TableCell className='table-cell'>{row.total_ytd}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openPaymentHistory} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Payout History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Event_ID</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Initiator</TableCell>
                      <TableCell>Invoice_URL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date} className='history-row' onClick={() => setOpenLineItems(!openLineItems)}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.status}</TableCell>
                        <TableCell>{historyRow.event_id}</TableCell>
                        <TableCell>${historyRow.amount}</TableCell>
                        <TableCell>{historyRow.initator}</TableCell>
                        <TableCell>{historyRow.invoice_url}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  const rows = [
    createData('acct_1MgEqPE1KDoxGYPc', "Mykael Barnes", 'Business', 100, 100)
  ];
  
  export default function CollapsibleTable() {
    return (
      <TableContainer className="table-container">
        <Table aria-label="collapsible table" className='table'>
          <TableHead className='table-head'>
            <TableRow>
              <TableCell />
              <TableCell className='table-cell head-cell'>Account ID</TableCell>
              <TableCell className='table-cell head-cell'>Account Name</TableCell>
              <TableCell className='table-cell head-cell'>Type</TableCell>
              <TableCell className='table-cell head-cell'>Total_Lifetime</TableCell>
              <TableCell className='table-cell head-cell'>Total_YtD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
              <Row key={rows[0].account_name} row={rows[0]}/>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }