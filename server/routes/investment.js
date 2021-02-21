const { Router } = require('express');
const investmentController = require('../controllers/investment');
const router = Router();

router.post('/', investmentController.getInvestmentsByUser);

router.post('/add-investment', investmentController.addInvestment);

router.delete('/:investmentId', investmentController.deleteInvestment);

router.put('/:investmentId', investmentController.updateInvestment);

module.exports = router;