import os
import requests
import csv
import re
BACKEND_URL = os.environ.get("BACKEND_URL") | "localhost:3000"
example={
      name: "Cake",
        notes: "This recipe is very good. I make it all the time with my kids!",
        ingredients: [
            { name: "Eggs", amount: 2, unit: "" },
            { name: "Flour", amount: 2, unit: "Cups" },
            { name: "Sugar", amount: 2, unit: "Cups" },
            { name: "Baking Soda", amount: 2, unit: "Teaspoons" },
        ],
        instructions: [
            "Add flour.",
            "Create well in flour.",
            "Crack egg in well.",
            "heat oven to 200 C",
            "cook for 20 min",
        ],
    }
#if __name__ == "__main__":
    
    

    

def addRecipe():
    r = requests.get(BACKEND_URL+ "/api/recipes")
    recipesID = r.json()
    for x in recipesID:
        r=requests.get(BACKEND_URL+ "/api/ratings/"+x)
        master = calculateNewMasterRecipe(r.json())
        requests.post(BACKEND_URL+"/api/ratings/"+x,data = master)


def getTempAndTime(recipeVar):
    temps={}
    strings = recipeVar['instructions']
    values = []
    for string in strings:
        values += [int(s) for s in strings.split() if s.isdigit()]
        countTime = 0
        for x in values:
            temps['T'+countTime] = x
            count+=1
        if count ==0
            temps[0]=-1
    return temps

def editInstructions(newTemps,recipeVar)
    temps=getTempAndTime(recipeVar['instructions'])
    newInstruct = recipeVar['instructions']
    count = 0
    for(x in temp):
        for s in range(len(newInstruct)):
            if(newInstruct[s].rpartition(x)[2]!=""):
                newInstruct[s] = newInstruct[s].rpartition(temps[count])[0]+x+newInstruct[s].rpartition(x)[2]
                count+=1
                break
    
    return newInstruct


    

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

        

