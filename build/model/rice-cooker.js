"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RiceCooker = void 0;
const elements_1 = require("../constants/elements");
const ingredients_1 = require("../constants/ingredients");
const show_1 = require("../utils/show");
class RiceCooker {
    constructor() {
        this.isCooking = false;
        this.temperature = "32";
        this.hasWater = false;
    }
    showLoadingAnimation(isReheating) {
        const frames = ['(°)', '(¬)', '(°)', '(¬)'];
        let frameIndex = 0;
        const animationInterval = setInterval(() => {
            isReheating ? process.stdout.write(`\r${frames[frameIndex]} En train de réchauffer...`) : process.stdout.write(`\r${frames[frameIndex]} En cours de cuisson...`);
            frameIndex = (frameIndex + 1) % frames.length;
        }, 500);
        return animationInterval;
    }
    addWater() {
        this.hasWater = true;
    }
    showConfiguration() {
        (0, show_1.show)(`\n La température de globale de cuisson est: ${this.temperature}° \n`);
    }
    changeConfiguration(newTemp) {
        const convertedTemp = parseInt(newTemp);
        if (isNaN(convertedTemp)) {
            (0, show_1.show)('\n Température invalide \n');
        }
        else {
            this.temperature = newTemp;
        }
    }
    startReheating(elementType) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((elementType === "ronono") || (elementType === "vary") || (elementType === "laoka")) {
                const searchType = ingredients_1.Ingredients.find(item => item.name === elementType);
                this.isCooking = true;
                this.hasWater = false;
                const loadingAnimation = this.showLoadingAnimation(true);
                const heatingTime = (_a = searchType === null || searchType === void 0 ? void 0 : searchType.time) !== null && _a !== void 0 ? _a : 5;
                try {
                    yield new Promise(resolve => setTimeout(resolve, heatingTime * 1000));
                }
                catch (error) {
                    (0, show_1.show)('\n Cuisson interrompue \n');
                    clearInterval(loadingAnimation);
                    this.stopCooking();
                }
                clearInterval(loadingAnimation);
                (0, show_1.show)('\n Réchauffement terminé \n');
                this.stopCooking();
            }
            else {
                (0, show_1.show)("Le rice cooker ne peut pas réchauffer ce type d'élément");
            }
        });
    }
    startCooking(elementType, cookingTime) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if ((elementType === "vary gasy") || (elementType === "vary mena") || (elementType === "tsipala")) {
                const searchType = elements_1.Elements.find(item => item.name === elementType);
                this.isCooking = true;
                this.hasWater = false;
                const loadingAnimation = this.showLoadingAnimation(false);
                const limite = (_a = searchType === null || searchType === void 0 ? void 0 : searchType.time) !== null && _a !== void 0 ? _a : 5;
                try {
                    yield new Promise(resolve => setTimeout(resolve, cookingTime * 1000));
                }
                catch (error) {
                    (0, show_1.show)('\n Cuisson interrompue \n');
                    clearInterval(loadingAnimation);
                    this.stopCooking();
                }
                clearInterval(loadingAnimation);
                if (limite > cookingTime) {
                    (0, show_1.show)('\n Le riz n\'est pas assez cuit, il manque du temps \n');
                }
                else if ((cookingTime > limite - 1) && (limite + 2 > cookingTime)) {
                    (0, show_1.show)('\n Le riz est cuit. \n');
                }
                else {
                    (0, show_1.show)('\n Trop longtemps, le riz est brulé \n');
                }
                this.stopCooking();
            }
            else {
                (0, show_1.show)("Le rice cooker ne peut pas cuire ce type d'élément");
            }
        });
    }
    stopCooking() {
        if (this.isCooking) {
            this.isCooking = false;
            process.stdin.removeAllListeners('data');
        }
        else {
            (0, show_1.show)('\n Le rice cooker n\'est pas en train de cuire. \n');
        }
    }
}
exports.RiceCooker = RiceCooker;
