import DreamsRouter from "./routers/dreams.router.js";
import SessionRouter from "./routers/session.router.js";

const run= (app) => {

    //instancias
    const sessionRouter= new SessionRouter();
    const dreamsRouter= new DreamsRouter();

    //seteo routes
    app.use("/api/session", sessionRouter.getRouter());
    app.use("/api/dreams", dreamsRouter.getRouter());

}

export default run;