import Card from "../common/Card";

const SettingsCard = ({ children, className = "" }) => {
  return <Card className={`pb-6 space-y-5 ${className}`}>{children}</Card>;
};

export default SettingsCard;
