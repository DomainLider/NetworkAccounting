import Vue from 'vue'

import Api from '../api/Api';

const bus = new Vue();

const events = {
  GET_POOLS: 'GET_POOLS',
  DATA_POOLS: 'DATA_POOLS',
  GET_NETWORKS: 'GET_NETWORKS',
  DATA_NETWORKS: 'DATA_NETWORKS',
  POST_RELEASE: 'POST_RELEASE',
  POST_RELEASE_OK: 'POST_RELEASE_OK',
  POST_LEASE:'POST_LEASE',
  POST_LEASE_OK:'POST_LEASE_OK',
  POST_ADD_NETWORK:'POST_ADD_NETWORK',
  POST_ADD_NETWORK_OK:'POST_ADD_NETWORK_OK',
  GET_FREE_NETWORK:'GET_FREE_NETWORK',
  GET_FREE_NETWORK_OK:'GET_FREE_NETWORK_OK',
  ERROR: 'ERROR'
};

function PromiseWrapper(promise, okEvent, errEvent = events.ERROR) {
    promise.then(res => {
      bus.$emit(okEvent, res.data)
    }).catch(err => {
      bus.$emit(errEvent, {message:err.message})
    })
}

bus.$on(events.GET_NETWORKS, ()=>PromiseWrapper(new Api().getNetworks(), events.DATA_NETWORKS));
bus.$on(events.GET_POOLS, ()=>PromiseWrapper(new Api().getPools(), events.DATA_POOLS));
bus.$on(events.POST_RELEASE, (id)=>PromiseWrapper(new Api().releaseNetwork(id).then(()=>bus.$emit(events.GET_NETWORKS)),
    events.POST_RELEASE_OK));
bus.$on(events.GET_FREE_NETWORK,(data)=>PromiseWrapper(new Api().getFreeNetwork(data), events.GET_FREE_NETWORK_OK));
bus.$on(events.POST_ADD_NETWORK,(data)=>PromiseWrapper(new Api().addNetwork(data),events.POST_ADD_NETWORK_OK));
bus.$on(events.POST_LEASE,(data)=>PromiseWrapper(new Api().leaseNetwork(data),events.POST_LEASE_OK));
bus.$on(events.ERROR,(error)=>console.error(error.message));
bus.events = events;

/**
 * Combine events
 * @param events
 * @constructor
 */
bus.Combine = (...events) => {
  for (const event of events) {
    console.log(`Emmit ${event}`);
    bus.$emit(event);
  }
};

export default bus;

