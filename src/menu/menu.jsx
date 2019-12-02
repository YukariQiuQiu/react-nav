import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
const { SubMenu } = Menu;

let LinkCompent = null;

const menuSub = ({ id, name, child,path },showList) => (
    <SubMenu
        key={id}
        title={<span>{name}</span>}
        onTitleClick={() => {
            if(showList) showList(id, path);
        }}
    >
        {child &&
            child.map((item, i) => {
                return item.child && item.child.length > 0 ? (menuSub({ ...item })) : (menuItem({ ...item }));
            })}
    </SubMenu>
);

const menuItem = ({ id, name, path }) => {
    return (LinkCompent ? (<Menu.Item key={id}>
        <LinkCompent to={path}>
            <span>{name}</span>
        </LinkCompent>
    </Menu.Item>) : (<Menu.Item key={id}>
        <span>{name}</span>
    </Menu.Item>));
}

export default class NavMenu extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const { list, Link } = this.props
        LinkCompent = Link;
        console.log(this.props)
        if(this.props.openArr && this.props.selectArr){
            let{openArr,selectArr,showList} = this.props;
            return (
                <Menu
                    style={{
                        width: 256,
                        height: '100vh',
                    }}
                    openKeys={openArr}
                    selectedKeys={selectArr}
                    theme="dark"
                    mode="inline"
                >
                    {list.map((elem, i) => {
                        return elem.child && elem.child.length > 0 ? menuSub({ ...elem },showList) : menuItem({ ...elem });
                    })}
                </Menu>
            );
        };
        return (
            <Menu
                style={{
                    width: 256,
                    height: '100vh',
                }}
                theme="dark"
                mode="inline"
            >
                {list.map((elem, i) => {
                    return elem.child && elem.child.length > 0 ? menuSub({ ...elem }) : menuItem({ ...elem });
                })}
            </Menu>
        );
    };
}

