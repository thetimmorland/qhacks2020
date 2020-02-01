import os
import requests
import csv
import re
import random
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
#end addRecipe

def getTempAndTime(recipeVar):
    temps={}
    values = []
    for string in recipeVar:
        values += [int(s) for s in recipeVar.split() if s.isdigit()]
        countTime = 0
        for x in values:
            temps['T'+countTime] = x
            count+=1
    if count == 0
        temps[0]=-1
    return temps
#end getTempAndTime

def editInstructions(newTemps,recipeVar):
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
#end editInstructions

    

def addVariation():


def calculateNewMasterRecipe(recipeVariations):
    ratingRange = 5
    numberOfVariations = len(recipeVariations)
    master = recipeVariation[0]
    masterRecipe = master["recipe"]
    masterIngredients = masterRecipe["ingredients"] #array of dicts
    sumOfIngredientVariations = masterIngredients

    masterInstructions = getTempAndTime(masterRecipe["instructions"]) # is an array of numbers
    sumOfInstructionVariations = masterInstructions #is an array of numbers

    #recipeVariations is an array of dictionaries recipeVariations[index][dict][dict]


    #get master ingredient list

    for ingredient in sumOfIngredientVariations:#looping through an array of dict
        ingredient['amount'] = 0#changing the amount of variation on each ingredient to start at 0
    
    for instruction in range(len(sumOfInstructionVariations)):#looping through an array of dict
        sumOfInstructionVariations['instruction'] = 0#changing the amount of variation on each ingredient to start at 0

    
    #need to fix first for loop, variation in recipeVariations has issue whether it is the value, or key
    for variation in recipeVariations:
        


        #recipeVariation = variation["recipe"]
        #ingredients = recipeVariation["ingredients"]
        #rating = variation["rating"]

        ingredients = variation["recipe"]["ingredients"]
        rating = variation["rating"]

        instruction = getTempAndTime(variation["recipe"]["instructions"])
        change = False
        for ingredient in ingredients:
            if ingredients[ingredient]["amount"] != masterIngredients[ingredient]:

                variationDelta = ((ingredients[ingredient]["amount"] - masterIngredients[ingredient])*rating)/(ratingRange*numberOfVariations)
                sumOfIngredientVariations[ingredient] += variationDelta
                change = true
                break

        #check if instruction has no numbers, jaspers function will return a -1
        if not change:
            for instruction in instructions:
             if instructions[instruction] != masterInstructions[instruction]:
                variationDelta = ((instructions[instruction] - masterIngredients[ingredient])*rating)/(ratingRange*numberOfVariations)
                sumOfInstructionVariations[instruction] += variationDelta
                break
    

    for instruction in sumOfInstructionVariations:
        masterInstructions[instruction] += sumOfInstructionVariations[instruction]
    
    for ingredient in sumOfIngredientVariations:
        masterIngredients[ingredient] += sumOfIngredientVariations[ingredient]

    masterRecipe["instructions"] = masterInstructions
    masterRecipe["ingredients"] = masterIngredients

    return masterRecipe
    #end calculateNewMasterRecipe





def createRecipeVariations(exampleRecipe, numberOfVariations):

    recipeIngredients = exampleRecipe["ingredients"]
    recipeInstructions = exampleRecipe["instructions"]

    random.seed()

    allVariations[numberOfVariations]

    for i in range(numberOfVariations):
        temporaryRecipe={}
        temporaryIngredients={}
        temporaryInstructions={}
        count = 0
    if(random.random()>0.5):
        index = random.random()*(len(recipeIngredients)-1)
        for ingredient in recipeIngredients:
            count+=1
            if(count  = index)
                amountToChange = recipeIngredients[ingredient] * (random.random() * .1 + .95)
                temporaryIngredients[ingredient] = amountToChange
     else   
        index = random.random()*(len(recipeInstructions)-1)
        for instruction in recipeInstructions:
            count+=1
            if count == index:
                amountToChange = recipeInstruction[instruction] * (random.rand() * .1 + .95)
                temporaryInstructions[instruction] = amountToChange
        
        temporaryRecipe["ingredients"] = temporaryIngredients
        temporaryRecipe["instructions"] = temporaryInstructions

        finalObject["recipe"] = temporaryRecipe
        finalObject["rating"] = int((random.random() * 5)) + 1
#end createRecipeVariations







        

