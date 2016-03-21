/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.ListSelectHeal;
import th.co.geniustree.dental.repo.ListSelectHealRepo;
import th.co.geniustree.dental.spec.ListSelectHealSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class ListSelectHealService {

    @Autowired
    private ListSelectHealRepo listSelectHealRepo;

    public Page<ListSelectHeal> searchByName(String keyword, Pageable pageable) {
        Specifications<ListSelectHeal> specifications = Specifications.where(ListSelectHealSpec.nameLike("%" + keyword + "%"));
        return listSelectHealRepo.findAll(specifications, pageable);
    }

    public Page<ListSelectHeal> searchByPrice(Double keyword, Pageable pageable) {
        Specifications<ListSelectHeal> specifications = Specifications.where(ListSelectHealSpec.priceLike(keyword));
        return listSelectHealRepo.findAll(specifications, pageable);
    }
}
