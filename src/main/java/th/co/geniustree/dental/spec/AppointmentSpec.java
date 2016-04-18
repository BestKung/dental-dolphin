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
import th.co.geniustree.dental.model.Appointment;
import th.co.geniustree.dental.model.Appointment_;
import th.co.geniustree.dental.model.Doctor_;
import th.co.geniustree.dental.model.Patient_;

/**
 *
 * @author Best
 */
public class AppointmentSpec {
 
    public static Specification<Appointment> nameDoctorLike(final String keyword){
    return new Specification<Appointment>() {

        @Override
        public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return cb.or(cb.like(cb.upper(root.get(Appointment_.doctor).get(Doctor_.nameEng)),keyword.toUpperCase()), cb.like(root.get(Appointment_.doctor).get(Doctor_.nameTh), keyword));
        }
    };
    }
    
    public static Specification<Appointment> namePatientLike(final String keyword){
    return new Specification<Appointment>() {

        @Override
        public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return cb.like(root.get(Appointment_.patient).get(Patient_.name), keyword);
        }
    };
    }
    
    public static Specification<Appointment> mobileLike(final String keyword){
    return new Specification<Appointment>() {

        @Override
        public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return cb.like(root.get(Appointment_.mobile), keyword);
        }
    };
    }
    
      public static Specification<Appointment> idLike(final String keyword){
    return new Specification<Appointment>() {

        @Override
        public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return cb.like(root.get(Appointment_.id), keyword);
        }
    };
    }
    
    public static Specification<Appointment> appointmentDate(final Date keyword){
    return new Specification<Appointment>() {

        @Override
        public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
            return cb.between(root.get(Appointment_.appointDay), keyword, keyword);
        }
    };
    } 

    public static Specification<Appointment> appointmentStatus(final String keyword){
    return new Specification<Appointment>() {

        @Override
        public Predicate toPredicate(Root<Appointment> root, CriteriaQuery<?> cq, CriteriaBuilder cb) {
           return cb.like(root.get(Appointment_.status), keyword);
        }
    };
    }
}
