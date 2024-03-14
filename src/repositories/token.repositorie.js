
export default class TokenRepositorie{
    constructor(dao){
        this.dao= dao;
    };
    create= async(data) => await this.dao.create(data);
    getOne= async(data) => await this.dao.getOne(data);
    delete= async(data) => await this.dao.delete(data);
};