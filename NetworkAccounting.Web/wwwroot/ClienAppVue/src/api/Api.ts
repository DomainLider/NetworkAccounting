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
        ).then(res=>res.data);
    }
    
    public getFreeNetwork({size,poolId,fromId}:{size:number,poolId:number,fromId:number}):Promise<any> {
        return this.transport.post(`/api/network/find/`,
            {size,poolId,fromId}
        ).then(res=>{
            return res.data.id;
        });
    }
    
    public addNetwork(data:{address:string,size:number,poolId:number}):Promise<any>{
        return this.transport.post(`/api/network`,data).then(res=>res.data);
    }
}