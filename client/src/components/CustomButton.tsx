import { useSnapshot } from 'valtio';

import { getContrastingColor } from '../config/helpers';
import state from '../store';

interface CustomButtonProps {
  type: 'outline' | 'filled';
  title: string;
  handleClick?: () => void;
  customStyle?: string;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  type,
  handleClick,
  customStyle,
  disabled,
}: CustomButtonProps) => {
  const snap = useSnapshot(state);

  const generateStyle = (type: string) => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}
      style={generateStyle(type)}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default CustomButton;
