/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package th.co.geniustree.dental.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import th.co.geniustree.dental.model.PriceAndExpireProduct;
import th.co.geniustree.dental.repo.PriceAndExpireProductRepo;
import th.co.geniustree.dental.spec.PriceAndExpireProductSpec;

/**
 *
 * @author Jasin007
 */
@Service
public class PriceAndExpireProductService {

    @Autowired
    private PriceAndExpireProductRepo priceAndExpireProductRepo;

    public Page<PriceAndExpireProduct> searchByProduct(String keyword, Pageable pageable) {
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.productLike("%" + keyword + "%"));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }

    public Page<PriceAndExpireProduct> searchByLot(Date keyword, Pageable pageable) {
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.lotInBetween(keyword));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }

    public Page<PriceAndExpireProduct> searchByExpire(Date keyword, Pageable pageable) {
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.expireBetween(keyword));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }

    public Page<PriceAndExpireProduct> searchByvalueLessThanOrEqualNontificationValue(Pageable pageable) {
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.OutProduct());
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }

    public Page<PriceAndExpireProduct> searchByvalueLessThanOrEqualNontificationValueAndStatus(Pageable pageable) {
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.outProductAndStatus());
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }

    public List<PriceAndExpireProduct> searchByvalueLessThanOrEqualNontificationValueAndStatusList() {
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.outProductAndStatuscount());
        return priceAndExpireProductRepo.findAll(specifications);
    }

    public Page<PriceAndExpireProduct> searcbByNontificationDateExpire(Date date, Pageable pageable) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
        String strDate = df.format(date);
        Date d = df.parse(strDate);
        Specifications<PriceAndExpireProduct> specifications = Specifications.where(PriceAndExpireProductSpec.expireProductAndStatus(d));
        return priceAndExpireProductRepo.findAll(specifications, pageable);
    }
}
