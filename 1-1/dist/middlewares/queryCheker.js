"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (Object.keys(req.query).length !== 0) {
        //We have queries
        res.locals.query = true;
        const queryObj = req.query;
        const filter = {};
        let sort = {};
        if (!!queryObj.roleInCompany) {
            filter.roleInCompany = String(queryObj.roleInCompany);
        }
        if (queryObj.sortBy === "ageAsc") {
            sort = { dateOfBirth: 1 };
        }
        if (queryObj.sortBy === "ageDesc") {
            sort = { dateOfBirth: -1 };
        }
        res.locals.filter = filter;
        res.locals.sort = sort;
        next();
    }
    else {
        res.locals.query = false;
        next();
    }
};
