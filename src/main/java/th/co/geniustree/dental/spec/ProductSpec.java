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
import th.co.geniustree.dental.model.Product;
import th.co.geniustree.dental.model.Product_;
import th.co.geniustree.dental.model.TypeProduct_;
import th.co.geniustree.dental.model.UnitProduct_;

/**
 *
 * @author Jasin007
 */
public class ProductSpec {
    
    public static Specification<Product> nameLike(final String keyword){
        return new Specification<Product>() {

            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
               return cb.like(cb.upper(root.get(Product_.name)), keyword.toUpperCase());
            }
        };
    }
    
    public static  Specification<Product> typeProductLike(final String keyword){
        return new Specification<Product>() {

            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Product_.typeProduct).get(TypeProduct_.name)), keyword.toUpperCase());
            }
        };
    }
    
    public static Specification<Product> unitLike(final String keyword){
        return new Specification<Product>() {

            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Product_.unit).get(UnitProduct_.name)), keyword.toUpperCase());
            }
        };
    }
}
