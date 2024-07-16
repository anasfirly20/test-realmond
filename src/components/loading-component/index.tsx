import { Spinner } from '@nextui-org/spinner';

export default function LoadingComponent(): JSX.Element {
  return (
    <section className="h-[70vh] flex justify-center items-center">
      <Spinner size="lg" label="Loading..." />
    </section>
  );
}
