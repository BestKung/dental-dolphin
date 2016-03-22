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
import th.co.geniustree.dental.model.Lot_;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.model.PriceAndExpireProduct_;
import th.co.geniustree.dental.model.Product_;

/**
 *
 * @author Jasin007
 */
public class PriceAndExpireProductSpec {

    public static Specification<PriceAndExpireProduct> productLike(final String keyword) {
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.like(cb.upper(root.get(PriceAndExpireProduct_.product).get(Product_.name)), keyword.toUpperCase()), cb.isNull(root.get(PriceAndExpireProduct_.status)));
            }
        };
    }

    public static Specification<PriceAndExpireProduct> expireBetween(final Date keyword) {
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.between(root.get(PriceAndExpireProduct_.expire), keyword, keyword), cb.isNull(root.get(PriceAndExpireProduct_.status)));
            }
        };
    }

    public static Specification<PriceAndExpireProduct> lotInBetween(final Date keyword) {
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.between(root.get(PriceAndExpireProduct_.lot).get(Lot_.dateIn), keyword, keyword), cb.isNull(root.get(PriceAndExpireProduct_.status)));
            }
        };
    }

    public static Specification<PriceAndExpireProduct> OutProduct() {
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.lessThanOrEqualTo(root.get(PriceAndExpireProduct_.amountRemaining), root.get(PriceAndExpireProduct_.notificationsValue)), root.get(PriceAndExpireProduct_.stopNontificationValue).isNull());
            }
        };
    }

    public static Specification<PriceAndExpireProduct> outProductAndStatus() {
        return new Specification<PriceAndExpireProduct>() {

            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.and(cb.lessThanOrEqualTo(root.get(PriceAndExpireProduct_.amountRemaining), root.get(PriceAndExpireProduct_.notificationsValue)), cb.like(root.get(PriceAndExpireProduct_.statusNontificationValue), "1")), root.get(PriceAndExpireProduct_.stopNontificationValue).isNull());
            }
        };
    }

    public static Specification<PriceAndExpireProduct> expireProductAndStatus(final Date date) {
        return new Specification<PriceAndExpireProduct>() {
            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.and(cb.lessThanOrEqualTo(root.get(PriceAndExpireProduct_.nontificationDateExpire), date), root.get(PriceAndExpireProduct_.stopNontificationExpire).isNull());
            }
        };
    }
    
    public static Specification<PriceAndExpireProduct> expireProductAndStatusCount(final Date date) {
        return new Specification<PriceAndExpireProduct>() {
            @Override
            public Predicate toPredicate(Root<PriceAndExpireProduct> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.and(cb.and(cb.lessThanOrEqualTo(root.get(PriceAndExpireProduct_.nontificationDateExpire), date), cb.equal(root.get(PriceAndExpireProduct_.statusNontificationExpire), "1")), root.get(PriceAndExpireProduct_.stopNontificationExpire).isNull());
            }
        };
    }

}
