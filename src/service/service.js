import DreamsRepositorie from "../repositories/dreams.repositorie.js";
import DreamsMongoDAO from "../dao/dreams.mongo.js";
import SynchronicitiesRepositorie from "../repositories/synchronicities.repositorie.js";
import SynchronicitiesMongoDao from "../dao/synchronicities.mongo.js";


export const dreamsService= new DreamsRepositorie(new DreamsMongoDAO());
export const synchronicitiesService= new SynchronicitiesRepositorie(new SynchronicitiesMongoDao());