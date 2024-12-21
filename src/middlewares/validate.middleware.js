import HttpStatus from 'http-status';

const validateRequest = (options) => async (req, res, next) => {
  try {
    await options.schema.validateAsync({
      ...req.query,
      ...req.body,
      ...req.params,
    });

    next();
  } catch (error) {
        const errors = [];
        if(errors.isJoi){
            error.details.forEach((errorData)=>{
                const errorObject = {
                    message : "SOMETHING_WENT_WRONG",
                    field : errorData.path.join('_'),
                    type : errorData.type
                };
                errors.push(errorObject);
            });
            response.status(HttpStatus.BAD_REQUEST).json({
                success : false,
                error : errors,
                message : ""
            });
        }
  }
};

export default validateRequest;
