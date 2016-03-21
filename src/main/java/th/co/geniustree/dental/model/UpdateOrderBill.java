/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

/**
 *
 * @author Jasin007
 */
public class UpdateOrderBill {

    private OrderBill[] orderBill;
    private Integer[] id;

    public OrderBill[] getOrderBill() {
        return orderBill;
    }

    public void setOrderBill(OrderBill[] orderBill) {
        this.orderBill = orderBill;
    }

    public Integer[] getId() {
        return id;
    }

    public void setId(Integer[] id) {
        this.id = id;
    }

}
