import update from "immutability-helper";

export function updateValue(key, value) {
  this.setState(update(this.state, {[key]: {$set: value}}));
}

/**
 * Обновляет поле.поле.поле.. значением
 * @param property
 * @param value
 * @returns {Function}
 */
export function updateProperty(property,value){
  const properties=property.split('.');
  let statePath={};
  let linkPath=statePath;
  for (let idx=0;idx<properties.length;idx++){
    linkPath[properties[idx]]={};
    linkPath=linkPath[properties[idx]];
  }
  linkPath['$set']=value;
  this.setState(update(this.state,statePath));
}

/**
 * Обновляет поле.поле.поле... значение.value.target
 */
export function updatePropertyTarget(property,target)
{
  updateProperty.call(this, property, target.target.value);
}
