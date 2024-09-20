import { Router } from "express";
import { 
    postquestion,
    fetchquestion,
    fetchall
} from "../controllers/question.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/post").post(verifyJWT,postquestion)
router.route("/fetch/:id").get(verifyJWT,fetchquestion)
router.route("/fetchall").get(fetchall)


//secured routes
// router.route("/logout").post(verifyJWT,  logoutUser)
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)

export default router