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
        console.log(this.props)
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
                    // openArr = Array.from(new Set(openArr))
                }
                isfind = true;
            } else if (elem.child) {
                // console.log(elem)
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
        return (<Menu {...this.props} showList={this.showList} searchId={this.searchId} Link={Link} openArr={openArr} selectArr={selectArr}></Menu>)
    }
}

export default withRouter(MenuRoute);