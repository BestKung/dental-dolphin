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
import th.co.geniustree.dental.model.OrderMedicalSupplie;
import th.co.geniustree.dental.model.OrderMedicalSupplie_;

/**
 *
 * @author BestKung
 */
public class OrderMedicalSuppliesSpec {

    public static Specification<OrderMedicalSupplie> idlLike(final String keyword) {
        return new Specification<OrderMedicalSupplie>() {
            @Override
            public Predicate toPredicate(Root<OrderMedicalSupplie> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get(OrderMedicalSupplie_.id), keyword);
            }

        };
    }
}
