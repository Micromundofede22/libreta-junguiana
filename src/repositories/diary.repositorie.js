export default class DiaryRepositorie{
    constructor(dao){
        this.dao= dao;
    }
    create= async() => await  this.dao.create(); 
    get= async() => await  this.dao.get();
    getById= async(id) => await  this.dao.getById(id);
    getByIdAndPopulate= async(id) => await  this.dao.getByIdAndPopulate(id);
    update= async(id,data) => await  this.dao.update(id,data);
    delete= async(id) => await  this.dao.delete(id);
};