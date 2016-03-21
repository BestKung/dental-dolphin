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
import th.co.geniustree.dental.model.TmpProduct;
import th.co.geniustree.dental.model.TmpProduct_;

/**
 *
 * @author BestKung
 */
public class TmpProductSpec {
    
    public static Specification<TmpProduct> nameUser (final String keyword){
    return new Specification<TmpProduct>() {

        @Override
        public Predicate toPredicate(Root<TmpProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
            return cb.like(root.get(TmpProduct_.user), keyword);
        }
    };
    }
    
}
