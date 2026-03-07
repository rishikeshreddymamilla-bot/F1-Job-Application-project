const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const { updateCompanyScore } = require('../services/scoringService');
const { body, validationResult } = require('express-validator');

const reportValidation = [
  body('companyId').notEmpty().withMessage('companyId is required'),
  body('role').notEmpty().withMessage('role is required'),
  body('outcome').isIn(['hired', 'rejected', 'no_response']).withMessage('outcome must be hired, rejected or no_response'),
  body('rejectedDueToVisa').optional().isBoolean().withMessage('rejectedDueToVisa must be a boolean')
];

// POST submit anonymous report
router.post('/', reportValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { companyId, role, outcome, rejectedDueToVisa } = req.body;

    const report = await prisma.applicationReport.create({
      data: {
        companyId,
        role,
        outcome,
        rejectedDueToVisa: rejectedDueToVisa || false
      }
    });

    const newScore = await updateCompanyScore(companyId);
    res.status(201).json({ report, newScore });
  } catch (error) {
    console.error(error);
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