from typing import List
import asyncio

from constants.elements import Elements
from constants.ingredients import Ingredients

class RiceCooker:
    def __init__(self):
        self.isCooking: bool = False
        self.temperature: str = "32"
        self.hasWater: bool = False

    async def showLoadingAnimation(self, isReheating: bool) -> None:
        frames: List[str] = ['(°)', '(¬)', '(°)', '(¬)']
        frameIndex: int = 0

        async def animationCallback() -> None:
            nonlocal frameIndex
            nonlocal isReheating
            while True:
                output = f"\r{frames[frameIndex]} En train de réchauffer..." if isReheating else f"\r{frames[frameIndex]} En cours de cuisson..."
                print(output, end='', flush=True)
                frameIndex = (frameIndex + 1) % len(frames)
                await asyncio.sleep(0.5)

        animation_task = asyncio.create_task(animationCallback())
        return animation_task

    def addWater(self) -> None:
        self.hasWater = True

    def showConfiguration(self) -> None:
        print(f"\n La température de globale de cuisson est: {self.temperature}° \n")

    def changeConfiguration(self, newTemp: str) -> None:
        convertedTemp = int(newTemp) if newTemp.isdigit() else None
        if convertedTemp is None:
            print('\n Température invalide \n')
        else:
            self.temperature = newTemp

    async def startReheating(self, elementType: str) -> None:
        if elementType in {"ronono", "vary", "laoka"}:
            searchType = next((item for item in Ingredients if item.name == elementType), None)
            self.isCooking = True
            self.hasWater = False
            loadingAnimation = await self.showLoadingAnimation(True)
            heatingTime = searchType.time if searchType else 5

            try:
                await asyncio.sleep(heatingTime)
            except Exception as error:
                print('\n Cuisson interrompue \n')
                loadingAnimation.cancel()
                self.stopCooking()

            loadingAnimation.cancel()
            print('\n Réchauffement terminé \n')
            self.stopCooking()

        else:
            print("Le rice cooker ne peut pas réchauffer ce type d'élément")

    async def startCooking(self, elementType: str, cookingTime: int) -> None:
        if elementType in {"vary gasy", "vary mena", "tsipala"}:
            searchType = next((item for item in Elements if item.name == elementType), None)
            self.isCooking = True
            self.hasWater = False
            loadingAnimation = await self.showLoadingAnimation(False)
            limit = searchType.time if searchType else 5

            try:
                await asyncio.sleep(cookingTime)
            except Exception as error:
                print('\n Cuisson interrompue \n')
                loadingAnimation.cancel()
                self.stopCooking()

            loadingAnimation.cancel()

            if limit > cookingTime:
                print('\n Le riz n\'est pas assez cuit, il manque du temps \n')
            elif limit - 1 < cookingTime < limit + 2:
                print('\n Le riz est cuit. \n')
            else:
                print('\n Trop longtemps, le riz est brulé \n')

            self.stopCooking()

        else:
            print("Le rice cooker ne peut pas cuire ce type d'élément")

    def stopCooking(self) -> None:
        if self.isCooking:
            self.isCooking = False
            print('\n Le rice cooker n\'est pas en train de cuire. \n')
        else:
            print('\n Le rice cooker n\'est pas en train de cuire. \n')
