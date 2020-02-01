import os
import requests
import csv
import re
BACKEND_URL = os.environ.get("BACKEND_URL") | "localhost:3000"
if __name__ == "__main__":
    
    

    

def addRecipe():
    r = requests.get(BACKEND_URL+ "/api/recipes")
    recipesID = r.json()
    for x in recipesID:
        r=requests.get(BACKEND_URL+ "/api/ratings/"+x)
        master = calculateNewMasterRecipe(r.json())
        requests.post(BACKEND_URL+"/api/ratings/"+x,data = master)


def getTempAndTime(recipeVar):
    temps={}
    str = recipeVar['instructions']
    values = [int(s) for s in str.split() if s.isdigit()]
    countTime = 0
    for x in values:
        temps['T'+countTime] = x
        count+=1
    return temps

def editInstructions(newTemps,recipeVar)
    for i, recipeVar in enumerate():
    if c.isdigit():

def addVariation():


def calculateNewMasterRecipe(recipeVariations):

    numberOfVariations = recipeVariations.length()
    master = recipeVariation[0]
    masterRecipe = master["recipe"]
    masterIngredients = masterRecipe["ingredients"]
    sumOfIngredientVariations = masterIngredients

    masterInstructions = getTempAndTime(masterRecipe["instructions"])
    sumOfInstructionVariations = masterInstructions



    #get master ingredient list

    for ingredient in sumOfIngredientVariations:
        sumOfIngredientVariations[ingredient] = 0
    
    for instruction in sumOfInstructionVariations:
        sumOfInstructionVariations[instruction] = 0

    
    #need to fix first for loop, variation in recipeVariations has issue whether it is the value, or key
    for variation in recipeVariations:
        


        recipeVariation = variation["recipe"]
        ingredients = recipeVariation["ingredients"]
        rating = variation["rating"]

        instruction = getTempAndTime(recipeVariation["instructions"])

        for ingredient in ingredients:
            if ingredients[ingredient] != masterIngredients[ingredient]:

                variationDelta = ((ingredients[ingredient] - masterIngredients[ingredient])*rating)/(5*numberOfVariations)
                sumOfIngredientVariations[ingredient] += variationDelta
                break

        for instruction in instructions:
            if instructions[instruction] != masterInstructions[instruction]:

                variationDelta = ((instructions[instruction] - masterIngredients[ingredient])*rating)/(5*numberOfVariations)
                sumOfInstructionVariations[instruction] += variationDelta
                break
    

    for instruction in sumOfInstructionVariations:
        masterInstructions[instruction] += sumOfInstructionVariations[instruction]
    
    for ingredient in sumOfIngredientVariations:
        masterIngredients[ingredient] += sumOfIngredientVariations[ingredient]

    masterRecipe["instructions"] = masterInstructions
    masterRecipe["ingredients"] = masterIngredients

    return masterRecipe
    





def calculateRatingValue()
        
        

