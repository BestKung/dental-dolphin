/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotBlank;

/**
 *
 * @author Jasin007
 */
@Entity
@Table(name = "PRICEANDEXPIREPRODUCT")
public class PriceAndExpireProduct implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer id;

    @Column(name = "EXPIRE")
    @Temporal(TemporalType.DATE)
    private Date expire;

//    @Column(name = "NOTIFICATIONSEXPIRE")
//    @Temporal(TemporalType.DATE)
//    private Date notificationsExpire;
    @Column(name = "NOTIFICATIONSEXPIRE")
    private String notificationsExpire;

    @Column(name = "VALUE", nullable = false)
    @NotNull(message = "กรุณาระบุจำนวนสินค้า")
    private Double value;

    @Column(name = "NOTIFICATIONSVALUE", nullable = false)
    @NotNull(message = "กรุณาระบุกำหนดการแจ้งเตือนจำนวนสินค้า")
    private Integer notificationsValue;

    @Column(name = "PRICEBUY", nullable = false)
    @NotNull(message = "กรุณาระบุราคาซื้อ")
    private Double priceBuy;

    @Column(name = "PRICESELL", nullable = false)
    @NotNull(message = "กรุณาระบุราคาขาย")
    private Double priceSell;

    private Double amountRemaining;

    private String status;

    @ManyToOne
    @JoinColumn(name = "LOT_ID", nullable = false)
    @NotNull(message = "กรุณาระบุรอบนำเข้า")
    private Lot lot;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID", nullable = false)
    @NotNull(message = "กรุณาระบุชื่อสินค้าด้วยครับ")
    private Product product;

    private String statusNontificationValue;

    private String statusNontificationExpire;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getExpire() {
        return expire;
    }

    public void setExpire(Date expire) {
        this.expire = expire;
    }

    public String getNotificationsExpire() {
        return notificationsExpire;
    }

    public void setNotificationsExpire(String notificationsExpire) {
        this.notificationsExpire = notificationsExpire;
    }

    public Integer getNotificationsValue() {
        return notificationsValue;
    }

    public void setNotificationsValue(Integer notificationsValue) {
        this.notificationsValue = notificationsValue;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Double getPriceBuy() {
        return priceBuy;
    }

    public void setPriceBuy(Double priceBuy) {
        this.priceBuy = priceBuy;
    }

    public Double getPriceSell() {
        return priceSell;
    }

    public void setPriceSell(Double priceSell) {
        this.priceSell = priceSell;
    }

    public Lot getLot() {
        return lot;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getStatusNontificationValue() {
        return statusNontificationValue;
    }

    public void setStatusNontificationValue(String statusNontificationValue) {
        this.statusNontificationValue = statusNontificationValue;
    }

    public String getStatusNontificationExpire() {
        return statusNontificationExpire;
    }

    public void setStatusNontificationExpire(String statusNontificationExpire) {
        this.statusNontificationExpire = statusNontificationExpire;
    }

    public Double getAmountRemaining() {
        return amountRemaining;
    }

    public void setAmountRemaining(Double amountRemaining) {
        this.amountRemaining = amountRemaining;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 59 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final PriceAndExpireProduct other = (PriceAndExpireProduct) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PriceAndExpireProduct{" + "id=" + id + ", expire=" + expire + ", notificationsExpire=" + notificationsExpire + ", value=" + value + ", notificationsValue=" + notificationsValue + ", priceBuy=" + priceBuy + ", priceSell=" + priceSell + ", amountRemaining=" + amountRemaining + ", status=" + status + ", lot=" + lot + ", product=" + product + ", statusNontificationValue=" + statusNontificationValue + ", statusNontificationExpire=" + statusNontificationExpire + '}';
    }

}
