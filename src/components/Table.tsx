import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import { BasicTableProps, IPv4 } from '../types/typesIP';
import fillTables from '../services/fillTables';

export default function BasicTable({ip, totalSubnets}: BasicTableProps) {

  const rows = fillTables(ip as IPv4, totalSubnets)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>Network IP</TableCell>
            <TableCell>Start IP</TableCell>
            <TableCell>End IP</TableCell>
            <TableCell>Broadcast IP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.ips[0]}</TableCell>
              <TableCell>{row.ips[1]}</TableCell>
              <TableCell>{row.ips[2]}</TableCell>
              <TableCell>{row.ips[3]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
