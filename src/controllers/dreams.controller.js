import { dreamsService } from "../service/service.js";


export const createDream= async(req,res) => {
    try {
        const {title,body, image,interpretation,feelings,memory} = req.body
        const user= req.user.tokenInfo;
        console.log(user);
        const dreams_Id= user.dreams.toString();
        console.log(dreams_Id)
        const dreams= await dreamsService.getById(dreams_Id);


        const dream= {
            title,
            body,
            image,
            interpretation,
            feelings,
            memory
        }

        dreams.dreams.push(dream);
        await dreamsService.update(dreams_Id, dreams);
        res.sendSuccess("Sueño registrado");
    } catch (error) {
        res.sendServerError(error)
    };
};

export const getDreams= (req,res) => {
    try {
        
    } catch (error) {
        
    }
};

export const updateDream= (req,res) => {
    try {
        
    } catch (error) {
        
    }
};

export const deleteDream= (req,res) => {
    try {
        
    } catch (error) {
        
    }
};