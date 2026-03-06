const prisma = require('../prisma');

async function calculateScore(companyId) {
  const reports = await prisma.applicationReport.findMany({
    where: { companyId }
  });

  if (reports.length === 0) return 0;

  let points = 0;

  for (const report of reports) {
    if (report.outcome === 'hired') {
      points += 3;
    } else if (report.outcome === 'rejected' && report.rejectedDueToVisa) {
      points -= 2;
    }
    // no_response adds 0
  }

  // normalize to 0-10 scale
  const maxPossible = reports.length * 3;
  const minPossible = reports.length * -2;
  const range = maxPossible - minPossible;

  const normalized = ((points - minPossible) / range) * 10;

  return Math.round(normalized * 10) / 10;
}

async function updateCompanyScore(companyId) {
  const score = await calculateScore(companyId);

  await prisma.company.update({
    where: { id: companyId },
    data: { sponsorshipScore: score }
  });

  return score;
}

module.exports = { calculateScore, updateCompanyScore };