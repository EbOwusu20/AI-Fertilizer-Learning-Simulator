import Select from "../common/Select";

const PreferenceSelect = ({
    label,
    options,
    value,
    onChange,
}) => {
    return (
        <div className="py-2">
            <Select
                label={label}
                options={options}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default PreferenceSelect;