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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const show_1 = require("./utils/show");
const rice_cooker_1 = require("./model/rice-cooker");
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    let choice;
    const riceCooker = new rice_cooker_1.RiceCooker();
    while (true) {
        (0, show_1.show)('Appuyer sur un chiffre pour éxecuter une action: ' +
            '\n 1 - Ajouter de l\'eau' +
            '\n 2 - Cuire du riz' +
            '\n 3 - Réchauffer un ingrédient' +
            '\n 4 - Afficher les configurations globales' +
            '\n 5 - Changer les configurations globales' +
            '\n 0 - Sortir \n');
        choice = readline_sync_1.default.question('Votre choix : ');
        switch (choice) {
            case '1':
                console.clear();
                riceCooker.addWater();
                break;
            case '2':
                console.clear();
                if (riceCooker.hasWater === false) {
                    (0, show_1.show)('\n Il faut ajouter de l\'eau avant de cuire \n');
                }
                else {
                    const elementType = readline_sync_1.default.question('Que voulez cuire ?(vary gasy/vary mena/tsipala): ');
                    const cookingTime = parseInt(readline_sync_1.default.question('Temps de cuisson (en secondes) : '), 10);
                    if (isNaN(cookingTime)) {
                        (0, show_1.show)('Temps de cuisson non valide');
                        break;
                    }
                    else {
                        yield riceCooker.startCooking(elementType, cookingTime);
                        break;
                    }
                }
                break;
            case '3':
                console.clear();
                if (riceCooker.hasWater === false) {
                    (0, show_1.show)('\n Il faut ajouter de l\'eau avant de réchauffer \n');
                    break;
                }
                else {
                    const elementType = readline_sync_1.default.question('Que voulez réchauffer ?(ronono/vary/laoka): ');
                    yield riceCooker.startReheating(elementType);
                    break;
                }
            case '4':
                console.clear();
                riceCooker.showConfiguration();
                break;
            case '5':
                console.clear();
                const configuration = readline_sync_1.default.question('Entrez une nouvelle température: ');
                riceCooker.changeConfiguration(configuration);
                break;
            case '0':
                break;
            default:
                console.clear();
                (0, show_1.show)('\n Choix non valide. Veuillez saisir un chiffre de 1 et 0. \n');
                break;
        }
        if (choice === '0') {
            break;
        }
    }
});
app();
