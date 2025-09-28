import express from "express";
import { editProfile, followOrUnfollowUser, getProfile, getSuggestedUsers, login, logout, register, searchUsers, seeFollowers, seeFollowing, removeUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);





router.route("/:id/profile").get(isAuthenticated,getProfile);

router.route("/profile/edit").post(isAuthenticated,upload.single("profilePhoto"),editProfile);

router.route("/suggested").get(isAuthenticated,getSuggestedUsers);

router.route("/:id/followers").get(isAuthenticated,seeFollowers);
router.route("/:id/following").get(isAuthenticated,seeFollowing);

router.route("/search").get(isAuthenticated,searchUsers);

router.route("/followorunfollow/:id").post(isAuthenticated,followOrUnfollowUser);

router.delete('/remove/:id', isAuthenticated, removeUser);

export default router;
