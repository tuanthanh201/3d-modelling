interface TabProps {
  tab: any;
  handleClick: () => void;
  isFilterTab?: boolean;
  isActiveTab?: string;
}

const Tab = ({}: TabProps) => {
  return <h1>Tab</h1>;
};

export default Tab;
