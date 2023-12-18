import { Elements } from "../constants/elements";
import { Ingredients } from "../constants/ingredients";
import { show } from "../utils/show";

export class RiceCooker {
    public isCooking: boolean = false;
    private temperature: string = "32";
    public hasWater = false;

    private showLoadingAnimation(isReheating: boolean): NodeJS.Timeout {
      const frames = ['(°)', '(¬)', '(°)', '(¬)'];
      let frameIndex = 0;

        const animationInterval = setInterval(() => {
          isReheating ? process.stdout.write(`\r${frames[frameIndex]} En train de réchauffer...`) : process.stdout.write(`\r${frames[frameIndex]} En cours de cuisson...`);
          frameIndex = (frameIndex + 1) % frames.length;
        }, 500);
  
      return animationInterval;
    }

    addWater(): void {
      this.hasWater = true;
    }

    showConfiguration(): void {
      show(`\n La température de globale de cuisson est: ${this.temperature}° \n`)
    } 

    changeConfiguration(newTemp: string): void{
      const convertedTemp = parseInt(newTemp);
      if(isNaN(convertedTemp)){
        show('\n Température invalide \n');
      }else{
        this.temperature = newTemp;
      }
    }

    async startReheating (elementType: string): Promise<void> {
      if((elementType === "ronono") || (elementType === "vary") || (elementType === "laoka")){
        const searchType = Ingredients.find(item => item.name === elementType);
        this.isCooking = true;
        this.hasWater = false
        const loadingAnimation = this.showLoadingAnimation(true);
        const heatingTime = searchType?.time ?? 5

        try {
          await new Promise(resolve => setTimeout(resolve,heatingTime * 1000));
        } catch (error) {
          show('\n Cuisson interrompue \n');
          clearInterval(loadingAnimation);
          this.stopCooking();
        }

        clearInterval(loadingAnimation);

      show('\n Réchauffement terminé \n');

      this.stopCooking();

      }else{
        show("Le rice cooker ne peut pas réchauffer ce type d'élément")
      }
    }
  
    async startCooking (elementType: string, cookingTime: number): Promise<void> {
      if((elementType === "vary gasy") || (elementType === "vary mena") || (elementType === "tsipala")){
        const searchType = Elements.find(item => item.name === elementType);
        this.isCooking = true;
        this.hasWater = false
        const loadingAnimation = this.showLoadingAnimation(false);
        const limite = searchType?.time ?? 5;

        try {
          await new Promise(resolve => setTimeout(resolve, cookingTime * 1000));
        } catch (error) {
          show('\n Cuisson interrompue \n');
          clearInterval(loadingAnimation);
          this.stopCooking();
        }

        clearInterval(loadingAnimation);

      if (limite > cookingTime) {
        show('\n Le riz n\'est pas assez cuit, il manque du temps \n');
      } else if ((cookingTime > limite - 1) && (limite + 2 > cookingTime)) {
        show('\n Le riz est cuit. \n');
      } else {
        show('\n Trop longtemps, le riz est brulé \n');
      }

      this.stopCooking();

      }else{
        show("Le rice cooker ne peut pas cuire ce type d'élément")
      }
    }

    stopCooking(): void {
      if (this.isCooking) {
        this.isCooking = false;
        process.stdin.removeAllListeners('data');
      } else {
        show('\n Le rice cooker n\'est pas en train de cuire. \n');
      }
    }
  }
  