import DashboardLayout from '../Components/layout/DashboardLayout'
import HistoryTable from '../Components/History/HistoryTable'
import { useState, useEffect } from 'react'
import Searchbar from '../Components/History/Searchbar'
import FilterDropdown from '../Components/History/FilterDropdown'
import mockHistory from '../data/mockHistory'

const History = () => {

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredHistory = mockHistory.filter((record) => {
    const matchesSearch = record.crop.
      toLowerCase().includes(search.toLowerCase()) ||
      record.fertilizer.
        toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === "All" ||
      record.crop === filter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Simulation History
        </h1>

        <p className="text-gray-500">
          View all previous fertilizer simulations.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1">
          <Searchbar
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <FilterDropdown
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        />

      </div>

      <HistoryTable
        history={filteredHistory}
      />

    </div>

    )
}

export default History
