const db = require('../../data/db-config');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const scheme = await db("schemes").where("scheme_id", req.params.scheme_id).first();

    if(!scheme){
      next({
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`
      })
    }else{
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
    if (scheme_name === undefined || typeof scheme_name !== "string" || !scheme_name.trim()){
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
    if(instructions === undefined || typeof instructions !== "string" || !instructions.trim() || step_number < 1 || typeof step_number !== "number"){
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
