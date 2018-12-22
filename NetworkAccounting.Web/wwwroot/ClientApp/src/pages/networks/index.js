import React,{PureComponent} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Button} from "antd";
import NetworkTable from './components/NetworkTable';
import LeaseForm from '../../forms/leaseNetwork/form';
import NetworkForm from '../../forms/network/form';
import {updateProperty} from "../../forms/formUtils";

class Page extends PureComponent {
  constructor(props){
    super(props);
    this.state={
        leaseForm:false,
        networkForm:false
    };
    this.leaseNetwork=this.leaseNetwork.bind(this);
    this.saveNetwork = this.saveNetwork.bind(this);
    this.closeForm=updateProperty.bind(this,'leaseForm',false);
    this.openNetworkForm=updateProperty.bind(this,'networkForm',true);
    this.closeNetworkForm=updateProperty.bind(this,'networkForm',false);
  }

  openForm=()=>{
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'networkList/setLeased',
      leased:null//update form leased network
    });
    this.setState({leaseForm:true});
  };

  saveNetwork=(data)=>{
    // const dispatch = this.props.dispatch;
    // dispatch({
    //   type: 'networkList/save',
    //   payload: {poolId: data.poolId, description: data.description}
    // });
    console.log(data);
    this.closeNetworkForm();
  };

  leaseNetwork=(data)=>{
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'networkList/lease',
      payload: {size: data.size, poolId: data.poolId, description: data.description,fromId:data.fromId}
    });
  };

  render(){
    return(
      <div>
        <Button onClick={this.openForm}>Арендовать сеть</Button>,
        <Button onClick={this.openNetworkForm}>Редактировать сеть</Button>,
        <NetworkTable/>
        {this.state.leaseForm?<LeaseForm
          onLeaseNetwork={this.leaseNetwork}
          onClose={this.closeForm}
          networks={_.values(this.props.networkList.networks)}
          pools={_.values(this.props.poolList.pools)}
          leased={this.props.networkList.leased}
        />:null}
        {this.state.networkForm?<NetworkForm
                     onSaveNetwork={this.saveNetwork}
                     onClose={this.closeNetworkForm}
                     network={_.values(this.props.networkList.networks)[0]}
                     pools={_.values(this.props.poolList.pools)}/>:null}
      </div>);
  }
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(Page);
