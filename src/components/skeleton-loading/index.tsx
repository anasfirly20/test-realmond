import {
  Skeleton as NextUISkeleton,
  SkeletonProps,
} from '@nextui-org/skeleton';

interface IProps extends SkeletonProps {}

export default function Skeleton({ ...props }: IProps) {
  return <NextUISkeleton {...props} />;
}
