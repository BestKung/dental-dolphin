/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.util.List;

/**
 *
 * @author BestKung
 */
public class OrderAndMedicalSupplies {

    private List<MedicalSupplies> medicalSupplies;
    private OrderMedicalSupplie orderMedicalSupplie;
    private Integer doctorId;

    public List<MedicalSupplies> getMedicalSupplies() {
        return medicalSupplies;
    }

    public void setMedicalSupplies(List<MedicalSupplies> medicalSupplies) {
        this.medicalSupplies = medicalSupplies;
    }

    public OrderMedicalSupplie getOrderMedicalSupplie() {
        return orderMedicalSupplie;
    }

    public void setOrderMedicalSupplie(OrderMedicalSupplie orderMedicalSupplie) {
        this.orderMedicalSupplie = orderMedicalSupplie;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

}
