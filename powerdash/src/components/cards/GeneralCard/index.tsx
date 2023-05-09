import cn from "~/utils/classNames";

interface GeneralCardProps {
  children: React.ReactNode;
  className?: string;
}

const GeneralCard = ({ children, className }: GeneralCardProps) => {
  return (
    <div
      className={cn(
        `flex flex-col overflow-hidden rounded-lg shadow`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GeneralCard;
