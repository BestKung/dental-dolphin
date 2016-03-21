/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

/**
 *
 * @author BestKung
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = EmailUniqueValidatEmployeeor.class)
public @interface EmployeeEmailUnique {

     public String message() default "{th.co.geniustree.validator.EmployeeEmailUnique.message}";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};
}
