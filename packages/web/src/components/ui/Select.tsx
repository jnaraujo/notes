import clsx from "clsx";
import { CheckIcon, ChevronDown } from "lucide-react";
import * as SelectComp from "@radix-ui/react-select";
import { forwardRef } from "react";

interface Props {
  onChange?: (value: string) => void;
  items?: string[];
  defaultValue?: string;
  placeholder?: string;
}

export default function Select({
  items,
  onChange,
  defaultValue,
  placeholder,
}: Props) {
  return (
    <SelectComp.Root onValueChange={onChange} defaultValue={defaultValue}>
      <SelectComp.Trigger
        className={clsx(
          "flex h-10 cursor-pointer items-center justify-center gap-1 rounded-md border border-zinc-400 bg-transparent px-3 py-1 text-zinc-300 hover:border-zinc-300"
        )}
        aria-label="Food"
      >
        <SelectComp.Value placeholder={placeholder} />
        <SelectComp.Icon>
          <ChevronDown size={24} />
        </SelectComp.Icon>
      </SelectComp.Trigger>
      <SelectComp.Portal>
        <SelectComp.Content
          className="rounded-md bg-zinc-50 shadow-md"
          position="popper"
        >
          <SelectComp.Viewport className="min-w-[6rem] p-2">
            <SelectComp.Group>
              {items?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectComp.Group>
          </SelectComp.Viewport>
        </SelectComp.Content>
      </SelectComp.Portal>
    </SelectComp.Root>
  );
}

const SelectItem = forwardRef<
  any,
  {
    value: string;
    children: React.ReactNode;
  }
>(({ children, value }, forwardedRef) => {
  return (
    <SelectComp.Item
      className={
        "flex cursor-pointer items-center rounded-md px-6 py-1 text-zinc-600 outline-none hover:bg-zinc-100"
      }
      value={value}
      ref={forwardedRef}
    >
      <SelectComp.ItemIndicator className="absolute left-2">
        <CheckIcon size={16} />
      </SelectComp.ItemIndicator>
      <SelectComp.ItemText>{children}</SelectComp.ItemText>
    </SelectComp.Item>
  );
});
