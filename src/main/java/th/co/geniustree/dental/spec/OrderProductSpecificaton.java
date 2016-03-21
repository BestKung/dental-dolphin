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
import th.co.geniustree.dental.model.Bill_;
import th.co.geniustree.dental.model.OrderProduct;
import th.co.geniustree.dental.model.OrderProduct_;

/**
 *
 * @author BestKung
 */
public class OrderProductSpecificaton {

    public static Specification<OrderProduct> whereBill(final Integer keyword) {
        return new Specification<OrderProduct>() {
            @Override
            public Predicate toPredicate(Root<OrderProduct> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get(OrderProduct_.bill).get(Bill_.id), keyword);
            }

        };
    }
}
