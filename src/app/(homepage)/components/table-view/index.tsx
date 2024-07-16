import { IGetUsersResponse } from '@/services/users/types';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { Spinner } from '@nextui-org/spinner';
import PaginationControls from '@/components/pagination-controls';
import { capitalizeName } from '@/utils';

const tableColumns = [
  'NO',
  'FIRST NAME',
  'LAST NAME',
  'EMAIL',
  'PHONE NUMBER',
  'ADDRESS',
  'ZIP CODE',
];
const rowsPerPage = 5;

interface IProps {
  usersData: IGetUsersResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  onChangePage: ({ value }: { value: number }) => void;
}

export default function TableView({
  usersData,
  isLoading,
  page,
  totalPages,
  onChangePage,
}: IProps): JSX.Element {
  return (
    <Table
      className="border rounded-md border-[#272729]"
      bottomContent={
        <PaginationControls
          page={page}
          totalPages={totalPages as number}
          onChange={onChangePage}
        />
      }
    >
      <TableHeader>
        {tableColumns?.map((column, index) => {
          return <TableColumn key={index}>{column}</TableColumn>;
        })}
      </TableHeader>
      {usersData?.length > 0 ? (
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="success" label="Loading..." />}
        >
          {usersData?.map((user, index) => {
            const itemsNumbering = (page - 1) * rowsPerPage + index + 1;
            return (
              <TableRow key={user?.id}>
                <TableCell>{itemsNumbering}</TableCell>
                <TableCell>{capitalizeName(user?.name?.firstname)}</TableCell>
                <TableCell>{capitalizeName(user?.name?.lastname)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>+ {user.phone}</TableCell>
                <TableCell>
                  {capitalizeName(
                    `${user.address.street}, ${user.address.city}`
                  )}
                </TableCell>
                <TableCell>{user.address.zipcode}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      ) : (
        <TableBody emptyContent={'No data to display.'}>{[]}</TableBody>
      )}
    </Table>
  );
}
