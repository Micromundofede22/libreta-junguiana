import { Router } from "express";

export default class AppRouter{
    constructor(){
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router // este método me trae el Router() e inicializa todo
    }

    init() { } // se sobreescribe e inicializa las clases heredadas en las extensiones de clases

    get(path, ...callbacks) { //...spread ya que va el controller,pueden ir middleware, por eso se pone el spred, recibiendo un array
        this.router.get(
            path,                         // rutas 
            this.generateCustomResponses, //respuestas del servidor
            this.applyCallbacks(callbacks)) //aplicacion de los middlewares y controllers
    }

    post(path, ...callbacks) {
        this.router.post(
            path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }

    put(path, ...callbacks) {
        this.router.put(
            path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }


    delete(path, ...callbacks) {
        this.router.delete(
            path,
            this.generateCustomResponses,
            this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(callback => async (...params) => { 
            try {
                await callback.apply(this, params)
            } catch (err) {
                console.log(err)
                params[1].status(500).json({ error: err }) //params[1] es (res). params[0] es req
            }
        })
    }

    //genera las respuestas del servidor
    generateCustomResponses = (req, res, next) => {
        //respuestas predeterminadas en su estructura, luego solo le paso el contenido
        res.sendSuccess = payload =>
            res.status(200).json({ status: 'success', payload: payload });

        res.createdSuccess = (payload) =>
            res.status(201).json({ status: "success", payload: payload });

        res.notContent = (payload) =>
            res.status(204).json({status: "success", payload: payload});

        res.sendError = error =>
            res.status(400).json({ status: 'error', error: error });

        res.unauthorized = (error) =>
            res.status(401).json({ status: "error", error: error }); //autenticación falló
        
        res.forbidden = (error)=> 
            res.status(403).json({status: "error", error: error}); //autenticado pero prohibido pero sin permisos
            
        res.sendRequestError = (error) =>
            res.status(404).json({ status: "error", error: error });

        res.sendServerError = (error) =>
            res.status(500).json({ status: "error", error: error });

        next();
    }


};