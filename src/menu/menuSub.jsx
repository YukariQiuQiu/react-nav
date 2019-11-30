import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import MenuItem from './menuItem.jsx'
const { SubMenu } = Menu;
class MenuSub extends React.Component {

    
    render(){
        console.log(this.props)
        const {id,child, ...props} = this.props;
        return(
            // <div>123</div>

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
    };

}
export default MenuSub