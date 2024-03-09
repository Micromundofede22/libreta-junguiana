import { usersService } from "../service/service.js";


export const uploaderDocuments = async(req,res) => {
    try {
        const user= req.user.tokenInfo;
        const user_id= user._id.toString();
        const user_db= await usersService.getById(user_id);
        if(!user_db) return res.sendRequestError("Petición incorrecta");
        const array_documents =user_db.documents;

        const files= req.files;
        // console.log(files);

        if(files.dni &&
            !array_documents.some(item=> item.name.includes("dni"))
            ){
                array_documents.push({
                    name: files.dni[0].filename,
                    reference: files.dni[0].path
                });
            }else if(files.dni){
                for (const item of array_documents) {
                    if(item.name.includes("dni")){
                        item.name = files.dni[0].filename;
                        item.reference = files.dni[0].path;
                    };
                };
            };
        
            if(files.curriculum &&
                !array_documents.some(item=> item.name.includes("curriculum"))
                ){
                    array_documents.push({
                        name: files.curriculum[0].filename,
                        reference: files.curriculum[0].path
                    });
                }else if(files.curriculum){
                    for (const item of array_documents) {
                        if(item.name.includes("curriculum")){
                            item.name = files.curriculum[0].filename;
                            item.reference = files.curriculum[0].path;
                        };
                    };
                };
                
        if(array_documents.length === 2){
            await usersService.update(user_id, {status: "active", documents: array_documents});
            return res.sendSuccess("Archivos subidos con éxito. Su cuenta ya se encuentra activa como profesional.");
        };

        await usersService.update(user_id, user_db);
        res.sendSucces("Archivo subido con éxito.");
    } catch (error) {
        res.sendServerError(error.message);
    };
};