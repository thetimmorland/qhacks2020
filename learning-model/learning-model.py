import os
import requests
import csv
import re
import random
import pprint
import copy
from collections import defaultdict
BACKEND_URL = os.environ.get("BACKEND_URL") or "localhost:3000"


def copyArrOfDict(x):
    cpy_list = []
    for li in x:
        d2 = copy.deepcopy(li)
        cpy_list.append(d2)
    return cpy_list


def changeRecipe():
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
        values += re.findall(r"[-+]?\d*\.\d+|\d+", string)#find all numbers in the string
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
    master = recipeVariations[0].copy()
    masterRecipe = master["recipe"].copy()
    masterIngredients = copyArrOfDict(masterRecipe["ingredients"])
    sumOfIngredientVariations = copyArrOfDict(masterIngredients)

    masterInstructions = getTempAndTime(masterRecipe["instructions"])  # is an array of numbers
    sumOfInstructionVariations = copyArrOfDict(getTempAndTime( masterRecipe["instructions"]))  # is an array of numbers

    numberOfIngredientVariations = []
    numberOfInstructionVariations = []

    for i in range(len(sumOfIngredientVariations)):
        numberOfIngredientVariations.append(0)
    
    for i in range(len(masterIngredients)):
        numberOfInstructionVariations.append(0)

    # recipeVariations is an array of dictionaries recipeVariations[index][dict][dict]

    # get master ingredient list


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

   

        ingredients = copyArrOfDict(variation["recipe"]['ingredients'])
        # print(ingredients)
        rating = variation["rating"]

        instruction = getTempAndTime(variation["recipe"]["instructions"])
        change = False
        
        for num in range(len(ingredients)):
            if ingredients[num]["amount"] != masterIngredients[num]["amount"]:

                #variationDelta = ((ingredients[num]["amount"] - masterIngredients[num]["amount"]) *rating) / (ratingRange * numberOfVariations)
                variationDelta = ((ingredients[num]["amount"] - masterIngredients[num]["amount"]) * rating)/ratingRange
                numberOfIngredientVariations[num] += 1
                sumOfIngredientVariations[num]["amount"] += variationDelta
                
                change = True
                break

        # check if instruction has no numbers, jaspers function will return a -1
        if not change:
            for index in range(len(instruction)):
                if instruction[index] != masterInstructions[index]:
                    #variationDelta = ((instruction[index] - masterInstructions[index]) *rating) / (5 * numberOfVariations)
                    variationDelta = ((instruction[index] - masterInstructions[index]) * rating) / ratingRange
                    numberOfInstructionVariations[index] += 1
                    sumOfInstructionVariations[index] += variationDelta
                    break

    for instruction in range(len(sumOfInstructionVariations)):
        if numberOfInstructionVariations[instruction]!=0:
            masterInstructions[instruction] += sumOfInstructionVariations[instruction]/numberOfInstructionVariations[instruction]
        else:
            masterInstructions[instruction] += sumOfInstructionVariations[instruction]

    for ingredient in range(len(sumOfIngredientVariations)):
        if numberOfIngredientVariations[ingredient]!=0:
            masterIngredients[ingredient]["amount"] += sumOfIngredientVariations[ingredient]["amount"]/numberOfIngredientVariations[ingredient]
        else:
            masterIngredients[ingredient]["amount"] += sumOfIngredientVariations[ingredient]["amount"]
    masterRecipe["instructions"] = editInstructions(
        masterInstructions, masterRecipe["instructions"])
    masterRecipe["ingredients"] = masterIngredients

    return masterRecipe
    # end calculateNewMasterRecipe


def createRecipeVariations(exampleRecipe, numberOfVariations):
    changingRange = 1
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
            while( recipeIngredients[index]["unit"]=="" or recipeIngredients[index]["unit"][0]==" " ):
                index = random.randint(0,(len(recipeIngredients))-1)
            if(index==2):
                ratingChange = 1
        else:
            index = -1
        for ingredientIndex in range(len(recipeIngredients)):
            if (ingredientIndex == index):
                multiple = (random.random() * changingRange + (1-(changingRange/2)))
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
                amountToChange = recipeInstructions[instruction] * (random.random()* changingRange + (1-(changingRange/2)))
                temporaryInstructions.append(amountToChange)
            else:
                temporaryInstructions.append(recipeInstructions[instruction])
        temporaryRecipe.update({"ingredients" : temporaryIngredients})
        finalInstructions = editInstructions(temporaryInstructions, exampleRecipe["recipe"]["instructions"])
        temporaryRecipe.update({"instructions" : finalInstructions})

        finalObject = {}
        finalObject["recipe"] = temporaryRecipe
        # if ratingChange == 0:
        #     finalObject["rating"] = 3
        # elif ratingChange==-1:
        #     finalObject["rating"] = 1
        # else:
        #     finalObject["rating"] = 5
        finalObject["rating"] = random.randint(0,5)

        allVariations.append(finalObject)

    return allVariations


# end createRecipeVariations

if __name__ == "__main__":
    porkChop = {

        "name"  :   "Pork Chop",
            "notes" :   "Yummy yummy in my tummy",
            "ingredients"   :  [
                {"name" : "salt", "amount": 118, "unit": "ml"},
                {"name" : "water", "amount": 710, "unit": "ml"},
                {"name" : "pork chops", "amount": 2, "unit": ""},
                {"name" : "brown sugar", "amount": 60, "unit": "ml"},
                {"name" : "butter", "amount": 30, "unit": "ml"},
                {"name" : "thyme", "amount": 4, "unit": " sprigs"},
                {"name" : "garlic", "amount": 2, "unit": "cloves"},
            ],
            "instructions": [
                "Tenderize porkchops with a fork",
                "Place salt, sugar, and water in a plastic bag and stire until mixed",
                "Put porkchops in bag, and let marinate for 30 minutes",
                "Remove porkchops from bag and dry with paper towel",
                "Heat pan to medium high heat",
                "Cook on each side for 1 minute",
                "Reduce heat to medium and continue cooking for 9 minutes, flipping the chops every minute",
                "Remove the pan from the stove, add butter, garlic, and thyme, basting the pork chops",
                "Let the porkchops rest in the pan for 5 minutes",
            ],
}
    example = {"recipe": porkChop, "rating": 5}
    recipeVariations = createRecipeVariations(example, 500)

    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(calculateNewMasterRecipe(recipeVariations))
    #  print(calculateNewMasterRecipe(recipeVariations))
    #changeRecipe()
# print(recipeVariations)
#newRecipe = calculateNewMasterRecipe(recipeVariations)
# print(newRecipe)
