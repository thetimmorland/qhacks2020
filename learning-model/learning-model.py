import os
import requests
import csv
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
    str = "h3110 23 cat 444.4 rabbit 11 2 dog"
    [int(s) for s in str.split() if s.isdigit()]
    

def addVariation():


def calculateNewMasterRecipe(recipe_variations):
    

