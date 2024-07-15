'use client';

import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/react';
import { useHomePage } from './functions';

const viewOptions = [
  {
    id: 1,
    label: 'Card',
  },
  {
    id: 2,
    label: 'Table',
  },
];

export default function Home() {
  const { query } = useHomePage();

  const { data, isLoading, isError } = query;

  console.log(
    'DATA',
    data?.data.map((user) => user.address)
  );

  return (
    <section className="flex flex-col justify-center gap-5 max-sm:pb-normal">
      <Input
        placeholder="Search User..."
        isClearable
        // onChange={(e) => setSearchString(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     handleSearch();
        //   }
        // }}
      />
        <Select
          items={viewOptions}
          aria-label="View mode"
          placeholder="Select view"
          defaultSelectedKeys={'1'}
          className='self-end w-[15%]'
        >
          {(option) => <SelectItem key={option.id}>{option.label}</SelectItem>}
        </Select>
    </section>
  );
}
