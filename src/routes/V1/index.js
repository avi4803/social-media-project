import { getTweet,createTweet } from "../../controllers/tweet-controller.js";
import { Router } from "express";
import { signUp , signIn} from "../../controllers/user-controller.js";
import { toggleLike } from "../../controllers/like-controller.js";
const router = Router();

router.get('/:id',getTweet);
router.post('/create',createTweet);
router.post('/user/signup',signUp);
router.post('/user/signin',signIn);
router.post('/likes/toggle',toggleLike);

export default router;

