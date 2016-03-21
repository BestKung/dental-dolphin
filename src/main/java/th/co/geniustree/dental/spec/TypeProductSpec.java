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
import th.co.geniustree.dental.model.TypeProduct;
import th.co.geniustree.dental.model.TypeProduct_;

/**
 *
 * @author Jasin007
 */
public class TypeProductSpec {
    
    public static Specification<TypeProduct> nameLike(final String keyword){
        return new Specification<TypeProduct>() {

            @Override
            public Predicate toPredicate(Root<TypeProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(TypeProduct_.name)), keyword.toUpperCase());
            }
        };
    }
}
