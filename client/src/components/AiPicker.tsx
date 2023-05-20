import { DecalType } from '../config/constants';

interface AiPickerProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  generatingImg: boolean;
  handleSubmit: (type: DecalType) => Promise<void>;
}

const AiPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}: AiPickerProps) => {
  return <h1>Ai Picker</h1>;
};

export default AiPicker;
