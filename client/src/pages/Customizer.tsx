import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from '../components';
import {
  ActiveEditorTab,
  DecalFilterTab,
  DecalType,
  DecalTypes,
  EditorTabs,
  FilterTabs,
} from '../config/constants';
import { reader } from '../config/helpers';
import { fadeAnimation, slideAnimation } from '../config/motion';
import state from '../store';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState();

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState<ActiveEditorTab>('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
    case 'colorpicker':
      return <ColorPicker />;
    case 'filepicker':
      return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
    case 'aipicker':
      return <AiPicker />;
    default:
      return null;
    }
  };

  const handleActiveFilterTab = (tab: DecalFilterTab) => {
    console.log(tab);
    switch (tab) {
    case 'logoShirt':
      state.isLogoTexture = !activeFilterTab[tab];
      break;
    case 'stylishShirt':
      state.isFullTexture = !activeFilterTab[tab];
      break;
    default:
      state.isLogoTexture = true;
      state.isFullTexture = false;
    }
    console.log(state);

    setActiveFilterTab((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const handleDecals = (type: DecalType, result: string) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type: DecalType) => {
    reader(file!).then((result) => {
      handleDecals(type, result as string);
      setActiveEditorTab('');
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
