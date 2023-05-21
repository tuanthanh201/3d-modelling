import { DecalType } from '../config/constants';

import { CustomButton } from '.';

interface FilePickerProps {
  file: any;
  setFile: (file: any) => void;
  readFile: (type: DecalType) => void;
}

const FilePicker = ({ file, readFile, setFile }: FilePickerProps) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files![0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' || !file ? 'No file selected' : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile('logo')}
          customStyle="text-xs"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile('full')}
          customStyle="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
