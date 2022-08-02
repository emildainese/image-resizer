import express from "express";
import apicache from "apicache";
import { cache } from "../middleware/cache.js";
const router = express.Router();

//-------------------------------------------------------------------------------------
// Routes are automatically added to index, but may be further added to groups for quick
// deleting of collections
//-------------------------------------------------------------------------------------

router.get("/:collection/:item?", cache("5 minutes"), (req, res) => {
  req.apicacheGroup = req.params.collection;
  res.json({ success: true });
});

//-------------------------------------------------------------------------------------
// Display cache index
//-------------------------------------------------------------------------------------

router.get("/index", cache("5 minutes"), (req, res) => {
  const index = apicache.getIndex();
  res.json({ index });
});

//-------------------------------------------------------------------------------------
// Display cache performance
//-------------------------------------------------------------------------------------

router.get("/performance", cache("5 minutes"), (req, res) => {
  const performance = apicache.getPerformance();
  res.json({ performance });
});

//-------------------------------------------------------------------------------------
// Manually clear target/group
//-------------------------------------------------------------------------------------

router.get("/clear/:target?", cache("5 minutes"), (req, res) => {
  const { target } = req.params;
  if (target) res.json(apicache.clear(target));
  else res.json(apicache.clear());
});

export default router;
