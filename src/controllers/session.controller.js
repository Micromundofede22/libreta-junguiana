import { SIGNED_COOKIE_NAME } from "../config/config.js";
import { tokenService, usersService } from "../service/service.js";


export const register = (req, res) => {
  try {
    res.sendSuccess("Usuario registrado");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const failRegister = (req, res) => {
  try {
    if (req.body === "Datos incompletos") {
      res.sendRequestError("Faltan datos por cargar");
    }
    res.sendError("User ya existe");
  } catch (error) {
    res.sendServerError(error.message);
  }
};

//LOGIN
export const login = (req, res) => {
  try {
    res
    .cookie(SIGNED_COOKIE_NAME, req.user.token, {signed: false})
    .sendSuccess("Usuario logueado");
  } catch (error) {
    res.sendServerError(error.message);
  };
};

export const failLogin = (req, res) => {
  try {
    res.unauthorized(`Error al loguearse. Si se registró y aún no verificó su cuenta de email, 
    revise su correo y confirme con el link que se le envió. Caso contrario vuelva a loguearse`);
  } catch (error) {
    res.sendServerError(error.message);
  };
};


export const logout= (req,res) => {
  try {
    req.session.destroy((err) => {}); //destruyo la session que usa passport
    res.clearCookie("cookie_name_jwt"); //limpio la cookie que tiene el token
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const verifyTokenUser= async(req,res) => {
  try {
    const token= req.params.token;
    const tokenDB= await tokenService.getOne({token: token});
      if (!tokenDB) return res.sendRequestError("Token no válido");

      const emailToken= tokenDB.email;

      const user= await usersService.getOne({email:emailToken});

      if(user){
        await usersService.update(user._id, { verifiedAccount: "VERIFIED" });
        await tokenService.delete({email:emailToken});
        // return res.render("sessions/userVerified", { userVerified });
        return res.sendSuccess("Cuenta verificada, ya puede iniciar sesión.");
      };
  } catch (error) {
    res.sendServerError(error.message);
  };
};