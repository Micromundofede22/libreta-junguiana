export default class SynchronicitiesRepositorie{
    constructor(dao){
        this.dao= dao
    }
    create= async(data) => await this.dao.create(data); 
    get= async() => await this.dao.get(); 
    update= async(id,data) => await this.dao.update(id,data);
    delete= async(id)=> await this.dao.delete(id);
};