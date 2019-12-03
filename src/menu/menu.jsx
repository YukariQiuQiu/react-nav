import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
const { SubMenu } = Menu;

//路由组件下传
let LinkCompent = null;

/**
 * 父级菜单生成
 * @param {点击父级打开当前当前菜单函数} showList 
 */
const menuSub = ({ id, name, child, path }, showList) => (
    <SubMenu
        key={id}
        title={<span>{name}</span>}
        onTitleClick={() => {
            if (showList) showList(id, path);
        }}
    >
        {child &&
            child.map((item, i) => {
                if (showList) { return item.child && item.child.length > 0 ? (menuSub({ ...item }, showList)) : (menuItem({ ...item })); }
                return item.child && item.child.length > 0 ? (menuSub({ ...item })) : (menuItem({ ...item }));
            })}
    </SubMenu>
);
/**
 * 
 * 子级菜单生成
 */
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
    render() {
        const { list, Link, styles, theme, mode } = this.props
        LinkCompent = Link;
        if (this.props.openArr && this.props.selectArr) {
            let { openArr, selectArr, showList } = this.props;
            return (
                <Menu
                    style={styles ? styles : {
                        width: 256,
                        height: '100vh',
                    }}
                    openKeys={openArr}
                    selectedKeys={selectArr}
                    theme={theme ? theme : 'dark'}
                    mode={mode ? mode : 'inline'}
                >
                    {list.map((elem, i) => {
                        return elem.child && elem.child.length > 0 ? menuSub({ ...elem }, showList) : menuItem({ ...elem });
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

