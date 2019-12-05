import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
const { SubMenu } = Menu;

/**
 * 菜单渲染
 */
const renderMenu = ({ list, Link, showList }) => {
    return (list.map((elem) => {
        if (!elem.child) {
            return (
                <Menu.Item key={elem.id}>
                    {
                        Link ? (
                            <Link to={elem.path}>
                                <span>{elem.name}</span>
                            </Link>
                        ) : (
                                <span>{elem.name}</span>
                            )
                    }

                </Menu.Item>
            )
        } else {
            return (
                <SubMenu
                    key={elem.id}
                    title={<span>{elem.name}</span>}
                    onTitleClick={() => {
                        console.log(123)
                        if (showList) showList(elem.id, elem.path);
                    }}
                >
                    {renderMenu({ list: elem.child, Link, showList })}
                </SubMenu>
            )
        }
    })
    );

};

export default class NavMenu extends React.Component {
    render() {
        const { list, styles, theme, mode, Link, showList, openArr, selectArr } = this.props
        let propsList = {
            style: styles ? styles : {
                width: 256,
                height: '100vh',
            },
            theme:theme ? theme : 'dark',
            mode:mode ? mode : 'inline'
        };
        if(Link) {
            propsList.openKeys = openArr;
            propsList.selectedKeys = selectArr;
        }
        return (
            <Menu {...propsList}>
                {renderMenu({ list, Link, showList })}
            </Menu>
        )
    };
}

