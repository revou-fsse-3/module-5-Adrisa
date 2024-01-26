interface ButtonProps {
  name: string;
  label: string;
  onClick: () => void;
}

const Button = ({ onClick, label, name }: ButtonProps) => {
  return (
    <button
      name={`${name}`}
      onClick={onClick}
      className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
    >
      {label}
    </button>
  );
};

export default Button;
