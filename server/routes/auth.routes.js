import { Router} from 'express';
import { signup, login, verifyOtp,sendOtp } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/send-otp", sendOtp);     // <-- OTP generation
router.post("/verify-otp", verifyOtp);

export default router;