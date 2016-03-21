/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author pramoth
 */
@ControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Map<String, Object> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> error = new HashMap<>();
        error.put("type", "validation");
        error.put("violations", extractError(ex));
        return error;
    }

    private Map<String, ValidationErrorMessage> extractError(MethodArgumentNotValidException ex) {
        Map<String, ValidationErrorMessage> returnError = new HashMap<>();
        List<ObjectError> allErrors = ex.getBindingResult().getAllErrors();

        for (ObjectError error : allErrors) {
            if (error instanceof FieldError) {
                FieldError fieldError = (FieldError) error;
                ValidationErrorMessage msg = new ValidationErrorMessage();
                msg.setMessage(fieldError.getDefaultMessage());
                msg.setType(fieldError.getObjectName());
                returnError.put(fieldError.getField(), msg);
            }
        }
        return returnError;
    }
}
