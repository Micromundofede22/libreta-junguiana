import { passportCall } from "./middleware/passportCall.js";
import DreamsRouter from "./routers/dreams.router.js";
import SessionRouter from "./routers/session.router.js";
import SynchronicitiesRouter from "./routers/synchronicities.router.js";

const run= (app) => {

    //instancias
    const sessionRouter= new SessionRouter();
    const dreamsRouter= new DreamsRouter();
    const synchronicitiesRouter= new SynchronicitiesRouter();

    //seteo routes
    app.use("/api/session", sessionRouter.getRouter());
    app.use("/api/dreams",passportCall("jwt"), dreamsRouter.getRouter());
    app.use("/api/synchronicities", passportCall("jwt"),synchronicitiesRouter.getRouter());

}

export default run;