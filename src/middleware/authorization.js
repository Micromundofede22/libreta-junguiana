export const handlePolicies = (policies) => (req, res, next) => {
    const user = req.user.tokenInfo || null;
    // console.log('handlePolicies: ', user)
    if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).json({ status: "error", error: "Acceso denegado" });
    return next();
  };