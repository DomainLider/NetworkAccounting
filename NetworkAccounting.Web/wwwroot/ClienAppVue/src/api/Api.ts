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
}