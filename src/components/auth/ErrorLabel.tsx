interface ErrorLabelProps {
  message?: string;
}

const ErrorLabel = ({ message }: ErrorLabelProps) => {
  if (!message) return null;

  return <div className="text-sm text-destructive">{message}</div>;
};

export default ErrorLabel;
