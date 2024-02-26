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
