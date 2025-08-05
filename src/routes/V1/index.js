import { getTweet,createTweet } from "../../controllers/tweet-controller.js";
import { Router } from "express";
import { signUp , signIn} from "../../controllers/user-controller.js";
import { toggleLike } from "../../controllers/like-controller.js";
import { addComment, delComment } from "../../controllers/comment-controller.js";
const router = Router();

router.get('/:id',getTweet);
router.post('/create',createTweet);
router.post('/user/signup',signUp);
router.post('/user/signin',signIn);
router.post('/likes/toggle',toggleLike);
router.post('/comments/add',addComment);
router.post('/comments/delete',delComment);

export default router;

