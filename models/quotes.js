'use strict';

const Sequelize = require('sequelize');
const { sequelize } = require('.');
const moment = require('moment');

module.exports = (sequelize) => {
    class Quote extends Sequelize.Model {
        chopQuote() {
            const chopped = this.body.length > 240 ? this.body.substring(0, 240) + '...' : this.body;
            return chopped;
        }
    }
    Quote.init({
        source: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: {
                    msg: 'Source is required!'
                }
            }
        },
        body: {
            type: Sequelize.TEXT,
            validate: {
                notEmpty: {
                    msg: 'Body of quote is required!'
                }
            }
        }
    }, { sequelize });

    return Quote;
}