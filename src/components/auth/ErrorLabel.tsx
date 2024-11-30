interface ErrorLabelProps {
  message?: string;
}

const ErrorLabel = ({ message }: ErrorLabelProps) => {
  if (!message) return null;

  return <div className="py-2 text-sm text-destructive">{message}</div>;
};

export default ErrorLabel;
