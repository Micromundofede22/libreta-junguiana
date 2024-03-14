import DreamsRepositorie from "../repositories/dreams.repositorie.js";
import DreamsMongoDAO from "../dao/dreams.mongo.js";
import SynchronicitiesRepositorie from "../repositories/synchronicities.repositorie.js";
import SynchronicitiesMongoDao from "../dao/synchronicities.mongo.js";
import UsersRepositories from "../repositories/users.repositories.js";
import UsersMongoDao from "../dao/users.mongo.js";
import DiaryRepositorie from "../repositories/diary.repositorie.js";
import DiaryMongoDao from "../dao/diary.mongo.js";
import TokenRepositorie from "../repositories/token.repositorie.js";
import TokenMongoDao from "../dao/token.mongo.js";


export const dreamsService= new DreamsRepositorie(new DreamsMongoDAO());
export const synchronicitiesService= new SynchronicitiesRepositorie(new SynchronicitiesMongoDao());
export const usersService= new UsersRepositories(new UsersMongoDao());
export const diaryService= new DiaryRepositorie(new DiaryMongoDao());
export const tokenService= new TokenRepositorie(new TokenMongoDao());