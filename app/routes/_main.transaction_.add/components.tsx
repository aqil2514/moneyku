import React from "react";

interface CheckboxWithTextProps {
  isBill: boolean;
  setIsBill: React.Dispatch<React.SetStateAction<boolean>>;
}
export function CheckboxWithText({ isBill, setIsBill }: CheckboxWithTextProps) {
  console.log(isBill);
  return (
    <div className="flex items-start space-x-2">
      <input
        type="checkbox"
        id="terms1"
        onChange={() => setIsBill(!isBill)}
        className="w-4 h-4 hover:cursor-pointer"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Ada biaya?
        </label>
        <p className="text-sm text-muted-foreground">
          Misal, biaya transfer antar bank, biaya admin, dsb.
        </p>
      </div>
    </div>
  );
}
