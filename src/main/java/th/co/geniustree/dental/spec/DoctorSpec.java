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
import th.co.geniustree.dental.model.Doctor;
import th.co.geniustree.dental.model.Doctor_;
import th.co.geniustree.dental.model.Employee_;

/**
 *
 * @author Best
 */
public class DoctorSpec {

    public static Specification<Doctor> nameLike(final String keyword) {
        return new Specification<Doctor>() {

            @Override
            public Predicate toPredicate(Root<Doctor> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.or(cb.like(root.get(Doctor_.nameTh), keyword), cb.like(cb.upper(root.get(Doctor_.nameEng)), keyword.toUpperCase()));
            }
        };
    }

    public static Specification<Doctor> emailLike(final String keyword) {
        return new Specification<Doctor>() {

            @Override
            public Predicate toPredicate(Root<Doctor> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Doctor_.email)), keyword.toUpperCase());
            }
        };
    }

    public static Specification<Doctor> mobileLike(final String keyword) {
        return new Specification<Doctor>() {

            @Override
            public Predicate toPredicate(Root<Doctor> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(root.get(Doctor_.mobile), keyword);
            }
        };
    }

    public static Specification<Doctor> idWhere(final String keyword) {
        return new Specification<Doctor>() {
            @Override
            public Predicate toPredicate(Root<Doctor> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get(Employee_.id), keyword);
            }
        };
    }

}
