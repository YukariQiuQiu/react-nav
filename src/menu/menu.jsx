import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

const menuSub = () => (
    <SubMenu
        key={this.props.id}
        title={<span>{this.props.name}</span>}
        {...props}
    >
        {child &&
        child.map((item, i) => {
            // return item.child && item.child.length > 0 ? (<MenuSub {...item} ></MenuSub>) : (<MenuItem {...item} ></MenuItem>);
            return (<div key={i}>123</div>);
        })}
    </SubMenu>
);

const menuItem = () => (
    <Menu.Item key={id}>
        <span>{name}</span>
    </Menu.Item>
)

class NavMenu extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        const {list} = this.props
        return(
            <Menu
                style={{
                width: 256,
                height: '100vh',
                }}
                theme="dark"
                mode="inline"
            >
                {list.map((elem,i) => {
                    return elem.child && elem.child.length > 0 ? menuSub({...elem}) : menuItem({...elem});
                })}
            </Menu>
        );
    };
}
export default NavMenu
