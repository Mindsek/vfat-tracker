import { FormAddresses } from "@/components/shared/form/FormAddresses";
import { ViewCardPositions } from "@/components/shared/ViewCardPositions";

export default function Home() {
  return (
    <main className="flex flex-col items-center h-full min-h-[calc(100vh-5rem)] py-4 gap-16">
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-4xl font-bold">DeFi Yield Tracker</h1>
        <FormAddresses />
      </div>
      <ViewCardPositions />
    </main>
  );
}
