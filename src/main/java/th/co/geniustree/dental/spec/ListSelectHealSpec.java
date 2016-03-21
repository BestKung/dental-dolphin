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
import th.co.geniustree.dental.model.ListSelectHeal;
import th.co.geniustree.dental.model.ListSelectHeal_;

/**
 *
 * @author Jasin007
 */
public class ListSelectHealSpec {
    
    public static Specification<ListSelectHeal> nameLike(final String keyword){
        return new Specification<ListSelectHeal>(){

            @Override
            public Predicate toPredicate(Root<ListSelectHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
               return cb.like(cb.upper(root.get(ListSelectHeal_.name)), keyword.toUpperCase());
            }           
        };
    }
    public static Specification<ListSelectHeal> priceLike(final Double keyword){
        return new Specification<ListSelectHeal>(){

            @Override
            public Predicate toPredicate(Root<ListSelectHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.equal(root.get(ListSelectHeal_.price), keyword);
            }      
        };
    }
}
