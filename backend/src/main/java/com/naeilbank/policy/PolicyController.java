package com.naeilbank.policy;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    @GetMapping("/matches")
    public List<Map<String, Object>> matches(@RequestParam(required = false) Long customerId) {
        return List.of(
                Map.of(
                        "id", 1,
                        "name", "소상공인 긴급경영안정자금",
                        "institution", "중소벤처기업부",
                        "limit", "최대 5천만원",
                        "rate", "2.0%",
                        "deadline", "2024.12.31",
                        "matchScore", 95,
                        "status", "matched"
                ),
                Map.of(
                        "id", 2,
                        "name", "지역화폐 가맹점 운영자금",
                        "institution", "경기도",
                        "limit", "최대 3천만원",
                        "rate", "1.5%",
                        "deadline", "2024.11.30",
                        "matchScore", 88,
                        "status", "pending"
                ),
                Map.of(
                        "id", 3,
                        "name", "전통시장 활성화 지원",
                        "institution", "소상공인시장진흥공단",
                        "limit", "최대 2천만원",
                        "rate", "2.5%",
                        "deadline", "2024.10.31",
                        "matchScore", 72,
                        "status", "review"
                )
        );
    }
}
