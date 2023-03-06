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
  account_id: number,
  account_name: string,
  account_type: 'individual' | 'business',
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
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} className='table-row'>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? '^' : '+'}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" className='table-cell'>
            {row.account_id}
          </TableCell>
          <TableCell component="th" scope="row" align='right' className='table-cell'>
            {row.account_name}
          </TableCell>
          <TableCell className='table-cell'>{row.account_type}</TableCell>
          <TableCell className='table-cell'>{row.total_lifetime}</TableCell>
          <TableCell className='table-cell'>{row.total_ytd}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell>{historyRow.amount}</TableCell>
                        <TableCell>
                          {Math.round(historyRow.amount * row.total_ytd * 100) / 100}
                        </TableCell>
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
    createData(32, "Mykael Barnes", 'business', 100, 100)
  ];
  
  export default function CollapsibleTable() {
    return (
      <TableContainer className="table-container">
        <Table aria-label="collapsible table" className='table'>
          <TableHead className='table-head'>
            <TableRow className='table-row'>
              {/* <TableCell /> */}
              <TableCell className='table-cell'>Account ID</TableCell>
              <TableCell className='table-cell'>Account Name</TableCell>
              <TableCell className='table-cell'>Type</TableCell>
              <TableCell className='table-cell'>Total_Lifetime</TableCell>
              <TableCell className='table-cell'>Total_YtD</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <Row key={rows[0].account_name} row={rows[0]} />
          </TableBody>
        </Table>
      </TableContainer>
    );
  }