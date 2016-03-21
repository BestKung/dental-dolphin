/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.validator.constraints.NotBlank;

/**
 *
 * @author Jasin007
 */
@Entity
@Table(name = "UNITPRODUCT")
public class UnitProduct implements Serializable {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer id;

    
    @Column(name = "NAME",nullable = false,unique = true)
    @NotBlank(message = "กรุณาระบุชื่อหน่วย")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "unit")
    private List<Product> products_unit;

    public List<Product> getProducts_unit() {
        return products_unit;
    }

    public void setProducts_unit(List<Product> products_unit) {
        this.products_unit = products_unit;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.id);
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
        final UnitProduct other = (UnitProduct) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
