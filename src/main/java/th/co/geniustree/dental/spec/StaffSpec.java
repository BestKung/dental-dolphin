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
import th.co.geniustree.dental.model.Staff;
import th.co.geniustree.dental.model.Staff_;

/**
 *
 * @author Best
 */
public class StaffSpec {

    public static Specification<Staff> nameLike(final String keyword) {
        return new Specification<Staff>() {

            @Override
            public Predicate toPredicate(Root<Staff> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.or(cb.like(root.get(Staff_.nameTh), keyword), cb.like(cb.upper(root.get(Staff_.nameEng)), keyword.toUpperCase()));
            }
        };
    }

    public static Specification<Staff> emailLike(final String keyword) {
        return new Specification<Staff>() {

            @Override
            public Predicate toPredicate(Root<Staff> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(cb.upper(root.get(Staff_.email)), keyword.toUpperCase());
            }
        };
    }

    public static Specification<Staff> mobileLike(final String keyword) {
        return new Specification<Staff>() {

            @Override
            public Predicate toPredicate(Root<Staff> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(root.get(Staff_.mobile), keyword);
            }
        };
    }

    public static Specification<Staff> pidLike(final String keyword) {
        return new Specification<Staff>() {

            @Override
            public Predicate toPredicate(Root<Staff> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.like(root.get(Staff_.pid), keyword);
            }
        };
    }

    public static Specification<Staff> idWhere(final String keyword) {
        return new Specification<Staff>() {
            @Override
            public Predicate toPredicate(Root<Staff> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
                return cb.equal(root.get(Staff_.id), keyword);
            }
        };
    }

}
