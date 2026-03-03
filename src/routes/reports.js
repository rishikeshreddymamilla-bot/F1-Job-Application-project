const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

// POST submit anonymous report
router.post('/', async (req, res) => {
  try {
    const { companyId, role, outcome, rejectedDueToVisa } = req.body;

    if (!companyId || !role || !outcome) {
      return res.status(400).json({ error: 'companyId, role and outcome are required' });
    }

    const report = await prisma.applicationReport.create({
      data: {
        companyId,
        role,
        outcome,
        rejectedDueToVisa: rejectedDueToVisa || false
      }
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET all reports for a company
router.get('/company/:companyId', async (req, res) => {
  try {
    const reports = await prisma.applicationReport.findMany({
      where: { companyId: req.params.companyId }
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;