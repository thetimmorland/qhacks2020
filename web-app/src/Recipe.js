const Recipe = () => {
    let { recipeId } = useParams()
    return (<p>Recipe {recipeId}</p>)
  }