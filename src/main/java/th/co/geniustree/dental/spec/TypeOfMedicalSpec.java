/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.spec;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import th.co.geniustree.dental.model.TypeOfMedical;
import th.co.geniustree.dental.model.TypeOfMedical_;

/**
 *
 * @author Best
 */
public class TypeOfMedicalSpec {

      public static Specification<TypeOfMedical> userName(final String keyword){
      return new Specification<TypeOfMedical>() {

          @Override
          public Predicate toPredicate(Root<TypeOfMedical> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        return cb.like(root.get(TypeOfMedical_.userName), keyword);
          }
      };
      }
}
