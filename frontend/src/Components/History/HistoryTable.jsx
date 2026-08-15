import Historyrow from "./Historyrow";

const HistoryTable = ({ history }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-2xl">
      <table className="min-w-full">

        <thead className="text-white bg-green-700">
          <tr>
            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Crop
            </th>

            <th className="p-4 text-left">
              Fertilizer
            </th>

            <th className="p-4 text-left">
              Yield
            </th>

            <th className="p-4 text-left">
              Environment
            </th>

            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {history.map((record) => (
            <Historyrow
              key={record.id}
              record={record}
            />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default HistoryTable;