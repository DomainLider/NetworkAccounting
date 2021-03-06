import React,{Component} from 'react'
import {updateProperty,updatePropertyTarget} from "../formUtils";
import {Form, Input, Modal, Select} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

export default class CrudNetwork extends Component {
  networkDisabled=true;
  title='Редактировать сеть'
  constructor(props) {
    super(props);
    this.changePool = updateProperty.bind(this,'network.poolId');
    this.changeDescription = updatePropertyTarget.bind(this,'network.description');
    this.changeNetwork = updatePropertyTarget.bind(this,'network.address');
    this.state = {
      pools:this.props.pools,
      network:this.props.network,
      onChange:false
    }
  }

  render(){
    const {pools,network}=this.state;
    return (
      <Modal visible title={this.title} okText='Сохранить' onOk={()=>{this.props.onSaveNetwork(this.state.network)}} cancelText='Закрыть' onCancel={this.props.onClose}>
        <Form layout='vertical'>
          <FormItem label='Сеть'>
            <Input readOnly={this.networkDisabled} disabled={this.networkDisabled} value={`${network.address}`} onChange={this.changeNetwork}/></FormItem>
          <FormItem label='Выберите тип сети' required>
            <Select onChange={this.changePool} defaultValue={this.state.network.poolId}>
              {pools.map(p=><Option key={p.id} value={p.id}>{p.description?p.description:p.name}</Option>)}
            </Select>
          </FormItem>
          <FormItem label='Описание'>
            <Input onChange={this.changeDescription}
                                            value={this.state.network.description}/></FormItem>
          <FormItem label='Состояние'>
            <Input readOnly value={this.state.network.status}/>
          </FormItem>
        </Form>
      </Modal>);

  }
}
