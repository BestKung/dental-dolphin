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
import th.co.geniustree.dental.model.Patient;
import th.co.geniustree.dental.model.Patient_;

/**
 *
 * @author Best
 */
public class PatientSpec {

    public static Specification<Patient> nameLike(final String keyword) {
        return new Specification<Patient>() {

            @Override
            public Predicate toPredicate(Root<Patient> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Patient_.name)), keyword.toUpperCase());
            }
        };
    }

    public static Specification<Patient> emailLike(final String keyword) {
        return new Specification<Patient>() {

            @Override
            public Predicate toPredicate(Root<Patient> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Patient_.email)), keyword.toUpperCase());
            }
        };
    }

    public static Specification<Patient> idlLike(final String keyword) {
        return new Specification<Patient>() {

            @Override
            public Predicate toPredicate(Root<Patient> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get(Patient_.id), keyword);
            }
        };
    }

    public static Specification<Patient> pidLike(final String keyword) {
        return new Specification<Patient>() {

            @Override
            public Predicate toPredicate(Root<Patient> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get(Patient_.pid), keyword);
            }
        };
    }

}
