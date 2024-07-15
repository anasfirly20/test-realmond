'use client';

import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/react';
import { useHomePage } from './functions';
import CardProfile from '@/components/profile-card';
import PaginationControls from '@/components/pagination-controls';

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
  const { page, totalPages, handleChangePage, usersData, setSearchString } =
    useHomePage();

  return (
    <section className="flex flex-col justify-center gap-5 max-sm:pb-normal">
      <Input
        placeholder="Search User..."
        isClearable
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Select
        items={viewOptions}
        aria-label="View mode"
        placeholder="Select view"
        defaultSelectedKeys={'1'}
        className="self-end w-[15%]"
      >
        {(option) => <SelectItem key={option.id}>{option.label}</SelectItem>}
      </Select>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {usersData.length ? (
          usersData?.map((person) => {
            return (
              <CardProfile
                key={person.id}
                name={`${person.name.firstname} ${person.name.lastname}`}
                email={person.email}
                phone={person.phone}
              />
            );
          })
        ) : (
          <h1>NO DATA</h1>
        )}
      </section>
      <PaginationControls
        page={page}
        totalPages={totalPages as number}
        onChange={handleChangePage}
      />
    </section>
  );
}
