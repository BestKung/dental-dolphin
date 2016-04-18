/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.spec;

import java.util.Date;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import th.co.geniustree.dental.model.Bill;
import th.co.geniustree.dental.model.Bill2;
import th.co.geniustree.dental.model.Bill_;

/**
 *
 * @author Jasin007
 */
public class BillSpec {

    public static Specification<Bill> dateBillLike(final Date keyword) {
        return new Specification<Bill>() {

            @Override
            public Predicate toPredicate(Root<Bill> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.between(root.get(Bill_.dateBill), keyword, keyword);
            }

        };
    }

    public static Specification<Bill> sumPriceLike(final Double keyword) {
        return new Specification<Bill>() {

            @Override
            public Predicate toPredicate(Root<Bill> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.equal(root.get(Bill_.sumPrice), keyword);
            }
        };
    }

    public static Specification<Bill> idLike(final String keyword) {
        return new Specification<Bill>() {

            @Override
            public Predicate toPredicate(Root<Bill> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.equal(root.get(Bill_.id), keyword);
            }
        };
    }

}
