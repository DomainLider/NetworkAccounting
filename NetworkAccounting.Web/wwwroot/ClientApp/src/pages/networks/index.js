import React,{PureComponent} from 'react';
import {connect} from 'dva';
import NetworkTable from './components/NetworkTable';
import LeaseForm from '../../forms/leaseNetwork/form';
import _ from 'lodash';
import {Button} from "antd";

class Page extends PureComponent {
  constructor(props){
    super(props);
    this.state={
        leaseNetwork:false
    }
    this.closeForm=this.closeForm.bind(this);
    this.leaseNetwork=this.leaseNetwork.bind(this);
  }

  openForm=()=>{
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'networkList/setLeased',
      leased:null//update form leased network
    });
    this.setState({leaseForm:true});
  }

  closeForm=()=>{
    this.setState({leaseForm:false});
  }

  leaseNetwork=(data)=>{
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'networkList/lease',
      payload: {size: data.size, poolId: data.poolId, description: data.description,fromId:data.fromId}
    });
  }

  render(){
    const form=this.state.leaseForm?
      <LeaseForm
                 onLeaseNetwork={this.leaseNetwork}
                 onClose={this.closeForm}
                 networks={_.values(this.props.networkList.networks)}
                 pools={_.values(this.props.poolList.pools)}
                 leased={this.props.networkList.leased}
      />
      :null;
    return(
      <div>
        <Button onClick={this.openForm}>Арендовать сеть</Button>,
        <NetworkTable/>
        {form}
      </div>);
  }
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(Page);
