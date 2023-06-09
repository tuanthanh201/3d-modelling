import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { download } from '../assets';
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
import { downloadCanvasToImage } from '../config/helpers';
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
      return (
        <AiPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return null;
    }
  };

  const handleSubmit = async (type: DecalType) => {
    if (!prompt) {
      return alert('Please enter a prompt!');
    }

    try {
      setGeneratingImg(true);
      const res = await fetch('https://3d-shirt-modelling.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      handleDecals(type, `data:image/png;base64,${data.image}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  };

  const handleActiveFilterTab = (tab: DecalFilterTab) => {
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
            <Tab
              key="download"
              tab={{
                name: 'download',
                icon: download,
              }}
              handleClick={() => downloadCanvasToImage()}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
