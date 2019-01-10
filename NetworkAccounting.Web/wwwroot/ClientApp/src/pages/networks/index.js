import React,{PureComponent} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Button} from "antd";
import NetworkTable from './components/NetworkTable';
import LeaseForm from '../../forms/leaseNetwork/form';
import NetworkForm from '../../forms/network/form';
import NetworkAddForm from '../../forms/network/addform';
import {updateProperty} from "../../forms/formUtils";

class Page extends PureComponent {
  constructor(props){
    super(props);
    this.state={
        leaseForm:false,
        networkForm:false,
        networkAddForm:false
    };
    this.leaseNetwork=this.leaseNetwork.bind(this);
    this.saveNetwork = this.saveNetwork.bind(this);
    this.addNetwork = this.addNetwork.bind(this);
    this.closeForm=updateProperty.bind(this,'leaseForm',false);
    this.openNetworkForm=updateProperty.bind(this,'networkForm',true);
    this.openNetworkAddForm=updateProperty.bind(this,'networkAddForm',true);
    this.closeNetworkForm=updateProperty.bind(this,'networkForm',false);
    this.closeNetworkAddForm=updateProperty.bind(this,'networkAddForm',false);
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

  addNetwork=(data)=>{
    console.log(`New network to pool`);
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
        <Button onClick={this.openNetworkAddForm}>Новая сеть</Button>,
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

        {this.state.networkAddForm?<NetworkAddForm
          onSaveNetwork={this.addNetwork}
          onClose={this.closeNetworkAddForm}
          network={_.values(this.props.networkList.networks)[0]}
          pools={_.values(this.props.poolList.pools)}/>:null}
      </div>);
  }
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(Page);
