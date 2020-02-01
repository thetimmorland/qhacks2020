import os
import requests
import csv
BACKEND_URL = os.environ.get("BACKEND_URL") | "localhost:3000"
if __name__ == "__main__":
    
    recipes[]

    

def addRecipe():
    r = requests.get(BACKEND_URL+ "/api/recipes")
    recipesID = r.json()
    for x in recipesID:
        r=requests.get(BACKEND_URL+ "/api/ratings/"+x)
        master = calculateNewMasterRecipe(r.json())
        requests.post(BACKEND_URL+"/api/ratings/"+x,data = master)




def addVariation():


def calculateNewMasterRecipe(recipeVariations):

    numberOfVariations = recipeVariations.length()
    master = recipeVariation[0]
    masterRecipe = master["recipe"]
    masterIngredients = masterRecipe["ingredients"]
    sumOfVariations = masterIngredients

    for ingredient in sumOfVariations:
        sumOfVariations[ingredient] = 0
    


    
    #need to fix first for loop, variation in recipeVariations has issue whether it is the value, or key
    for variation in recipeVariations:
        


        recipeVariation = variation["recipe"]
        ingredients = recipeVariation["ingredients"]
        rating = variation["score"]

        instruction = getTempAndTime(recipeVariation["instructions"])

        for ingredient in ingredients:
            if ingredients[ingredient] != masterIngredients[ingredient]:

                variationDelta = ((ingredients[ingredient] - masterIngredients[ingredient])*rating)/(5*numberOfVariations)
                sumOfVariations[ingredient] += variationDelta
                break

        for instruction in instructions

    





def calculateRatingValue()
        
        

