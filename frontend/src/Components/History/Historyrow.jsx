import Button from "./../common/Button";
import { useNavigate } from "react-router-dom";

const Historyrow = ({ record }) => {
    const navigate = useNavigate();

    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="p-4">
                {new Date(record.date).toLocaleDateString()}
            </td>

            <td className="p-4">
                {record.crop}
            </td>

            <td className="p-4">
                {record.fertilizer}
            </td>

            <td className="p-4">
                {record.yield}
            </td>

            <td className="p-4">
                {record.environmental_score}
            </td>

            <td className="p-4">
                <Button
                    onClick={() =>
                        // navigate(`/history/${record.id}`)
                        navigate(`/simulation/${record.id}`)
                    }
                >
                    View
                </Button>
            </td>
        </tr>
    );
};

export default Historyrow;