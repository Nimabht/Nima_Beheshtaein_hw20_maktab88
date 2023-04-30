import { Request, Response, NextFunction, RequestParamHandler } from "express";

interface FilterObject {
  roleInCompany?: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.query).length !== 0) {
    //We have queries
    res.locals.query = true;
    const queryObj = req.query;

    const filter: FilterObject = {};
    let sort: object = {};

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
  } else {
    res.locals.query = false;
    next();
  }
};
