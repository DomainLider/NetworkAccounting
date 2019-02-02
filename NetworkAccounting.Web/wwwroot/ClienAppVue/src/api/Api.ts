import axios, {AxiosInstance} from 'axios';

export default class Api {
    private transport: AxiosInstance;
    public constructor(){
        this.transport=axios.create({
            baseURL:'/'
        })
    }    
    public getNetworks():Promise<any> {
        return this.transport.get('/api/network');
    }
    
    public getPools():Promise<any> {
        return this.transport.get('/api/pool');
    }
    
    public releaseNetwork(id:number):Promise<any> {
        return this.transport.post(`/api/network/release/${id}`);
    }
    
    public leaseNetwork(network:{id:number,description:string}):Promise<any> {
        return this.transport.post(`/api/network/lease`,
            {Id:network.id,Description:network.description}
        );
    }
    
    public getFreeNetwork({size,poolId,fromId}:{size:number,poolId:number,fromId:number}):Promise<any> {
        if (fromId===null)
            return this.transport.post(`/api/network/find/`,
                {size,poolId,fromId}
            );
        return Promise.resolve({data:{id:fromId}});
    }
    
    public addNetwork(data:{address:string,size:number,poolId:number}):Promise<any>{
        return this.transport.post(`/api/network`,data);
    }
    
    public addPool(data:{name:string,description:string}):Promise<any>{
        debugger;
        return this.transport.post(`/api/pool`,data);
    }
    
    public removePool(id:number):Promise<any>{
        return this.transport.delete(`/api/pool/${id}`);
    }
    // public removeNetwork(id:number):Promise<any> {
    //     return this.transport.delete(`/api/network/${id}`);
    // }
}