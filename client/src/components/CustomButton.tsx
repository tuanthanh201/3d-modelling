import { useSnapshot } from 'valtio';

import state from '../store';

interface CustomButtonProps {
  type: string;
  title: string;
  handleClick: () => void;
  customStyle: string;
}

const CustomButton = ({
  title,
  type,
  handleClick,
  customStyle,
}: CustomButtonProps) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: '#fff',
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
