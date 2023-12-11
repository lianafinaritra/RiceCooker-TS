package rice

import (
	"fmt"
	"strconv"
	"time"
)

type Element struct {
	Name string
	Time int
}

var Ingredients = []Element{
	{Name: "ronono", Time: 3},
	{Name: "vary", Time: 4},
	{Name: "laoka", Time: 5},
}

var Elements = []Element{
	{Name: "vary gasy", Time: 3},
	{Name: "vary mena", Time: 4},
	{Name: "tsipala", Time: 5},
}

type RiceCooker struct {
	isCooking   bool
	temperature string
	hasWater    bool
}

var done = make(chan bool)

func show(text string) {
	fmt.Println(text)
}

func NewRiceCooker() RiceCooker {
	return RiceCooker{}
}

func (rc *RiceCooker) HasWater() bool {
	return rc.hasWater
}

func (rc *RiceCooker) ShowLoadingAnimation(isReheating bool) {
	frames := []string{"(°)", "(¬)", "(°)", "(¬)"}
	frameIndex := 0

	animationInterval := time.NewTicker(500 * time.Millisecond)
	defer animationInterval.Stop()

	for range animationInterval.C {
		var message string
		if isReheating {
			message = fmt.Sprintf("\r%s En train de réchauffer...", frames[frameIndex])
		} else {
			message = fmt.Sprintf("\r%s En cours de cuisson...", frames[frameIndex])
		}
		fmt.Print(message)
		frameIndex = (frameIndex + 1) % len(frames)
	}

	done <- true
}

func (rc *RiceCooker) AddWater() {
	rc.hasWater = true
}

func (rc *RiceCooker) ShowConfiguration() {
	show(fmt.Sprintf("\n La température globale de cuisson est: %s° \n", rc.temperature))
}

func (rc *RiceCooker) ChangeConfiguration(newTemp string) {
	_, err := strconv.Atoi(newTemp)
	if err != nil {
		show("\n Température invalide \n")
	} else {
		rc.temperature = newTemp
	}
}

func (rc *RiceCooker) StartReheating(elementType string) {
	if elementType == "ronono" || elementType == "vary" || elementType == "laoka" {
		searchType := findIngredient(elementType, Ingredients)
		if searchType != nil {
			rc.isCooking = true
			rc.hasWater = false
			go func() {
				rc.ShowLoadingAnimation(true)
				heatingTime := searchType.Time
				time.Sleep(time.Duration(heatingTime) * time.Second)
				fmt.Println("\n Réchauffement terminé \n")
				rc.StopCooking()
			}()
		} else {
			show("Le rice cooker ne peut pas réchauffer ce type d'élément")
		}
	} else {
		show("Le rice cooker ne peut pas réchauffer ce type d'élément")
	}
}

func (rc *RiceCooker) StartCooking(elementType string, cookingTime int) {
	if elementType == "vary gasy" || elementType == "vary mena" || elementType == "tsipala" {
		searchType := findElement(elementType, Elements)
		if searchType != nil {
			rc.isCooking = true
			rc.hasWater = false
			go func() {
				rc.ShowLoadingAnimation(false)
				limite := searchType.Time
				time.Sleep(time.Duration(cookingTime) * time.Second)
				rc.StopCooking()
				switch {
				case cookingTime > limite-1 && limite+2 > cookingTime:
					fmt.Println("\n Le riz est cuit. \n")
				case limite > cookingTime:
					fmt.Println("\n Le riz n'est pas assez cuit, il manque du temps \n")
				default:
					fmt.Println("\n Trop longtemps, le riz est brulé \n")
				}
			}()
		} else {
			show("Le rice cooker ne peut pas cuire ce type d'élément")
		}
	} else {
		show("Le rice cooker ne peut pas cuire ce type d'élément")
	}
}

func (rc *RiceCooker) StopCooking() {
	if rc.isCooking {
		rc.isCooking = false
		<-done
	} else {
		show("\n Le rice cooker n'est pas en train de cuire. \n")
	}
}

func findIngredient(name string, list []Element) *Element {
	for _, item := range list {
		if item.Name == name {
			return &item
		}
	}
	return nil
}

func findElement(name string, list []Element) *Element {
	for _, item := range list {
		if item.Name == name {
			return &item
		}
	}
	return nil
}
