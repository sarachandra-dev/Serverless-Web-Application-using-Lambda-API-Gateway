const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
const redis = require('../utils/redis');
const Share = require('../models/Share');

const TTL = parseInt(process.env.SHARE_TTL_SECONDS) || 86400;

const shareText = async (req, res) => {
  const { text } = req.body;
  if (!text?.trim()) return res.status(400).json({ error: 'Text is required' });

  const code = nanoid();
  const expiresAt = new Date(Date.now() + TTL * 1000);

  await redis.set(code, text, 'EX', TTL);
  await Share.create({ code, text, expiresAt });

  res.json({ code, expiresAt, ttlSeconds: TTL });
};

const retrieveText = async (req, res) => {
  const code = req.params.code.toUpperCase();

  const text = await redis.get(code);
  if (!text) return res.status(404).json({ error: 'Code not found or expired' });

  const ttl = await redis.ttl(code);
  await Share.findOneAndUpdate({ code }, { $inc: { views: 1 } });

  res.json({ text, ttlSeconds: ttl });
};

module.exports = { shareText, retrieveText };
