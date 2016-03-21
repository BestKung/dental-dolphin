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
import th.co.geniustree.dental.model.DetailHeal;
import th.co.geniustree.dental.model.DetailHeal_;
import th.co.geniustree.dental.model.Doctor_;
import th.co.geniustree.dental.model.Patient_;

/**
 *
 * @author Jasin007
 */
public class DetailHealSpec {

    public static Specification<DetailHeal> patientLike(final String keyword) {
        return new Specification<DetailHeal>() {

            @Override
            public Predicate toPredicate(Root<DetailHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(DetailHeal_.patient).get(Patient_.name)), keyword);
            }
        };
    }

    public static Specification<DetailHeal> doctorLike(final String keyword) {
        return new Specification<DetailHeal>() {

            @Override
            public Predicate toPredicate(Root<DetailHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(DetailHeal_.doctor).get(Doctor_.nameTh)), keyword);
            }
        };
    }

    public static Specification<DetailHeal> dateHealLike(final Date keyword) {
        return new Specification<DetailHeal>() {

            @Override
            public Predicate toPredicate(Root<DetailHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.between(root.get(DetailHeal_.dateHeal), keyword, keyword);
            }
        };
    }

    //====================================================================================================================
    public static Specification<DetailHeal> patientLikeForBill(final String keyword) {
        return new Specification<DetailHeal>() {

            @Override
            public Predicate toPredicate(Root<DetailHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.like(cb.upper(root.get(DetailHeal_.patient).get(Patient_.name)), keyword), cb.isNull(root.get(DetailHeal_.status)));
            }
        };
    }

    public static Specification<DetailHeal> doctorLikeForBill(final String keyword) {
        return new Specification<DetailHeal>() {

            @Override
            public Predicate toPredicate(Root<DetailHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.like(cb.upper(root.get(DetailHeal_.doctor).get(Doctor_.nameTh)), keyword), cb.isNull(root.get(DetailHeal_.status)));
            }
        };
    }

    public static Specification<DetailHeal> dateHealLikeForBill(final Date keyword) {
        return new Specification<DetailHeal>() {

            @Override
            public Predicate toPredicate(Root<DetailHeal> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.and(cb.between(root.get(DetailHeal_.dateHeal), keyword, keyword), cb.isNull(root.get(DetailHeal_.status)));
            }
        };
    }

}
