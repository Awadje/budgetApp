import mongoose from 'mongoose';
import { Router } from 'express';
import Money from '../model/money';
import bodyParser from 'body-parser';

import { authenticate } from '../middleware/authMiddleware';


export default ({ config, db }) => {
    let api = Router();

    api.post('/add', (req, res) => {
        let newMoney = new Money();
        newMoney.transaction = req.body.transaction;
        newMoney.category = req.body.category;
        newMoney.amount = req.body.amount;

        newMoney.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Entry saved sucessfully' });
        });
    });

    api.get('/', (req, res) => {
        Money.find({}, (err, moneys) => {
            if (err) {
                res.send(err);
            }
            res.json(moneys);
        });
    });

    api.get('/:id', (req, res) => {
        Money.findById(req.params.id, (err, money) => {
            if (err) {
                res.send(err);
            }
            res.json(money);
        });
    });

    api.put('/:id', (req, res) => {
        Money.findById(req.params.id, (err, money) => {
            if (err) {
                res.send(err);
            }
            money.transaction = req.body.transaction;
            money.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Money info updated" });
            });
        });
    });

    api.delete('/:id', (req, res) => {
        Money.remove({
            _id: req.params.id
        }, (err, money) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Entry Succefully deleted" })
        });
    });

    return api;
}
