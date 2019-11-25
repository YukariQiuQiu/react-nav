import React, { Component } from 'react';
import './nav.css'
class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeName : ''
        };  
    };
    UNSAFE_componentWillMount(){    
        let activeName = window.location.hash.split('#')[1];
        this.setState({activeName})  
    };
    checkPath(path){
        console.log(this.state.activeName)
        return (this.state.activeName.indexOf(path) !== -1);
    };
    jump(path){
        window.location.hash = '#'+path;
        this.setState({activeName:path});  
    };
    //父级菜单渲染
    renderMenu = ({name,path,child},i)=>{
        return(
        <div key={i}>
            <span className={this.checkPath(path) ? 'active' : ''} onClick={this.jump.bind(this,path)}>{name}</span>
            {   
                child && child.map((item,i) =>{
                    return item.child && item.child.length > 0 ? this.renderMenu(item,i) : this.renderItem(item,i); 
                })
            }
        </div>
        )
    }
    //最子级菜单渲染
    renderItem = ({name,path},i)=>{
        return (
            <div key={i}>
                <span className={this.checkPath(path) ? 'active' : ''} onClick={this.jump.bind(this,path)}>{name}</span>
            </div>
        )
    }

    render(){
        return (
            this.props.list.map((elem,i)=>{
                return (
                    elem.child && elem.child.length > 0 ? this.renderMenu(elem,i) : this.renderItem(elem,i)
                )
            })
        )
    }
};
export default Nav;