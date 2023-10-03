const express = require("express");
const posting = require("./auth.middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

let initialRecipe = [
  {
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    preparationTime: "15 minutes",
    cookingTime: "15",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
    country: "India",
    veg: true,
    id: 1,
  },
];



app.get("/", (req, res) => {
  res.send("welcome to the recipe api.");
});

app.get("/recipe/all",(req,res)=>{
  res.send(initialRecipe)
})

app.get("/index", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.get("/add",(req,res)=>{
  res.status(200).sendFile(__dirname + "/recipe.html")
})

app.post("/add",(req,res)=>{
  initialRecipe.push(req.body)
  res.status(404).send(initialRecipe)
})

app.post("/recipe/add",posting,(req,res)=>{
  let newrecipe = {
    name:req.body.name,
    description:req.body.description,
    preparationTime:req.body.preparationTime,
    cookingTime:req.body.cookingTime,
    imageUrl:req.body.imageUrl,
    country:req.body.country,
    veg:req.body.veg,
    id:initialRecipe.length+1
  }
initialRecipe.push(newrecipe)
res.send(initialRecipe)
})

app.patch("/recipe/update/:id",(req,res)=>{
  let {id} = req.params
  let index = initialRecipe.findIndex((initialRecipe)=>initialRecipe.id == id)
 if (id < 1){
  res.send("User not Found")
 }
 else{
  initialRecipe[index].name = req.body.name,
  initialRecipe[index].description = req.body.description,
  initialRecipe[index].preparationTime= req.body.preparationTime
  initialRecipe[index].cookingTime= req.body.cookingTime
  initialRecipe[index].imageUrl= req.body.imageUrl
  initialRecipe[index].country = req.body.country
  initialRecipe[index].veg = req.body.veg
 }

 res.status(200).send(initialRecipe)

})

app.delete("/recipe/delete/:id",(req,res)=>{
  let {id} = req.params

  let index = initialRecipe.findIndex((initialRecipe) => initialRecipe.id == id)
  let dlt = initialRecipe.splice(index,1)[0]
      
  res.send(initialRecipe)
})

app.get("/recipe/filter",(req,res)=>{
  let {veg} = req.query
  let {cookingTime} = req.query
  let {country} = req.query


  if (veg){
    let Aa = initialRecipe.filter((ele)=>ele.veg.toString()==veg)
    res.send(Aa)
  }

  if(country){
    let Bb = initialRecipe.filter((ele)=>ele.country == country)
    res.send(Bb)
  }

  if(cookingTime = "lth"){
    let lth = initialRecipe.sort((a,b)=>a.cookingTime - b.cookingTime)
    res.send(lth)
  }
  else if (cookingTime = "htl"){
    let htl = initialRecipe.sort((a,b)=>b.cookingTime - a.cookingTime)
    res.send(htl)
  }
})

app.listen(8090, () => {
  console.log("Server is listening on port 8090.");
});
