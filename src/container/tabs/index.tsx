import './index.scss';

import classnames from 'classnames';
import { ReactElement, useCallback, useState } from 'react';

type ITabsProps = {
  children: ReactElement[],
  defaultTab?: number,
  onTabChange?: (tabIndex: number) => void,
}

interface ITabProps {
  // eslint-disable-next-line react/no-unused-prop-types
  title: string;
  // eslint-disable-next-line react/no-unused-prop-types
  icon?: string;
  children?: React.ReactNode;
}

type ITabTitleProps = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  selectedTab: number;
  className?: string;
}

const Tab: React.FC<ITabProps> = ({ children }) => {
  return <>{children}</>;
};

const Tabs = (props: ITabsProps): JSX.Element => {
  const { children, defaultTab, onTabChange } = props;
  const [selectedTab, setSelectedTab] = useState(defaultTab ?? 0);

  const TabTitle = ({
    title,
    setSelectedTab,
    index,
    selectedTab,
    className,
  }: ITabTitleProps): JSX.Element => {
    const onClick = useCallback(() => {
      if (onTabChange) { onTabChange(index); }
      setSelectedTab(index);
    }, [setSelectedTab, index]);

    const tabItemClass = classnames(
      'tab-list-item',
      { 'tab-item-active': selectedTab === index },
    );
    if (!title && !className) return <></>;
    return (
      <li onClick={onClick} className={tabItemClass} key={index}>
        {className &&
          <span className='tab-icon'>
            <i className={className} />
          </span>
        }
        <span >{title}</span>
      </li>
    );
  };
  const filteredChildren = children.filter(c => c);
  return (
    <div className='tabs-container'>
      <ul className='tab-list'>
        {filteredChildren.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            className={item.props.icon}
          />
        ))}
      </ul>
      <div className="tab-content">
        {filteredChildren[selectedTab]}
      </div>
    </div>);
};

export { Tabs, Tab };
