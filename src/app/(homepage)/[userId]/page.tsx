'use client';

import Image from 'next/image';
import { capitalizeName } from '@/utils';
import { Icon } from '@iconify/react';
import ErrorComponent from '@/components/error-component';
import { useUserDetailPage } from './functions';
import Skeleton from '@/components/skeleton-loading';

export default function UserDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  const { query } = useUserDetailPage({
    userId: params.userId,
  });

  const { data: userData, isLoading, isError } = query;

  if (isError) return <ErrorComponent retry />;

  return (
    <section className="w-full lg:w-[50%]">
      <div className="border border-[#272729] rounded-md p-5 space-y-5">
        <div className="flex items-center gap-5">
          {isLoading ? (
            <Skeleton className="rounded-full size-20" />
          ) : (
            <div className="flex justify-center items-center rounded-full size-20 bg-blue-300 z-10 p-5 relative overflow-hidden">
              <Image
                alt="empty profile picture"
                src="/image/profile_pic.webp"
                layout="fill"
              />
            </div>
          )}
          <div>
            {isLoading ? (
              <Skeleton className="rounded-lg" />
            ) : (
              <h1 className="text-xl">
                {capitalizeName(
                  `${userData?.data?.name?.firstname} ${userData?.data?.name?.lastname}`
                )}
              </h1>
            )}
            {isLoading ? (
              <Skeleton className="rounded-lg" />
            ) : (
              <p className="text-sm text-[#929192]">{userData?.data?.email}</p>
            )}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon icon="ion:home-outline" className="text-xl" />
            {isLoading ? (
              <Skeleton className="rounded-lg w-full sm:w-1/3 h-5" />
            ) : (
              <p>
                Lives in{' '}
                {capitalizeName(
                  `${userData?.data?.address?.street}, ${userData?.data?.address?.city}`
                )}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Icon icon="solar:phone-outline" className="text-xl" />
            {isLoading ? (
              <Skeleton className="rounded-lg w-full sm:w-1/3 h-5" />
            ) : (
              <p>{`${
                userData?.data?.phone ? `+ ${userData?.data?.phone}` : ''
              }`}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
