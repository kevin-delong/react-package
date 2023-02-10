import './index.scss';
import classnames from 'classnames';
import { useCallback, useState } from 'react';
const Tab = ({ children }) => {
    return <>{children}</>;
};
const Tabs = (props) => {
    const { children, defaultTab, onTabChange } = props;
    const [selectedTab, setSelectedTab] = useState(defaultTab ?? 0);
    const TabTitle = ({ title, setSelectedTab, index, selectedTab, className, }) => {
        const onClick = useCallback(() => {
            if (onTabChange) {
                onTabChange(index);
            }
            setSelectedTab(index);
        }, [setSelectedTab, index]);
        const tabItemClass = classnames('tab-list-item', { 'tab-item-active': selectedTab === index });
        if (!title && !className)
            return <></>;
        return (<li onClick={onClick} className={tabItemClass} key={index}>
        {className &&
                <span className='tab-icon'>
            <i className={className}/>
          </span>}
        <span>{title}</span>
      </li>);
    };
    const filteredChildren = children.filter(c => c);
    return (<div className='tabs-container'>
      <ul className='tab-list'>
        {filteredChildren.map((item, index) => (<TabTitle key={index} title={item.props.title} index={index} setSelectedTab={setSelectedTab} selectedTab={selectedTab} className={item.props.icon}/>))}
      </ul>
      <div className="tab-content">
        {filteredChildren[selectedTab]}
      </div>
    </div>);
};
export { Tabs, Tab };
