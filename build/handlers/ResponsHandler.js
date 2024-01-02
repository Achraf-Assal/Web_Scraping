"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccasHandler = exports.ErrorHandler = void 0;
const ErrorHandler = (errorMsg, errorState, res) => {
    res.status(errorState).json(errorMsg);
};
exports.ErrorHandler = ErrorHandler;
const SuccasHandler = (errorMsg, errorState, res) => {
    res.status(errorState).json(errorMsg);
};
exports.SuccasHandler = SuccasHandler;
