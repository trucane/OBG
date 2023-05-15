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

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const  SignUps: React.FC<SingupProps> = ({users}) =>  {

    console.log(users)
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
              <TableCell>{ 'Today' }</TableCell>
              <TableCell>{row.recruitedBy}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.telegram}</TableCell>
              <TableCell>{row.igeniusId}</TableCell>
              <TableCell align="right">{row.account_type}</TableCell>
              <TableCell>{row.onBoardStatus !== 8 ? 'In Progress' : "completed"}</TableCell>
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