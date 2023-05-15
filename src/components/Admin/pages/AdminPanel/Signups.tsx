import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Title } from '../../../../Title';
import { User } from '../../../../utils/Auth/AuthContext';

interface SingupProps{
    users: Array<User>
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}
export const  SignUps: React.FC<SingupProps> = ({users}) =>  {

  return (
    <React.Fragment>
      <Title>Recent SignUps</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Recruited By</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Telegram</TableCell>
            <TableCell>Igenius Id #</TableCell>
            <TableCell>Account Type</TableCell>
            <TableCell>Onboard Status</TableCell>
            <TableCell>Admin Onboarding</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {users.map((row, indx) => (
                <TableRow key={indx}>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>{row.recruitedBy}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.telegram}</TableCell>
                    <TableCell>{row.igeniusId}</TableCell>
                    <TableCell align="right">{row.account_type}</TableCell>
                    <TableCell sx={{color: row.onBoardStatus !== 8 ? 'red' : 'green', fontWeight:"bold"}}>{row.onBoardStatus !== 8 ? 'In Progress' : "completed"}</TableCell>
                    <TableCell>{row.onBoardStatus !== 8 ? 'Pending' : "In Progress"}</TableCell>
                </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}