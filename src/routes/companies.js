const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET all companies
router.get('/', async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET one company
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

// POST create company
router.post('/', async (req, res) => {
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

module.exports = router;
// PUT update company
router.put('/:id', async (req, res) => {
  const { name, location, industry } = req.body;
  try {
    const company = await prisma.company.update({
      where: { id: req.params.id },
      data: { name, location, industry }
    });
    res.json(company);
  } catch (error) {
    res.status(404).json({ error: 'Company not found' });
  }
});

// DELETE company
router.delete('/:id', async (req, res) => {
  try {
    await prisma.company.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Company deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Company not found' });
  }
});