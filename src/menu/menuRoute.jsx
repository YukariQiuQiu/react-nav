import React from 'react';
import Menu from './menu.jsx'
import { Link, withRouter } from 'react-router-dom';

let isfind = false;
let openArr = [],
    selectArr = [];



class MenuRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            selectedKeys: [],
        };
    };

    UNSAFE_componentWillReceiveProps() {
        isfind = false;
        let path = this.props.history.location.pathname;
        selectArr = [];
        this.searchId({
            path,
            list: this.props.list,
        });
        openArr = Array.from(new Set(openArr));
        selectArr = Array.from(new Set(selectArr));
        this.setState({
            selectedKeys: selectArr,
            openKeys: openArr,
        });
    }
    /**
     * 控制菜单父级菜单打开
     */
    showList = (key, path) => {
        let arr = JSON.parse(JSON.stringify(this.state.openKeys));
        if (arr.indexOf(key) !== -1) {
            let newSelect = [];
            if (arr.length > 1)
                newSelect = arr.filter(elem => {
                    return elem !== key;
                });
            openArr = JSON.parse(JSON.stringify(newSelect));
            setTimeout(() => {
                this.setState({
                    openKeys: newSelect,
                });
            }, 100);
        } else {
            this.props.history.push(path);
        }
    };
    /**
     * 定位菜单配置中id方法以及父级id集合
     */
    searchId = ({ path, list }) => {
        list.forEach(elem => {
            if (isfind) {
                return;
            }
            if (elem.path === path) {
                if (!elem.child) {
                    selectArr.push(elem.id);
                } else {
                    openArr.push(elem.id);
                }
                isfind = true;
            } else if (elem.child) {
                openArr.push(elem.id);
                this.searchId({
                    path,
                    list: elem.child,
                });
            }
        });
        if (!isfind) openArr.pop();
    };

    render() {
        return (
            <Menu {...{ 
                ...this.props, 
                Link, 
                openArr, 
                selectArr, 
                showList: this.showList, 
            }}
            ></Menu>
        )
    }
}

export default withRouter(MenuRoute);