import React,{Component} from 'react';
import {connect} from 'dva';
import PoolForm from '../../forms/pool/form';
import {Button} from "antd";

import PoolList from "./components/PoolList";

class PoolPage extends Component {
  constructor(props){
    super(props);
    this.state={
      poolForm:false
    };
    this.openForm=this.openForm.bind(this);
    this.closeForm=this.closeForm.bind(this);
  }

  openForm=()=>{
    this.setState({poolForm:true});
  };

  closeForm=()=>{
    this.setState({poolForm:false});
  };

  addPool=(pool)=>{
    const dispatch = this.props.dispatch;
    dispatch({
      type:'poolList/addPool',
      payload:{
        name:pool.name,
        description:pool.description
      }
    });
    this.closeForm();
  }

  render(){
    return (
      <div>
        <Button onClick={this.openForm}>Добавить пул</Button>,
        <PoolList/>
        {this.state.poolForm?<PoolForm onClose={this.closeForm} onAddPool={this.addPool}/>:null}
      </div>
    );
  }
}
export default connect()(PoolPage);
