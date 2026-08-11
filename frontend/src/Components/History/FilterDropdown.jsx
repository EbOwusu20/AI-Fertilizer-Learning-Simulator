import Select from '../common/Select'

const FilterDropdown = ({ value, onChange }) => {
    return (
        <div>
            <Select
                value={value}
                onChange={onChange}
                className='rounded-xl border p-3'>

                <option value='All'>All</option>
                <option value='Cassava'>Cassava</option>
                <option value='Tomato'>Tomato</option>
                <option value='Rice'>Rice</option>

            </Select>

        </div>
    )
}

export default FilterDropdown
