import { ai, fileIcon, logoShirt, stylishShirt, swatch } from '../assets';

export type ActiveEditorTab = 'colorpicker' | 'filepicker' | 'aipicker' | '';

export type DecalType = 'logo' | 'full';
export type DecalFilterTab = 'logoShirt' | 'stylishShirt';

interface Logo {
  stateProperty: 'logoDecal';
  filterTab: 'logoShirt';
}

interface Full {
  stateProperty: 'fullDecal';
  filterTab: 'stylishShirt';
}

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

export interface FilterTab {
  name: DecalFilterTab;
  icon: string;
}

export const FilterTabs: FilterTab[] = [
  {
    name: 'logoShirt',
    icon: logoShirt,
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
  },
];

export const DecalTypes: {
  logo: Logo;
  full: Full;
} = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
