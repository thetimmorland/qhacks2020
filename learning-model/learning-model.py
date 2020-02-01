import os
import requests
import csv
import re
import random
import copy
from collections import defaultdict
BACKEND_URL = os.environ.get("BACKEND_URL") or "localhost:3000"


def copyArrOfDict(x):
    cpy_list = []
    for li in x:
        d2 = copy.deepcopy(li)
        cpy_list.append(d2)
    return cpy_list


def addRecipe():
    r = requests.get(BACKEND_URL + "/api/recipes")
    recipesID = r.json()
    for x in recipesID:
        r = requests.get(BACKEND_URL + "/api/ratings/" + x)
        master = calculateNewMasterRecipe(r.json())
        requests.post(BACKEND_URL + "/api/ratings/" + x, data=master)


# end addRecipe


def getTempAndTime(recipeVar):
    temps = []
    values = []
    for string in recipeVar:
        values += re.findall(r"[-+]?\d*\.\d+|\d+", string)
    if not values:
        temps[0] = -1
    for x in range(len(values)):
        try:
            values[x]= float(values[x])
        except:
            print("error not a float")
    return values


# end getTempAndTime


def editInstructions(newTemps, recipeVar):
    oldtemps = getTempAndTime(recipeVar)
    newInstruct = recipeVar.copy()
    count = 0
    if (len(newTemps) != len(oldtemps)):
        print("error line 82 newTemps is blank")
    else:
        for x in oldtemps:
            for s in range(len(newInstruct)):
                if (newInstruct[s].rpartition(str(x))[1] != ""):
                    textToEdit = newInstruct[s].rpartition(str(
                        oldtemps[count]))
                    newInstruct[s] = textToEdit[0] + str(
                        newTemps[count]) + textToEdit[2]
                    count += 1
                    break

    return newInstruct


# end editInstructions


def calculateNewMasterRecipe(recipeVariations):
    ratingRange = 5
    numberOfVariations = len(recipeVariations)
    # print(recipeVariations[0])
    master = recipeVariations[0].copy()
    masterRecipe = master["recipe"].copy()
    masterIngredients = copyArrOfDict(masterRecipe["ingredients"])
    sumOfIngredientVariations = copyArrOfDict(masterIngredients)

    masterInstructions = getTempAndTime(masterRecipe["instructions"])  # is an array of numbers
    sumOfInstructionVariations = copyArrOfDict(getTempAndTime( masterRecipe["instructions"]))  # is an array of numbers

    # recipeVariations is an array of dictionaries recipeVariations[index][dict][dict]

    # get master ingredient list

    # print(masterIngredients)

    for ingredientIndex in range(
            len(sumOfIngredientVariations)):  # looping through an array of dict
        sumOfIngredientVariations[ingredientIndex][
            "amount"] = 0  # changing the amount of variation on each ingredient to start at 0

    for instruction in range(len(
            sumOfInstructionVariations)):  # looping through an array of dict
        sumOfInstructionVariations[
            instruction] = 0  # changing the amount of variation on each ingredient to start at 0

    # need to fix first for loop, variation in recipeVariations has issue whether it is the value, or key
    for variation in recipeVariations:

        #recipeVariation = variation["recipe"]
        #ingredients = recipeVariation["ingredients"]
        #rating = variation["rating"]

        ingredients = copyArrOfDict(variation["recipe"]['ingredients'])
        # print(ingredients)
        rating = variation["rating"]

        instruction = getTempAndTime(variation["recipe"]["instructions"])
        change = False
        # print(ingredients)
        # print(masterIngredients)
        for num in range(len(ingredients)):
            if ingredients[num]["amount"] != masterIngredients[num]["amount"]:

                variationDelta = ((ingredients[num]["amount"] -
                                   masterIngredients[num]["amount"]) *
                                  rating) / (ratingRange * numberOfVariations)
                sumOfIngredientVariations[num]["amount"] += variationDelta
                change = True
                break

        # check if instruction has no numbers, jaspers function will return a -1
        if not change:
            for index in range(len(instruction)):
                if instruction[index] != masterInstructions[index]:
                    variationDelta = (
                        (instruction[index] - masterInstructions[index]) *
                        rating) / (5 * numberOfVariations)
                    sumOfInstructionVariations[index] += variationDelta
                    break

    for instruction in range(len(sumOfInstructionVariations)):
        masterInstructions[instruction] += sumOfInstructionVariations[
            instruction]

    for ingredient in range(len(sumOfIngredientVariations)):
        # print(masterIngredients[ingredient]["amount"])
        masterIngredients[ingredient]["amount"] += sumOfIngredientVariations[
            ingredient]["amount"]

    masterRecipe["instructions"] = editInstructions(
        masterInstructions, masterRecipe["instructions"])
    masterRecipe["ingredients"] = masterIngredients

    return masterRecipe
    # end calculateNewMasterRecipe


def createRecipeVariations(exampleRecipe, numberOfVariations):
    changingRange = 0.5
    recipeIngredients = exampleRecipe["recipe"]["ingredients"]
    recipeInstructions = getTempAndTime(
        exampleRecipe["recipe"]["instructions"])
    allVariations = []
    allVariations.append(exampleRecipe)
    random.seed()
   
    for i in range(numberOfVariations):
        ratingChange = 0
        temporaryRecipe = {}
        #temporaryRecipe = defaultdict()
        temporaryIngredients = []
        temporaryInstructions = []
        #temporaryInstructions = defaultdict(list)
        #count = 0
        za = random.random()
        if (za > 0.33):
            index = random.randint(0,(len(recipeIngredients))-1)
            if(index==2):
                ratingChange = 1
        else:
            index = -1
        for ingredientIndex in range(len(recipeIngredients)):
            #count += 1
            if (ingredientIndex == index):
                multiple = (random.random() * changingRange + (1-changingRange/2))
                amountToChange = recipeIngredients[ingredientIndex]["amount"] * multiple
                if multiple<1:
                    ratingChange = -1

                #temporaryIngredients[ingredientIndex]["amount"] = amountToChange
                #temporaryIngredients[ingredientIndex]["name"] = recipeIngredients[ingredientIndex]["name"]
                #temporaryIngredients[ingredientIndex]["unit"] = recipeIngredients[ingredientIndex]["unit"]
                temporaryIngredients.append({
                    "amount":
                    amountToChange,
                    "name":
                    recipeIngredients[ingredientIndex]["name"],
                    "unit":
                    recipeIngredients[ingredientIndex]["unit"]
                })

            else:
                temporaryIngredients.append({
                    "amount":
                    recipeIngredients[ingredientIndex]["amount"],
                    "name":
                    recipeIngredients[ingredientIndex]["name"],
                    "unit":
                    recipeIngredients[ingredientIndex]["unit"]
                })

        if (za <= 0.33):
            index = random.randint(0,len(recipeInstructions)-1)
        else:
            index = -1
        for instruction in range(len(recipeInstructions)):

            if instruction == index:
                amountToChange = recipeInstructions[instruction] * (random.random()* changingRange + (1-changingRange/2))
                temporaryInstructions.append(amountToChange)
            else:
                temporaryInstructions.append(recipeInstructions[instruction])
        temporaryRecipe.update({"ingredients" : temporaryIngredients})
        finalInstructions = editInstructions(temporaryInstructions, exampleRecipe["recipe"]["instructions"])
        temporaryRecipe.update({"instructions" : finalInstructions})

        finalObject = {}
        finalObject["recipe"] = temporaryRecipe
        if ratingChange == 0:
            finalObject["rating"] = 3
        elif ratingChange==-1:
            finalObject["rating"] = 1
        else:
            finalObject["rating"] = 5

        allVariations.append(finalObject)

    return allVariations


# end createRecipeVariations

if __name__ == "__main__":
    ex = {
        "name":
        "Cake",
        'notes':
        "This recipe is very good. I make it all the time with my kids!",
        'ingredients': [
            {
                "name": "Eggs",
                "amount": 2,
                "unit": ""
            },
            {
                "name": "Flour",
                "amount": 2,
                "unit": "Cups"
            },
            {
                "name": "Sugar",
                "amount": 2,
                "unit": "Cups"
            },
            {
                "name": "Baking Soda",
                "amount": 2,
                "unit": "Teaspoons"
            },
        ],
        "instructions": [
            "Add flour.",
            "Create well in flour.",
            "Crack egg in well.",
            "heat oven to 200.0 C",
            "cook for 20.0 min",
        ],
    }
    example = {"recipe": ex, "rating": 5}
    recipeVariations = createRecipeVariations(example, 10000)

    newRecipe = calculateNewMasterRecipe(recipeVariations)
    print(calculateNewMasterRecipe(recipeVariations))
# print(recipeVariations)
#newRecipe = calculateNewMasterRecipe(recipeVariations)
# print(newRecipe)
