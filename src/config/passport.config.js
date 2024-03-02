import passport from "passport";
import local from "passport-local";
import { 
  diaryService,
  dreamsService, 
  synchronicitiesService, 
  usersService 
} from "../service/service.js";
import { createHash, extractCookie, generateToken, isValidPassword } from "../utils.js";
import passport_jwt from "passport-jwt";
import { JWT_PRIVATE_KEY } from "./config.js";


const LocalStrategy = local.Strategy;
const JWTStrategy= passport_jwt.Strategy;
const ExtractJWT = passport_jwt.ExtractJwt;



const initializePassport = () => {
//REGISTER
  passport.use(
    "registerPassport",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, sex, role, psychologist } = req.body;
        try {

          if (!first_name || !last_name || !email || !age || !sex || !role ) {
            return done("Datos incompletos", false);
          }

          const user = await usersService.getOne({ email: username });
          if (user) {
            console.log("Usuario ya registrado");
            return done(null, false);
          }

          if(role === "psychologist"){
            const diary= await diaryService.create({});

            const newUser= {
            first_name,
            last_name,
            email,
            age,
            sex,
            password: createHash(password),
            role,    
            diary: diary._id,
            verifiedAccount: "UNVERIFIED",
            status: "inactive",
            service: "local",
            imageProfile: "psico.jpg",
            };
            const result = await usersService.create(newUser);
            return done(null, result);
          };

          if (role === "user") {
            if (!psychologist) return done("Datos incompletos");

            const dreams = await dreamsService.create({});
            const synchronicities = await synchronicitiesService.create({});

            const newUser = {
              first_name,
              last_name,
              email,
              age,
              sex,
              password: createHash(password),
              role,
              psychologist,
              dreams: dreams._id,
              synchronicities: synchronicities._id,
              verifiedAccount: "UNVERIFIED",
              status: "inactive",
              service: "local",
              imageProfile: "user.jpg",
            };
  
            const result = await usersService.create(newUser);
            return done(null, result);
          }
          
        } catch (error) {}
      }
    )
  );

  //LOGIN
  passport.use(
    "loginPassport",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {

        const user= await usersService.getOne({email: username});
        if(!user) return done(null,false)
        if(!isValidPassword(user,password)) return done(null,false);

        const token= generateToken(user);
        user.token= token;
        done(null,user);

      }
    )
  );

  //JWT
  passport.use("jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]), //extrae la cookie
      secretOrKey: JWT_PRIVATE_KEY,
    },
    async (jwt_payload, done) => {
      // console.log("jwt_payload:", jwt_payload);
      done(null, jwt_payload); //devuelve contenido del jwt
    }
  ))


  //SERIALIZE
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
//DESERIALIZE
  passport.deserializeUser(async (id, done) => {
    const user = await usersService.getById(id)
    done(null, user);
  });

};

export default initializePassport;
