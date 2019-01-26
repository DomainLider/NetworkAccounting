import React, {Component, PureComponent} from 'react';
import {updateValue} from "../formUtils";
import {
Button, Modal, Form, Input, Select,
} from 'antd';

const FormItem = Form.Item;

class CrudPoolForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.initState;
    this.updateValue = updateValue.bind(this);
  }

  initState = {
      name: 'NEW_POOL',
      description: 'Новый пул',
    };

  render() {
    return (
      <Modal visible title='Добавить пул' okText='Создать пул' onOk={()=>this.props.onAddPool(this.state)}
             cancelText='Закрыть' onCancel={this.props.onClose} >
        <Form layout='vertical'>
          <FormItem label='Введите имя пула' required>
            <Input onChange={this.changeName}
                   value={this.state.name}/></FormItem>
          <FormItem label='Описание'>
            <Input onChange={this.changeDescription}
                   value={this.state.description}/></FormItem>
        </Form>
      </Modal>);
  }

  changeName = (e) => this.updateValue('name', e.target.value);
  changeDescription = (e) => this.updateValue('description', e.target.value);

}

export default CrudPoolForm;
