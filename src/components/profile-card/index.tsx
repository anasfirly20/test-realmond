import Image from 'next/image';
import emptyProfilePic from '../../../public/image/profile_pic.webp';
import Link from 'next/link';
import { capitalizeName } from '@/utils';
import { IGetUsersResponse } from '@/services/users/types';

interface IProps {
  data: IGetUsersResponse;
}

export default function CardProfile({ data }: IProps): JSX.Element {
  return (
    <div className="relative border border-[#272729] rounded-md px-4 py-5 overflow-hidden lg:hover:scale-105 transition-transform duration-150 bg-[#232527]">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center rounded-full size-28 bg-blue-300 z-10 p-5 relative overflow-hidden">
          <Image
            alt="empty profile picture"
            src={emptyProfilePic}
            layout="fill"
          />
        </div>
        <div className="flex flex-col items-center py-3 gap-2">
          <h1 className="text-xl font-medium">
            {capitalizeName(`${data?.name?.firstname} ${data?.name?.lastname}`)}
          </h1>
          <p className="text-sm text-[#929192]">
            {capitalizeName(`${data?.address?.street}, ${data?.address?.city}`)}
          </p>
        </div>
        <hr className="w-full" />
        <div className="flex flex-col justify-between items-center pt-3">
          <p>{data?.email}</p>
          <Link
            href={`/${data?.id}`}
            className="rounded-md border border-[#929192] bg-[#253851] px-16 py-2 hover:opacity-80 mt-5"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
