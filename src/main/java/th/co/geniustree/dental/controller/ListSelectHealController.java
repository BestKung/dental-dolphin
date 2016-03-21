/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import th.co.geniustree.dental.model.ListSelectHeal;
import th.co.geniustree.dental.model.SearchData;
import th.co.geniustree.dental.repo.ListSelectHealRepo;
import th.co.geniustree.dental.service.ListSelectHealService;
import th.co.geniustree.dental.spec.ListSelectHealSpec;

/**
 *
 * @author Jasin007
 */
@RestController
public class ListSelectHealController {

    @Autowired
    private ListSelectHealRepo listSelectHealRepo;

    @RequestMapping(value = "/loadlistselectheal", method = RequestMethod.GET)
    public Page<ListSelectHeal> loadListSelectHeal(Pageable pageable) {
        return listSelectHealRepo.findAll(pageable);
    }

    @RequestMapping(value = "/savelistselectheal", method = RequestMethod.POST)
    public void saveListSelectHeal(@Validated @RequestBody ListSelectHeal listSelectHeal) {
        ListSelectHeal listSelectHeal1 = listSelectHeal;
        listSelectHealRepo.save(listSelectHeal1);
    }

    @RequestMapping(value = "/deletelistselectheal", method = RequestMethod.POST)
    public void deleteListSelectHeal(@RequestBody ListSelectHeal listSelectHeal) {
        listSelectHealRepo.delete(listSelectHeal.getId());
    }

    @RequestMapping(value = "/totallistselectheal", method = RequestMethod.GET)
    public Long getTotalListSelectHeal() {
        return listSelectHealRepo.count();
    }

    @Autowired
    private ListSelectHealService listSelectHealService;

    @RequestMapping(value = "/loadlistselectheal/searchlistselectheal", method = RequestMethod.POST)
    public Page<ListSelectHeal> search(@RequestBody SearchData searchData, Pageable pageable) {
        String keyword = searchData.getKeyword();
        String searchBy = searchData.getSearchBy();
        Page<ListSelectHeal> listSelectHeals = null;
        if ("Name".equals(searchBy)) {
            listSelectHeals = listSelectHealService.searchByName(keyword, pageable);
        }
        if ("Price".equals(searchBy)) {
            Double keywordDouble = Double.parseDouble(keyword);
            listSelectHeals = listSelectHealService.searchByPrice(keywordDouble, pageable);
        }
        return listSelectHeals;
    }

    @RequestMapping(value = "/countsearchlistselectheal", method = RequestMethod.POST)
    private long countSearchListSelectHeal(@RequestBody SearchData searchData) {
        long count = 0;
        String searchBy = searchData.getSearchBy();
        String keyword = searchData.getKeyword();
        if ("Name".equals(searchBy)) {
            count = listSelectHealRepo.count(ListSelectHealSpec.nameLike("%" + keyword + "%"));
        }
        if ("Price".equals(searchBy)) {
            count = listSelectHealRepo.count(ListSelectHealSpec.priceLike(new Double(keyword)));
        }
        return count;
    }
}
