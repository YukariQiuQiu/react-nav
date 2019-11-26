import React from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { Link,withRouter } from "react-router-dom";

const { SubMenu } = Menu;

class Nav extends React.Component {
  
  handleClick = e => {
    // console.log("click ", e);
  };

  componentDidMount(){
    console.log(this.props)
  }

  shouldComponentUpdate(){
    console.log(this.props)
    return true
  }

  renderSubMenu = ({ name, path, child, id }) => {
    return (
      <SubMenu
        key={id}
        title={
          <Link to={path}>
            <span>{name}</span>
          </Link>
        }
      >
        {child &&
          child.map((item, i) => {
            return item.child && item.child.length > 0
              ? this.renderSubMenu(item, i)
              : this.renderMenuItem(item, i);
          })}
      </SubMenu>
    );
  };

  renderMenuItem = ({ name, path, id}) => {
    return (
      <Menu.Item key={id}>
        <Link to={path}>
          <span>{name}</span>
        </Link>
      </Menu.Item>
    );
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256, height : '100vh' }}
        mode="inline"
        openKeys={['1']}
        selectedKeys={['3']}
    >
    {
        this.props.list.map((elem,i)=>{
            return (
                elem.child && elem.child.length > 0 ? this.renderSubMenu(elem,i) : this.renderMenuItem(elem,i)
            )
        })
    }
    </Menu>
    );
  }
}

export default withRouter(Nav);
// export default Nav;
