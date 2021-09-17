const user = require('../models/user');
const User = require('../models/user');
const moment = require('moment');

const mongoose = require('mongoose');

exports.getInvestmentsByUser = async (req, res, next) => {
  try {
    const criteria = req.body;
    const filters = [];
    console.log(criteria);
    if (criteria.filterBy && criteria.filterBy.status && criteria.filterBy.status !== 'All') {
      filters.push({ $eq: ['$$invesment.status', criteria.filterBy.status] })
    }
    if (criteria.filterBy && criteria.filterBy.minPrice) {
      filters.push({ $gt: ['$$invesment.sum', +criteria.filterBy.minPrice] });
    }
    if (criteria.filterBy && criteria.filterBy.maxPrice) {
      filters.push({ $lt: ['$$invesment.sum', +criteria.filterBy.maxPrice] });
    }

    const isStatusAll = !criteria.status || criteria.status === 'All';
    const [userData] = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.userId) } },
      {
        $project: {
          investments: {
            $slice: [
              {
                $filter: {
                  input: '$investments',
                  as: 'invesment',
                  cond: { $and: filters },
                },
              },
              criteria.skip,
              criteria.limit,
            ],
          },
        },
      },
    ]);


    if (!userData) {
      const error = new Error('User not founded.');
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Get investments', result: userData.investments });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addInvestment = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      const erorr = new Error('User not founded.');
      error.statusCode = 404;
      throw erorr;
    }
    const investment = req.body;
    user.investments.unshift(investment);
    await user.save();
    res.status(201).json({
      message: 'Investment added',
      result: user.investments.slice(0, 20),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteInvestment = async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const user = await User.findById(req.userId).exec();
    if (!user) {
      const erorr = new Error('User not founded.');
      error.statusCode = 404;
      throw erorr;
    }
    user.investments.pull(investmentId);
    await user.save();
    res.status(200).json({
      message: 'Investment deleted',
      result: user.investments.slice(0, 20)
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateInvestment = async (req, res, next) => {
  try {
    const { investmentId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      const erorr = new Error('User not founded.');
      error.statusCode = 404;
      throw erorr;
    }
    const index = user.investments.findIndex(
      (investment) => investment._id.toString() === investmentId
    );
    user.investments[index] = {
      ...user.investments[index],
      ...req.body,
    };
    await user.save();
    res.status(200).json({ message: 'Investment updated' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
