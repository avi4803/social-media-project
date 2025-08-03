import { getTweet,createTweet } from "../../controllers/tweet-controller.js";
import { Router } from "express";
const router = Router();

router.get('/:id',getTweet);
router.post('/create',createTweet);

export default router;

