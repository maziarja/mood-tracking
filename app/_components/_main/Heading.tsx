import { format } from "date-fns";

async function Heading({ name }: { name: string }) {
  const today = format(new Date(Date.now()), "cccc, PPP");

  return (
    <div className="flex flex-col items-center gap-4 md:gap-[10px]">
      <h1 className="md:text-preset-3 text-2xl leading-[130%] font-bold tracking-[-0.3px] text-blue-600">
        Hello, {name ? name.slice(0, 1).toUpperCase() + name.slice(1) : ""}
      </h1>
      <p className="text-preset-1-m md:text-preset-1 text-center text-neutral-900">
        How are you feeling today?
      </p>
      <p className="text-preset-6 text-neutral-600">{today}</p>
    </div>
  );
}

export default Heading;
