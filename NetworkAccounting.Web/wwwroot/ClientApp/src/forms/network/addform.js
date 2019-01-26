import Form from "./form";

export default class AddFormNetwork extends Form {
  constructor(props){
    super(props);
    this.networkDisabled=false;
    this.title='Новая сеть';
  }
  render(){
    return super.render();

  }
}
