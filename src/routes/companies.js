const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// GET all companies
router.get('/', async (req, res) => {
  const companies = await prisma.company.findMany();
  res.json(companies);
});

// GET one company
router.get('/:id', async (req, res) => {
  const company = await prisma.company.findUnique({
    where: { id: req.params.id }
  });
  if (!company) return res.status(404).json({ error: 'Company not found' });
  res.json(company);
});

// POST create company
router.post('/', async (req, res) => {
  const { name, location, industry } = req.body;
  const company = await prisma.company.create({
    data: { name, location, industry }
  });
  res.status(201).json(company);
});

module.exports = router;