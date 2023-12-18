import readlineSync from 'readline-sync';
import { show } from "./utils/show";
import { RiceCooker } from './model/rice-cooker';

export const app = async() => {
    let choice;
    const riceCooker = new RiceCooker();
    while (true) {
        show('Appuyer sur un chiffre pour éxecuter une action: ' + 
        '\n 1 - Ajouter de l\'eau' + 
        '\n 2 - Cuire du riz' + 
        '\n 3 - Réchauffer un ingrédient' + 
        '\n 4 - Afficher les configurations globales' + 
        '\n 5 - Changer les configurations globales' + 
        '\n 0 - Sortir \n');

        choice = readlineSync.question('Votre choix : ');
        
        switch (choice) {
            case '1':
                console.clear();
                riceCooker.addWater();
                break;
            case '2':
                console.clear();
                if(riceCooker.hasWater === false){
                    show('\n Il faut ajouter de l\'eau avant de cuire \n');
                }else{
                    const elementType = readlineSync.question('Que voulez cuire ?(vary gasy/vary mena/tsipala): ');
                    const cookingTime = parseInt(readlineSync.question('Temps de cuisson (en secondes) : '), 10);
                    if (isNaN(cookingTime)) {
                        show('Temps de cuisson non valide');
                        break
                    }else{
                        await riceCooker.startCooking(elementType, cookingTime);
                        break
                    }
                }
                break
            case '3':
                console.clear();
                if(riceCooker.hasWater === false){
                    show('\n Il faut ajouter de l\'eau avant de réchauffer \n');
                    break
                }else{
                    const elementType = readlineSync.question('Que voulez réchauffer ?(ronono/vary/laoka): ');
                    await riceCooker.startReheating(elementType);
                    break
                }
            case '4':
                console.clear();
                riceCooker.showConfiguration();
                break;
            case '5':
                console.clear();
                const configuration = readlineSync.question('Entrez une nouvelle température: ');
                riceCooker.changeConfiguration(configuration);
                break;
            case '0':
                break;  
            default:
                console.clear();
                show('\n Choix non valide. Veuillez saisir un chiffre de 1 et 0. \n');
                break;
            }
        if (choice === '0') {
            break;
        }
    }
}

app();