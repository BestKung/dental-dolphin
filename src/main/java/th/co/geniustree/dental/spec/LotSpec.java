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
import th.co.geniustree.dental.model.Lot;
import th.co.geniustree.dental.model.Lot_;

/**
 *
 * @author Jasin007
 */
public class LotSpec {

    public static Specification<Lot> nameStaffReamLike(final String keyword) {
        return new Specification<Lot>() {

            @Override
            public Predicate toPredicate(Root<Lot> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Lot_.nameStaffReam)), keyword.toUpperCase());
            }
        };
    }

    public static Specification<Lot> dateInBetween(final Date keyword) {
        return new Specification<Lot>() {

            @Override
            public Predicate toPredicate(Root<Lot> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.between(root.get(Lot_.dateIn), keyword, keyword);
            }
        };
    }

    public static Specification<Lot> dateOutBetween(final Date keyword) {
        return new Specification<Lot>() {

            @Override
            public Predicate toPredicate(Root<Lot> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.between(root.get(Lot_.dateOut), keyword, keyword);
            }
        };
    }

    //=========================================================================================================
    public static Specification<Lot> nameStaffReamLikeNonDateOut(final String keyword) {
        return new Specification<Lot>() {

            @Override
            public Predicate toPredicate(Root<Lot> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.like(cb.upper(root.get(Lot_.nameStaffReam)), keyword.toUpperCase()), root.get(Lot_.dateOut).isNull());
            }
        };
    }

    public static Specification<Lot> dateInBetweenNonDateOut(final Date keyword) {
        return new Specification<Lot>() {

            @Override
            public Predicate toPredicate(Root<Lot> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.between(root.get(Lot_.dateIn), keyword, keyword), root.get(Lot_.dateOut).isNull());
            }
        };
    }

    public static Specification<Lot> dateOutBetweenNonDateOut(final Date keyword) {
        return new Specification<Lot>() {

            @Override
            public Predicate toPredicate(Root<Lot> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.between(root.get(Lot_.dateOut), keyword, keyword), root.get(Lot_.dateOut).isNull());
            }
        };
    }
}
