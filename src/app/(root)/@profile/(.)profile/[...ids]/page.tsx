export default function Page({
  params: { ids },
}: {
  params: { ids?: Array<string> };
}) {
  if (!ids?.length) {
    null;
  }
  return <main>{JSON.stringify(ids)}</main>;
}
