import React, {Component, PureComponent} from 'react';
import update from 'immutability-helper';
import {updateValue} from "../formUtils";

import {
  Button, Modal, Form, Input, Select,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class FormLeaseNetwork extends Component {
  constructor(props) {
    super(props);
    const {pools,networks}=this.props;
    this.state = Object.assign({
      pools,networks
    },this.initState);
    this.updateValue=updateValue.bind(this);
    this.changePool=this.changePool.bind(this);
    this.changeDescription=this.changeDescription.bind(this);
    this.changeSize=this.changeSize.bind(this);
  }

  initState = {
      size: 24,
      poolId: 1,
      fromId:null, //сеть родитель
      description: 'Новая подсеть',
    }

  render() {
    const leased = this.props.leased;
    const {pools,networks}=this.state;
    const defaultPool=pools.length>0?pools[0].id:null;
    const froms=networks.filter(n=>n.poolId===this.state.poolId&&(n.status===0)&&(n.size<=this.state.size));
    return (
      <Modal visible title='Получить новую сеть' okText='Новая сеть' onOk={()=>{this.props.onLeaseNetwork(this.state)}} cancelText='Закрыть' onCancel={this.props.onClose}>
        <Form layout='vertical'>
          <FormItem label='Выберите тип сети' required>
            <Select onChange={this.changePool} defaultValue={defaultPool}>
              {pools.map(p=><Option key={p.id} value={p.id}>{p.description?p.description:p.name}</Option>)}
            </Select>
          </FormItem>
          <FormItem label='Размер сети' required><Input onChange={this.changeSize} value={this.state.size}/></FormItem>
          <FormItem label='Сеть-родитель'>
            <Select onChange={this.changeFromId}>
              {froms.map(p=><Option key={p.id} value={p.id}>{p.address}/{p.size} {p.description||null}</Option>)}
            </Select>
          </FormItem>
          <FormItem label='Описание'><Input onChange={this.changeDescription}
                                            value={this.state.description}/></FormItem>
          <FormItem label='Полученная сеть'><Input readOnly disabled
                                                   value={leased ? `${leased.address}/${leased.size}` : '-'}/></FormItem>
        </Form>
      </Modal>);
  }

  changePool = (e) => {
    this.setState(update(this.state,{
      poolId:{ $set:e},
      fromId: {$set:null}
    }))
  };
  changeSize = (e) => this.updateValue('size', e.target.value);
  changeDescription = (e) => this.updateValue('description', e.target.value);

}

export default FormLeaseNetwork;
