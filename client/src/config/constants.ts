import { ai, fileIcon, logoShirt, stylishShirt, swatch } from '../assets';

export type ActiveEditorTab = 'colorpicker' | 'filepicker' | 'aipicker' | '';

export interface EditorTab {
  name: ActiveEditorTab;
  icon: string;
}

export const EditorTabs: EditorTab[] = [
  {
    name: 'colorpicker',
    icon: swatch,
  },
  {
    name: 'filepicker',
    icon: fileIcon,
  },
  {
    name: 'aipicker',
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: logoShirt,
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
