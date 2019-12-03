import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
// import { navConfig } from '../App.js';
const navConfig = [
  {
    name: "page1",
    path: "/page1",
    id: '1',
    child: [{ name: "page4", path: "/page4", id: '4' }, { name: "page8", path: "/page8", id: '8' }]
  },
  {
    name: "page2",
    path: "/page2",
    id: '2',
    child: [{ name: "page5", path: "/page5", id: '5', child: [{ name: "page9", path: "/page9", id: '9' }, { name: "page10", path: "/page10", id: '10' }] }, { name: "page6", path: "/page6", id: '6' }, { name: "page7", path: "/page7", id: '7' }]
  },
  {
    name: "page3",
    path: "/page3",
    id: '3'
  }
]

const { SubMenu } = Menu;

let isfind = false;
let openArr = [],
  selectArr = [];

class Nav extends React.Component {
  constructor(props) {
    super(props);
    console.log(navConfig);
    this.state = {
      openKeys: [],
      selectedKeys: [],
    };
  }

  handleClick = e => { };

  componentDidMount() { }

  UNSAFE_componentWillReceiveProps() {
    isfind = false;
    let path = this.props.history.location.pathname;
    selectArr = [];
    this.searchId({
      path,
      list: navConfig,
    });
    openArr = Array.from(new Set(openArr));
    selectArr = Array.from(new Set(selectArr));
    this.setState({
      selectedKeys: selectArr,
      openKeys: openArr,
    });
  }

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
   * 生成菜单
   */
  renderSubMenu = ({ name, path, child, id }) => {
    return (
      <SubMenu
        key={id}
        onTitleClick={() => {
          this.showList(id, path);
        }}
        title={<span>{name}</span>}
      >
        {child &&
          child.map((item, i) => {
            return item.child && item.child.length > 0 ? this.renderSubMenu(item, i) : this.renderMenuItem(item, i);
          })}
      </SubMenu>
    );
  };

  renderMenuItem = ({ name, path, id }) => {
    return (
      <Menu.Item key={id}>
        <Link to={path}>
          <span>{name}</span>
        </Link>
      </Menu.Item>
    );
  };

  render() {
    let selectedKeys = this.state.selectedKeys;
    let openKeys = this.state.openKeys;
    // console.log(this.state.selectedKeys,'-----------------lastS')
    // console.log(this.state.openKeys,'-------------------lastO')
    return (
      <Menu
        style={{
          width: 256,
          height: '100vh',
        }}
        theme="dark"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        mode="inline"
      >
        {navConfig.map((elem, i) => {
          return elem.child && elem.child.length > 0 ? this.renderSubMenu(elem, i) : this.renderMenuItem(elem, i);
        })}
      </Menu>
    );
  }
}

export default withRouter(Nav);
// export default Nav;
