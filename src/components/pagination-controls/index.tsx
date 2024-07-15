import { Pagination } from '@nextui-org/pagination';

interface IProps {
  page: number;
  totalPages: number;
  onChange: ({ value }: { value: number }) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  onChange,
}: IProps) {
  return (
    <Pagination
      showControls
      showShadow
      loop
      page={page}
      initialPage={1}
      total={totalPages}
      onChange={(value) => onChange({ value })}
      className='flex justify-center'
    />
  );
}
