const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const authMiddleware = require('../middleware/authMiddleware');

// GET all companies - public
router.get('/', async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET one company - public
router.get('/:id', async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.params.id }
    });
    if (!company) return res.status(404).json({ error: 'Company not found' });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST create company - protected
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, location, industry } = req.body;
    if (!name || !location || !industry) {
      return res.status(400).json({ error: 'name, location and industry are required' });
    }
    const company = await prisma.company.create({
      data: { name, location, industry }
    });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PUT update company - protected
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, location, industry } = req.body;
    const company = await prisma.company.update({
      where: { id: req.params.id },
      data: { name, location, industry }
    });
    res.json(company);
  } catch (error) {
    res.status(404).json({ error: 'Company not found' });
  }
});

// DELETE company - protected
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.company.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Company deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Company not found' });
  }
});

module.exports = router;
