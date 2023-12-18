package main

import (
	"fmt"
	"strconv"
	"rice_cooker_go/rice"
)

func main() {
	app()
}

func app() {
	var choice string
	riceCooker := rice.NewRiceCooker()

	for {
		fmt.Print("Appuyer sur un chiffre pour éxecuter une action: " +
			"\n 1 - Ajouter de l'eau" +
			"\n 2 - Cuire du riz" +
			"\n 3 - Réchauffer un ingrédient" +
			"\n 4 - Afficher les configurations globales" +
			"\n 5 - Changer les configurations globales" +
			"\n 0 - Sortir \n")

		fmt.Print("Votre choix : ")
		fmt.Scanln(&choice)

		switch choice {
		case "1":
			clearConsole()
			riceCooker.AddWater()
		case "2":
			clearConsole()
			if !riceCooker.HasWater() {
				fmt.Println("\n Il faut ajouter de l'eau avant de cuire")
			} else {
				var elementType string
				fmt.Print("Que voulez cuire ? (vary gasy/vary mena/tsipala): ")
				fmt.Scanln(&elementType)

				var cookingTimeStr string
				fmt.Print("Temps de cuisson (en secondes) : ")
				fmt.Scanln(&cookingTimeStr)

				cookingTime, err := strconv.Atoi(cookingTimeStr)
				if err != nil {
					fmt.Println("Temps de cuisson non valide")
					break
				}else {
					riceCooker.StartCooking(elementType, cookingTime)
					break
				}
			}
		case "3":
			clearConsole()
			if !riceCooker.HasWater() {
				fmt.Println("\n Il faut ajouter de l'eau avant de réchauffer")
			} else {
				var elementType string
				fmt.Print("Que voulez réchauffer ? (ronono/vary/laoka): ")
				fmt.Scanln(&elementType)
				riceCooker.StartReheating(elementType)
				break
			}
		case "4":
			clearConsole()
			riceCooker.ShowConfiguration()
		case "5":
			clearConsole()
			var configuration string
			fmt.Print("Entrez une nouvelle température: ")
			fmt.Scanln(&configuration)
			riceCooker.ChangeConfiguration(configuration)
		case "0":
			return
		default:
			clearConsole()
			fmt.Println("\n Choix non valide. Veuillez saisir un chiffre de 1 à 5 ou 0.")
		}
	}
}

func clearConsole() {
	fmt.Print("\033[H\033[2J")
}
