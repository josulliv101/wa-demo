export default function Page({
  params: { ids },
}: {
  params: { ids?: Array<string> };
}) {
  if (!ids?.length) {
    null;
  }
  return <main>Intercept profile</main>;
}
