import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20"

import prisma from "../database/prismaClient.js";

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["email", "profile"],
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile.emails[0].value,
                    },
                });

                if (user) {
                    return done(null, user);
                }

                const newUser = await prisma.user.create({
                    data: {
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        id: profile.id,
                        password: profile.id,
                    },
                });

                return done(null, newUser);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    if (id) {
        return done(null, id);
    }
});