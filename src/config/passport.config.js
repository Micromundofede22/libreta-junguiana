import passport from "passport";
import local from "passport-local";
import { 
  dreamsService, 
  synchronicitiesService, 
  usersService 
} from "../service/service.js";
import { createHash } from "../utils.js";

const LocalEstrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "registerPassport",
    new LocalEstrategy(
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

          if (role == "user") {
            if (!psychologist) return done("Datos incompletos");
          }
          const user = await usersService.getOne({ email: username });
          if (user) {
            console.log("Usuario ya registrado");
            return done(null, false);
          }

          const dreams = await dreamsService.create({});
          const synchronicities = await synchronicitiesService.create({});
          // console.log(first_name, last_name, email, age, sex, role, psychologist,password, dreams._id, synchronicities._id)
          // console.log(createHash(password))
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

          console.log(newUser)
          const result = await usersService.create(newUser);
          return done(null, result);
        } catch (error) {}
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersService.getById(id)
    done(null, user);
  });

};

export default initializePassport;
