import React from 'react'
import { 
    Table, 
    TableBody, 
    TableContainer,
    TableHead,
    TableRow,
    TableCell
} from '@material-ui/core'

const downloadStyle = {
    cursor: 'pointer'
}

const SimpleTable = ({ data, onClick, ...props }) => {
    return (
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d) => (
                <TableRow key={d.name}>
                  <TableCell component="th" scope="row">
                    {d.name}
                  </TableCell>
                  <TableCell style={downloadStyle} onClick={() => onClick(d.url)} align="right"><h4>Download</h4></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )} 

export default SimpleTable;