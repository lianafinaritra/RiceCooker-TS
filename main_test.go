package main

import (
	"os/exec"
	"strings"
	"testing"
)

func TestAppOutput(t *testing.T) {
	cmd := exec.Command("go", "run", "main.go")

	out, err := cmd.CombinedOutput()
	if err != nil {
		t.Fatalf("Erreur lors de l'exécution du programme : %v", err)
	}

	expectedStrings := []string{
		"Appuyer sur un chiffre pour éxecuter une action:",
		"1 - Ajouter de l'eau",
		"2 - Cuire du riz",
		"3 - Réchauffer un ingrédient",
		"4 - Afficher les configurations globales",
		"5 - Changer les configurations globales",
		"0 - Sortir",
	}

	for _, expected := range expectedStrings {
		if !strings.Contains(string(out), expected) {
			t.Errorf("La sortie ne contient pas '%s'", expected)
		}
	}
}
