import Form from "@/components/app/Form";
import TextField from "@/components/ui/TextField";

export default function HomePage() {
  return (
    <main className="p-6 text-center h-full">
      <div className="grid grid-cols-[1.5fr_1fr] gap-2 h-full">
        <Form />
        <div>
          <TextField />
        </div>
      </div>
    </main>
  );
}
