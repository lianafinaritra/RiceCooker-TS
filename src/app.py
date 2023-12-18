import asyncio
from model.rice_cooker import RiceCooker

async def app():
    choice = ''
    rice_cooker = RiceCooker()

    while True:
        print('Appuyez sur un chiffre pour exécuter une action:' +
              '\n 1 - Ajouter de l\'eau' +
              '\n 2 - Cuire du riz' +
              '\n 3 - Réchauffer un ingrédient' +
              '\n 4 - Afficher les configurations globales' +
              '\n 5 - Changer les configurations globales' +
              '\n 0 - Sortir \n')

        choice = input('Votre choix : ')

        if choice == '1':
            print('\033c')
            rice_cooker.addWater()

        elif choice == '2':
            print('\033c')
            if not rice_cooker.hasWater:
                print('\n Il faut ajouter de l\'eau avant de cuire \n')
            else:
                element_type = input('Que voulez cuire ?(vary gasy/vary mena/tsipala): ')
                cooking_time_str = input('Temps de cuisson (en secondes) : ')
                try:
                    cooking_time = int(cooking_time_str)
                except ValueError:
                    print('Temps de cuisson non valide')
                    continue

                await rice_cooker.startCooking(element_type, cooking_time)

        elif choice == '3':
            print('\033c')
            if not rice_cooker.hasWater:
                print('\n Il faut ajouter de l\'eau avant de réchauffer \n')
            else:
                element_type = input('Que voulez réchauffer ?(ronono/vary/laoka): ')
                await rice_cooker.startReheating(element_type)

        elif choice == '4':
            print('\033c')
            rice_cooker.showConfiguration()

        elif choice == '5':
            print('\033c')
            new_configuration = input('Entrez une nouvelle température: ')
            rice_cooker.changeConfiguration(new_configuration)

        elif choice == '0':
            break

        else:
            print('\033c')
            print('\n Choix non valide. Veuillez saisir un chiffre de 1 à 5 ou 0. \n')

if __name__ == "__main__":
    asyncio.run(app())
