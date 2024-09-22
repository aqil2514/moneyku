import { Button } from "components/ui/button";
import { icons } from "lib/default-general/icons";
import { useIconPicker } from "./logics";
import React, { SetStateAction } from "react";

export default function IconPicker({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}) {
  const { value: selected, clickHandler } = useIconPicker(value, setValue);
  return (
    <div className="grid grid-cols-5 gap-4">
      {icons.map((icon) => (
        <Button
          key={icon.name}
          variant={"secondary"}
          data-iconName={icon.name}
          className={`flex flex-col gap-2 items-center content-center border rounded-md py-8 max-w-40 duration-75 ${
            selected === icon.name
              ? "border-blue-500 text-blue-500 cursor-default"
              : "hover:text-blue-500 hover:border-blue-500"
          }`}
          type="button"
          onClick={clickHandler}
        >
          <div className="duration-200">{icon.icon}</div>
          <p className="duration-200">{icon.name}</p>
        </Button>
      ))}
    </div>
  );
}
