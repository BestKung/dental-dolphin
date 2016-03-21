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
import th.co.geniustree.dental.model.Department;
import th.co.geniustree.dental.model.Department_;

/**
 *
 * @author Jasin007
 */
public class DepartmentSpec {
    
    public static Specification<Department> namelike(final String keyword){
        return new Specification<Department>() {

            @Override
            public Predicate toPredicate(Root<Department> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
              return cb.like(cb.upper(root.get(Department_.name)), keyword.toUpperCase());
            }
        };
    }
    
    
        public static Specification<Department> idWhere(final Integer keyword){
        return new Specification<Department>() {
            @Override
            public Predicate toPredicate(Root<Department> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get(Department_.id), keyword);
            }
        };
        }
    
}
