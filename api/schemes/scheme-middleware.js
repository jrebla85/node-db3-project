const Scheme = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const {id} = req.params;

  try{
    const scheme = await Scheme.getById(id);

    if(!scheme){
      res.status(404).json({ message: `scheme with scheme_id ${id} not found` })
    }else{
      req.scheme = scheme;
      next();
    }
  }catch(err){
    next(err);
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => {
  const {scheme_name} = req.body;
  const error = { status: 400 };
  try{
    if (!scheme_name || scheme_name === undefined || typeof scheme_name !== "string"){
      error.message = "invalid scheme_name"
      next(error);
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
  const {instructions, step_number} = req.body;
  const error = { status: 400 };
  try{
    if(!instructions || instructions === undefined || typeof instructions !== "string" || step_number < 1 || isNaN(step_number)){
      error.message = "invalid step";
      next(error);
    }else{
      next();
    }
  }catch(err){
    next(err)
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
