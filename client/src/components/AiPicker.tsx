import { DecalType } from '../config/constants';

import { CustomButton } from '.';

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
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking AI..."
            customStyle="text-xs"
            disabled
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
            />
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AiPicker;
