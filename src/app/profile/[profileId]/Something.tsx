import { fetchSomething } from "@/lib/firebase";

export default async function Something() {
  const foobar = await fetchSomething();
  return (
    <div className="p-4 bg-gray-100 text-muted-foreground my-4">
      here is {foobar}. {Date.now()}
    </div>
  );
}
