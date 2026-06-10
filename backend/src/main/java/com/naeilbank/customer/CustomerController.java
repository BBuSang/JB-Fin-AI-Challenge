package com.naeilbank.customer;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @GetMapping("/{id}")
    public Map<String, Object> get(@PathVariable Long id) {
        Map<String, Object> customer = new LinkedHashMap<>();
        customer.put("id", id);
        customer.put("name", "김영자");
        customer.put("businessName", "대박백반");
        customer.put("businessType", "일반음식점");
        customer.put("address", "광주 동구 충장로 123");
        customer.put("phone", "010-1234-5678");
        customer.put("openDate", "2018-03-15");
        customer.put("settlementAmount", 3000000);
        customer.put("settlementDate", "2024-02-15");
        customer.put("recoveryRate", 98.5);
        customer.put("status", "approve");
        customer.put("monthlyAvgSales", 12500000);
        customer.put("localCurrencyRatio", 35);
        customer.put("previousLoans", 2);
        customer.put("repaymentHistory", "정상");
        return customer;
    }
}
