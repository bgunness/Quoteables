'use strict';

const Sequelize = require('sequelize');
const { sequelize } = require('.');
const moment = require('moment');

module.exports = (sequelize) => {
    class Quote extends Sequelize.Model {
        publishedAt() {
            const date = moment(this.createdAt).format('MMMM D, YYYY, h:mma');
            return date;
        }
        shortDescription() {
            const shortDesc = this.body.length > 200 ? this.body.substring(0, 200) + '...' : this.body;
            return shortDesc;
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