"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProduct = exports.getProducts = exports.welcome = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.welcome = (req, res) => {
    res.json({
        message: "Hola Mundo"
    });
};
exports.getProducts = (req, res) => {
    fs_1.default.readFile(path_1.default.join(__dirname, '..', 'products.json'), (error, data) => {
        if (!error) {
            const products = JSON.parse(data.toString('utf-8'));
            res.status(200).json(products);
        }
        else {
            res.status(400).json({ error: error, message: "No se pudo leer el archivo" });
        }
    });
};
exports.postProduct = (req, res) => {
    fs_1.default.readFile(path_1.default.join(__dirname, '..', 'products.json'), (error, data) => {
        if (!error) {
            const products = JSON.parse(data.toString('utf-8'));
            products.push(req.body);
            // const {name, description, price, category, imgUrl} = req.body;
            fs_1.default.writeFile(path_1.default.join(__dirname, '..', 'products.json'), JSON.stringify(products), (error) => {
                if (error) {
                    res.status(400).json({ error: error, message: "No se pudo agregar el producto" });
                }
                res.status(200).json({ message: "Se ha agregado el producto", products: req.body });
            });
            // res.status(200).json(products);
        }
        else {
            res.status(400).json({ error: error, message: "No se pudo leer el archivo" });
        }
    });
};
