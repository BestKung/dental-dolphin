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

public class UpdateOrderHeal {
    private OrderHeal[] orderHeal;
    private Integer[] id;
    private OrderHeal[] deleteOrderHeal;

    public OrderHeal[] getOrderHeal() {
        return orderHeal;
    }

    public void setOrderHeal(OrderHeal[] orderHeal) {
        this.orderHeal = orderHeal;
    }

    public Integer[] getId() {
        return id;
    }

    public void setId(Integer[] id) {
        this.id = id;
    }

    public OrderHeal[] getDeleteOrderHeal() {
        return deleteOrderHeal;
    }

    public void setDeleteOrderHeal(OrderHeal[] deleteOrderHeal) {
        this.deleteOrderHeal = deleteOrderHeal;
    }
    
    
}
