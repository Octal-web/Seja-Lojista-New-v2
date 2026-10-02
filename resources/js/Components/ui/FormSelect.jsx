import React from "react";
import Select from "react-select";

import { FormField } from "./FormField";

const selectClassNames = {
    control: ({ isFocused }) =>
        [
            "!min-h-[48px] md:!min-h-[52px] w-full",
            "border bg-white",
            "px-5 text-sm text-custom-gray",
            "shadow-none rounded-none",
            "outline-none ring-0",
            "transition-colors duration-200",
            isFocused ? "border-primary/60" : "border-[#D3D3D3]",
        ].join(" "),

    valueContainer: () => "p-0",
    placeholder: () => "text-[#9B9B9B]",
    singleValue: () => "text-custom-gray",
    input: () => "text-custom-gray [&_input]:ring-0",
    indicatorSeparator: () => "hidden",
    dropdownIndicator: () => "px-0 text-custom-gray",
    menu: () =>
        "z-30 mt-1 overflow-hidden border border-[#D3D3D3] bg-white shadow-md",
    menuList: () => "p-0",
    option: ({ isFocused, isSelected }) =>
        [
            "cursor-pointer px-5 py-3 text-sm text-custom-gray transition-colors",
            isSelected
                ? "bg-primary text-white"
                : isFocused
                  ? "bg-gray-100"
                  : "bg-white",
        ].join(" "),
};

export const FormSelect = ({
    id,
    name = id,
    label,
    options,
    value,
    errors,
    onChange,
    searchable = false,
    placeholder = "Selecione",
}) => {
    const selectedOption =
        options.find((option) => option.value === value) ?? null;

    return (
        <FormField id={id} name={name} label={label} errors={errors}>
            <div data-lenis-prevent>
                <Select
                    inputId={id}
                    instanceId={id}
                    name={name}
                    aria-required="true"
                    aria-invalid={Boolean(errors?.[name])}
                    aria-describedby={errors?.[name] ? `${id}-error` : undefined}
                    options={options}
                    value={selectedOption}
                    onChange={(option) => onChange(name, option)}
                    placeholder={placeholder}
                    classNames={selectClassNames}
                    unstyled
                    isSearchable={searchable}
                />
            </div>
        </FormField>
    );
};
